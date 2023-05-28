/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// Important
import { join } from 'path';
import { sleep, isEmpty, contains } from "./util/library";
import Config from './util/config';
import Logger from "./util/logger";
import Interface from './commands/server/Interface';

// WEB
import express, { Request, Response, NextFunction } from 'express';
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import cors from 'cors';
import eta from "eta";

// Node
import { Worker } from 'worker_threads';

// Translate
import backend from 'i18next-node-fs-backend';
import cookieParser from 'cookie-parser';
import i18next from 'i18next';

// API Discord
import { Client, GatewayIntentBits, Partials, Events, WebhookClient, WebhookClientData, TextChannel, DMChannel, NewsChannel, Routes, REST } from 'discord.js';
import getEvents, { findEvent } from './events/eventHandler';
import register from './util/registercommands';

// API
import Account from "./db/account/api";
import Control from "./commands/gm/control";
import API_GS from "./game/genshin/api";
import API_SR from "./game/starrails/api";
import { RSAUtils } from "./game/hoyolab/crypto";

const log = new Logger("YuukiPS");
log.info("YuukiPS startup....")
process.on("unhandledRejection", (error) => {
	log.info(error as Error)
	//process.exit(1);
})

let online_string: number = 9999

// Temporary Config
const argv = require("minimist")(process.argv.slice(2))
log.debug(argv)
const set_host = argv.host || "localhost"
const set_protocol = argv.protocol || "http"
const set_port_local = argv.port || 3000
const set_port_cloud = argv.port_cloud || 443
const regcmd = argv.reg || false

API_GS.initserver(set_host, set_port_cloud, set_protocol)
API_SR.initserver(set_host, set_port_cloud, set_protocol)

var eta_plugin_random = require("./web/plugin/random")

// debug, remove some later
const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildScheduledEvents
	],
	partials: [
		Partials.User,
		Partials.Channel,
		Partials.GuildMember,
		Partials.Message,
		Partials.Reaction,
		Partials.GuildScheduledEvent,
		Partials.ThreadMember
	]
})

bot.on(Events.Error, (error: any) => {
	log.error(error)
	//process.exit(1);
})

async function registerEvent(event: string, ...args: any) {
	const events = await getEvents();
	const eventFunc = findEvent(events, event);
	//log.debug(`${event} was called`)
	if (eventFunc) await eventFunc(...args);
}

// Interaction Bot
bot.on('interactionCreate', async (interaction) => {

	let username = interaction.user.username
	let username_id = interaction.user.id;

	const channel_name =
		interaction.channel instanceof TextChannel
			? interaction.channel.name
			: interaction.channel instanceof DMChannel
				? interaction.channel.recipient?.username // or any other property/method you want to use for DMChannel
				: interaction.channel instanceof NewsChannel
					? interaction.channel.name
					: 'Unknown Channel';

	log.info(`Event Interaction ${username}#${username_id} in Channel${channel_name} with Type ${interaction.type}`)

	if (interaction.isCommand()) {

		log.debug(`/${interaction.commandName} was called by ${username}`);
		import(`./commands/discord/${interaction.commandName}`).then(async (cmd) => {
			await cmd.default.process(interaction);
		}).catch(async (error) => {
			log.error(error as unknown as Error);
		});
	} else if (interaction.isModalSubmit()) {
		// TODO
	} else if (interaction.isButton()) {
		// TODO
	}
});

// Event
bot.on('messageCreate', async (message) => {
	await registerEvent('messageCreate', message);
});
bot.on('messageReactionAdd', async (reaction, user) => {
	await registerEvent('messageReactionAdd', reaction, user, bot);
});
bot.on('guildMemberAdd', async (member) => {
	await registerEvent('guildMemberAdd', member);
});
bot.on('messageUpdate', async (oldMessage, newMessage) => {
	await registerEvent('messageUpdate', oldMessage, newMessage);
});
bot.on('messageDelete', async (message) => {
	await registerEvent('messageDelete', message);
});
bot.on('messageDeleteBulk', async (messages) => {
	await registerEvent('messageDeleteBulk', messages);
});

// Bot Startup
(async () => {
	if (Config.Startup.bot) {
		if (regcmd) {
			const rest = new REST({ version: '9' }).setToken(Config.token);
			await register().then(async (commands: any) => {
				await rest.put(Routes.applicationGuildCommands(Config.clientId, Config.guildId), {
					body: commands
				});
			});
		} else {
			log.warn(`skip register`)
		}
		bot.on('ready', () => {
			log.info(`Ready to serve in ${bot.guilds.cache.size} guilds as ${bot.user?.tag}.`);
		});
		bot.login(Config.token);
	} else {
		log.info("bot skip run....")
	}
})();

// Ratelimit
const limit_cmd = rateLimit({
	windowMs: 3 * 1000,
	max: 5,
	statusCode: 200,
	message: async (request: Request, response: Response) => {
		log.info(`limit ${request.ip}`)
		return {
			windowMs: 1 * 1000,
			max: 1,
			statusCode: 200,
			message: {
				msg: "Too many requests, please try again later.",
				code: 403
			}
		}
	}
})

const limit_login = rateLimit({
	windowMs: 60 * 1000,
	max: 3,
	statusCode: 200,
	message: async (request: Request, response: Response) => {
		log.info(`limit login ${request.ip}`)
		return {
			data: null,
			retcode: 1,
			message: "You can only try to log into your account 3x every 1 minute"
		}
	}
})

const limit_tokenlogin = rateLimit({
	windowMs: 60 * 1000,
	max: 2,
	statusCode: 200,
	message: async (request: Request, response: Response) => {
		log.info(`limit login token ${request.ip}`)
		return {
			data: null,
			retcode: 1,
			message: "Expired login (2)"
		}
	}
})

// Initialize i18next
i18next.use(backend).init({
	fallbackLng: 'en', // Default language fallback
	preload: ['en', 'id'], // Preload supported languages
	ns: ['translation'],
	backend: {
		loadPath: join(__dirname, '../src/language/{{lng}}.json'), // Path to language files
	},
});


// TODO move route web
const web = express()

// body-parser middleware
web.use(bodyParser.json({ limit: '50mb' }))
web.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
web.use(cookieParser());

// Function to translate a string based on the user's language preference
function translateString(key: string, userLanguage: string = "en"): string {
	const translation = i18next.t(key, { lng: userLanguage });
	return translation;
}

// Function to translate a JSON object based on the user's language preference
function translate(data: Record<string, any>, userLanguage: string = "en"): Record<string, any> {
	const translatedData: Record<string, any> = {};

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key];
			if (typeof value === 'string') {
				const translatedValue = translateString(value, userLanguage);
				//console.log("load " + value + " > " + translatedValue);
				translatedData[key] = translatedValue;
			} else if (typeof value === 'object' && value !== null) {
				const translatedValue = translate(value, userLanguage);
				//console.log(translatedValue);
				translatedData[key] = translatedValue;
			} else {
				translatedData[key] = value;
			}
		}
	}

	return translatedData;
}



// Core
web.use(cors());

// Static
web.use(express.static(__dirname + "/web/public"))
// Web
eta.configure({
	plugins: [eta_plugin_random],
	cache: false
})
web.engine("eta", eta.renderFile)
web.set("view engine", "eta")
web.set("views", __dirname + "/web/views")
web.set("trust proxy", 2)

web.all("/", (req: Request, res: Response) => {
	const userAgent = req.headers["user-agent"]
	const type = req.query.type

	// login browser? (query: 'type=sdk'), sometimes it is cached by browser if login is official, so it breaks it. Maybe the Yuukips launcher has to clear cache every time you log in?
	if (type == "sdk") {
		if (userAgent !== undefined) {
			if (userAgent.includes("Genshin Impact")) {
				//log.warn(req as any)
				return res.send("Hello YuukiPS GS")
			} else if (userAgent.includes("Star Rail")) {
				//log.warn(req as any)
				return res.send("Hello YuukiPS SR")
			}
		}
	}

	res.render("home", {
		title: "Welcome to YuukiPS",
		description: "Im lazy to write"
	})
})

web.all("/command", (req: Request, res: Response) => {
	res.render("command", {
		title: "Command Tool",
		description: "Im lazy to write"
	})
})

// Web
web.all("/game/genshin", (req: Request, res: Response) => {
	res.render("genshin_list", {
		title: "Download Genshin",
		description: "Im lazy to write"
	})
})
// Web Download
web.all("/game/genshin/:id", (req: Request, res: Response) => {
	res.render("genshin_dl", {
		title: "Download Genshin",
		description: "Im lazy to write"
	})
})

web.all("/api", (req: Request, res: Response) => {
	res.send("API YuukiPS")
})

// Testing
web.all("/api/game/genshin", async (req: Request, res: Response) => {
	try {
		let d = await API_GS.INFO()
		return res.json(d)
	} catch (e) {
		log.error(e as Error)
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})

web.all("/api/server", async (req: Request, res: Response) => {
	try {
		let d = await Control.Server()
		return res.json(d)
	} catch (e) {
		log.error(e as Error)
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})
web.all("/api/server/:id", async (req: Request, res: Response) => {
	try {
		let d = await Control.Server(req.params.id)
		return res.json(d)
	} catch (e) {
		log.error(e as Error)
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})

web.all("/api/server/:id/ping", async (req: Request, res: Response) => {
	var s = "gio"

	if (req.params.id) {
		s = req.params.id;
		var g_config = Config.server.find((server) => server.name === s);
	}

	if (g_config == undefined) {
		// TODO: add check login
		return res.json({
			msg: "Config server not found",
			code: 404
		})
	}

	try {
		return res.json({
			data: {
				version: g_config.api.type
			},
			msg: "Hello",
			code: 200
		})
	} catch (e) {
		log.error(e as Error)
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})

web.all("/api/server/:id/command", limit_cmd, async (req: Request, res: Response) => {
	let d = await Control.GM(req.params.id, req.query.uid, req.query.cmd, req.query.code)
	return res.json(d)
})

web.get("/ip", async (req: Request, res: Response) => {
	res.send(req.ip)
})

// Combo
web.all("/status/server", (req: Request, res: Response) => {
	return res.json({
		"retcode": 0,
		"status": {
			"runMode": "HYBRID",
			"MemoryMax": 1,
			"MemoryCurrently": 1,
			"MemoryInit": 1,
			"MemoryCommitted": 1,
			"Thread": 1,
			"ThreadTotalStarted": 1,
			"ThreadDaemon": 1,
			"TotalPlayer": 0,
			"playerCount": online_string,
			"maxPlayer": 1000,
			"DockerGS": "alpine-yuukips-3.7-9dd5847",
			"Version": "5.0 devkit"
		}
	})
})

// Hoyo Love Log Stuff

web.all("/common/h5log/log/batch", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})
web.all("/sdk/dataUpload", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})
web.all("/crashdump/dataUpload", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})
web.all("/apm/dataUpload", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})
web.all("/log", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})
web.all("/crash/dataUpload", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})
web.all("/h5/upload", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})
web.all("/sw.html", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ code: 0 })
})

web.all("/ys/event/:id_event/index.html", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ code: 0 })
})

web.all("/:cn/announcement/index.html", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ code: 0 })
})

// Hoyo Acc Stuff

web.all("/account/risky/api/check", async (req: Request, res: Response) => {
	return res.json({ retcode: 0, message: "OK", data: { id: "", action: "ACTION_NONE", geetest: null } })
})

web.all("/account/device/api/listNewerDevices", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/:cn/mdk/shield/api/loginByThirdparty", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/:cn/combo/granter/api/getFont", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/combo/box/api/config/sdk/drmSwitch", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/device-fp/api/getFp", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/account/auth/api/getConfig", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/:cn/mdk/shopwindow/shopwindow/listPriceTier", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/common/:cn/announcement/api/getAlertPic", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/common/:cn/announcement/api/getAlertAnn", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/:cn/combo/red_dot/list", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/v5/gc", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/v5/gcf", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/v5/gcl", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/:cn/mdk/shield/api/loginCaptcha", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/privacy/policy/authorization/status", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

web.all("/privacy/policy/ms/version", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

// Config
web.all("/:cn/combo/granter/api/getConfig", async (req: Request, res: Response) => {
	// Fake Config SR
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({
		retcode: 0,
		message: "OK",
		data: {
			protocol: false,
			qr_enabled: false,
			log_level: "DEBUG",
			announce_url: "https://ps.yuuki.me/news",
			push_alias_type: 0,
			disable_ysdk_guard: true,
			enable_announce_pic_popup: true,
			app_name: "YuukiPS",
			qr_enabled_apps: { bbs: false, cloud: false },
			qr_app_icons: { app: "", bbs: "", cloud: "" },
			qr_cloud_display_name: "HoyoShit",
			enable_user_center: true
		}
	})
})
web.all("/:cn/mdk/shield/api/loadConfig", async (req: Request, res: Response) => {
	// Fake Config SR
	//log.debug(req.params)
	//log.debug(req.query)
	/*
	GS Config
	return res.json({
		retcode: 0,
		message: "OK",
		data: {
			id: 6,
			game_key: "hk4e_global",
			client: "PC",
			identity: "I_IDENTITY",
			guest: false,
			ignore_versions: "",
			scene: "S_NORMAL",
			name: "原神海外",
			disable_regist: false,
			enable_email_captcha: false,
			thirdparty: ["fb", "tw"],
			disable_mmt: false,
			server_guest: false,
			thirdparty_ignore: { tw: "", fb: "" },
			enable_ps_bind_account: false,
			thirdparty_login_configs: {
				tw: { token_type: "TK_GAME_TOKEN", game_token_expires_in: 604800 },
				fb: { token_type: "TK_GAME_TOKEN", game_token_expires_in: 604800 }
			}
		}
	})
	*/
	return res.json({
		retcode: 0,
		message: "OK",
		data: {
			id: 24,
			game_key: "hkrpg_global",
			client: "PC",
			identity: "I_IDENTITY",
			guest: true,
			ignore_versions: "",
			scene: "S_NORMAL",
			name: "YuukiPS",
			disable_regist: false,
			enable_email_captcha: false,
			thirdparty: ["fb", "tw", "gl", "ap"],
			disable_mmt: false,
			server_guest: false,
			thirdparty_ignore: {},
			enable_ps_bind_account: true,
			thirdparty_login_configs: {
				fb: { token_type: "TK_GAME_TOKEN", game_token_expires_in: 2592000 },
				gl: { token_type: "TK_GAME_TOKEN", game_token_expires_in: 604800 },
				tw: { token_type: "TK_GAME_TOKEN", game_token_expires_in: 2592000 },
				ap: { token_type: "TK_GAME_TOKEN", game_token_expires_in: 604800 }
			},
			initialize_firebase: false,
			bbs_auth_login: true,
			bbs_auth_login_ignore: []
		}
	})
})

// Combo
web.all("/combo/box/api/config/sw/precache", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})
web.all("/combo/box/api/config/sdk/combo", async (req: Request, res: Response) => {
	return res.json({
		retcode: 0,
		message: "OK",
		data: {
			vals: { disable_email_bind_skip: "false", email_bind_remind_interval: "7", email_bind_remind: "false" }
		}
	})
})
web.all("/:cn/combo/granter/api/compareProtocolVersion", async (req: Request, res: Response) => {
	return res.json({
		retcode: 0,
		message: "OK",
		data: {
			modified: true,
			protocol: {
				id: 0,
				app_id: 4,
				language: "en",
				user_proto: "",
				priv_proto: "",
				major: 7,
				minimum: 0,
				create_time: "0",
				teenager_proto: "",
				third_proto: ""
			}
		}
	})
})

web.all("/device-fp/api/getExtList", async (req: Request, res: Response) => {
	return res.json({
		retcode: 200,
		message: "OK",
		data: {
			code: "200",
			ext_list: [],
			pkg_list: false
		}
	})
})
web.all("/admin/mi18n/plat_os/:id1/:id2-version.json", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ code: 0 })
})
web.all("/admin/mi18n/plat_oversea/:id1/:id2-version.json", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ code: 0 })
})

web.all("/data_abtest_api/config/experiment/list", async (req: Request, res: Response) => {
	return res.json({ retcode: 0, success: true, message: "", data: [] })
})

web.all("/:cn/mdk/agreement/api/getAgreementInfos", async (req: Request, res: Response) => {
	return res.json({ retcode: 0, success: true, message: "", data: [] })
})

// Login
// Login Facebook
web.all("/sdkFacebookLogin.html", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ code: 0 })
})
// Login Twitter
web.all("/sdkTwitterLogin.html", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ code: 0 })
})
// Login Twitter (API?)
web.all("/Api/twitter_login", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({
		code: 200,
		data: {
			auth_url: "https://ps.yuuki.me",
			info: "",
			msg: "Success",
			status: 1
		}
	})
})
// Login Facebook (API?)
web.all("/Api/facebook_login", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({
		code: 200,
		data: {
			auth_url: "https://ps.yuuki.me",
			info: "",
			msg: "Success",
			status: 1
		}
	})
})
// login guest (from client).
web.all("/:cn/mdk/guest/guest/v2/login", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ code: 0 })
})
// Cached token login (from registry).
web.all("/:cn/mdk/shield/api/verify", limit_tokenlogin, async (req: Request, res: Response) => {
	//log.debug(res)
	//log.debug(req)
	//log.debug(req.body)

	var uid = req.body.uid // uid acc?
	var key = req.body.token // token aka key
	var cn = req.params.cn
	var ip = req.ip

	if (!isEmpty(cn)) {
		cn = cn.split("_")["0"]
	}

	var c = await Account.GET_ACCOUNT_GC(uid, key, cn, 2)

	//log.debug(c)

	if (c.retcode == 0) {
		log.info(`${uid} have logged (login registry) in from ${cn} using ip ${ip}`)
	} else {
		log.info(`${uid} login failed (login registry) because "${c.message}" in from ${cn} using ip ${ip}`)
	}

	return res.json(c)
})
// Cached token login (from registry), unfortunately this cannot be deleted or given a zero response
web.all("/:cn/combo/granter/login/v2/login", async (req: Request, res: Response) => {
	// TODO ACC
	//log.debug(res)
	//log.debug(req)
	//log.debug(req.body)
	//return res.json({ code: 0 })

	const d = JSON.parse(req.body.data) // tmp just send back

	return res.json({
		retcode: 0,
		message: "OK",
		data: {
			combo_id: 1,
			open_id: d.uid,
			combo_token: d.token, // I still don't understand what this function is?
			data: { guest: d.guest },
			heartbeat: false,
			account_type: 1,
			fatigue_remind: null
		}
	})
})
// Username & Password login (from client).
web.post("/:cn/mdk/shield/api/login", async (req: Request, res: Response) => {
	// TODO ACC
	//log.debug(res)
	//log.debug(req)
	//log.debug(req.body)
	//log.debug()
	//console.log(req)
	// hk4e_global = gs and hkrpg_global = sr

	var lang = req.headers['x-rpc-language']?.toString() || 'en';

	var username = req.body.account
	var password = req.body.password // temporarily useless
	var cn = req.params.cn
	var ip = req.ip

	if (!isEmpty(cn)) {
		cn = cn.split("_")["0"]
	}

	var c = await Account.GET_ACCOUNT_GC(username, "", cn)
	const ts = translate(c, lang);
	//log.debug(c)
	if (c.retcode == 0) {
		log.info(`${username} have logged (normal login) in from ${cn} using ip ${ip}`)
	} else {
		log.info(`${username} login failed (normal login) because "${c.message}" in from ${cn} using ip ${ip} / ${lang}`)
	}

	return res.json(ts)
})

// SR Stuff

// for list server sr
web.all("/query_dispatch", async (req: Request, res: Response) => {
	try {
		//log.debug(req.params)
		//log.debug(req.query)
		//log.debug(req.body)

		var d = req.query

		var data = await API_SR.GET_LIST_SERVER()

		return res.send(data)
	} catch (e) {
		log.error(e as Error)
		return res.json({
			retcode: 1,
			message: "Error",
		})
	}
})

web.all("/query_gateway", async (req: Request, res: Response) => {
	try {
		//log.debug(req.params)
		//log.debug(req.query)
		//log.debug(req.body)
		//log.debug(req.url)

		var d = req.query
		var p = req.params

		let version = d.version as string;
		let ip = req.ip ?? "?1";
		let dispatchSeed = d.dispatch_seed as string;
		let key = d.key_id as unknown as number;
		let name = p.name ?? "none"

		// TODO: get real name
		let lang = d.language_type ?? "?2";
		let platform = d.platform_type ?? "?3";

		if (version == undefined || dispatchSeed == undefined) {
			log.info(`ip ${ip} trying to access region with no config`)
			return res.send(API_GS.NO_VERSION_CONFIG())
		}

		log.info(`ip ${ip} trying to access region ${name} with ${version}|${lang}|${platform}|${dispatchSeed}|${key}`)

		var data = await API_SR.GET_DATA_REGION(name, dispatchSeed, key, version)

		return res.send(data)
	} catch (e) {
		log.error(e as Error)
		return res.send(API_GS.NO_VERSION_CONFIG())
	}
})

// GS Stuff

// for list server gs
web.all("/query_region_list", async (req: Request, res: Response) => {
	try {
		//log.debug(req.params)
		//log.debug(req.query)
		//log.debug(req.body)

		var d = req.query

		let version = d.version as string ?? "?0";
		let ip = req.ip as string ?? "?1";

		// TODO: get real name
		let lang = d.lang ?? "?2";
		let platform = d.platform ?? "?3";

		//const protocol = req.protocol; // 'http' or 'https'
		//const host = req.get('host'); // domain and port
		//const fullDomain = `${protocol}://${host}`;
		//log.debug(`Full Domain: ${fullDomain}`);

		log.info(`ip ${ip} trying to access region list with version ${version} and language codes ${lang} and platform ${platform}`)

		var data = await API_GS.GET_LIST_REGION(version)

		return res.send(data)
	} catch (e) {
		log.error(e as Error)
		return res.json({
			retcode: 1,
			message: "Error",
		})
	}
})

web.all("/query_cur_region/:name", async (req: Request, res: Response) => {
	try {
		//log.debug(req.params)
		//log.debug(req.query)
		//log.debug(req.body)
		//log.debug(req.url)

		var d = req.query
		var p = req.params

		let version = d.version as string;
		let ip = req.ip ?? "?1";
		let dispatchSeed = d.dispatchSeed as string;
		let key = d.key_id as unknown as number ?? 5;
		let name = p.name ?? "none"

		// TODO: get real name
		let lang = d.lang ?? "?2";
		let platform = d.platform ?? "?3";

		if (version == undefined || dispatchSeed == undefined || key == undefined) {
			//log.info(`ip ${ip} trying to access region with no config`)
			return res.send(API_GS.NO_VERSION_CONFIG())
		}

		log.info(`ip ${ip} trying to access region ${name} with ${version}|${lang}|${platform}|${dispatchSeed}|${key}`)

		var data = await API_GS.GET_DATA_REGION(name, dispatchSeed, key, version)

		return res.send(data)
	} catch (e) {
		log.error(e as Error)
		return res.send(API_GS.NO_VERSION_CONFIG())
	}
})

web.all("/query_cur_region", async (req: Request, res: Response) => {
	log.debug(req.params)
	log.debug(req.query)
	return res.json({ code: 0 })
})

web.all("/api/key/:id/*", async (req: Request, res: Response) => {
	log.debug(req.params)
	log.debug(req.query)
	log.debug(req.body)

	let ip = req.ip ?? "?1";

	let code = req.params[0].split('=')[1];

	log.info(`ip ${ip} trying input code ${code}`)

	// TODO: if code work send to all server in this acc?

	return res.json({
		retcode: 0,
		message: "Got it",
	})
})

// catch all if not found

web.use((req: Request, res: Response) => {
	log.warn(`${req.url} not found`);
	res.status(404).send("Sorry, my cat is lost...")
});

if (Config.Startup.webserver) {
	var listener = web.listen(set_port_local, function () {
		log.info(`Server started on port ${set_port_local}`)
	})
} else {
	log.info("skip run webserver...")
}

const webhookData: WebhookClientData = Config.webhook.stats;
const ping_notif = new WebhookClient(webhookData)
let ping_job = get_job()
ping_job.on("message", (d: { type: string; data: any }) => {
	try {
		if (d.type == "msg") {
			log.debug(d);
			if (Config.Startup.bot) {
				ping_notif.send(d.data)
			}
			log.info(`Send Ping:`, d.data.content)
		} else if (d.type == "bot_stats") {
			online_string = parseInt(d.data);
			if (Config.Startup.bot) {
				if (bot == undefined || bot.user == undefined) {
					return;
				}
				bot.user.setPresence({
					activities: [
						{
							name: d.data
						}
					],
					status: "online"
				})
			}
		} else {
			log.debug(d);
		}
	} catch (e) {
		log.error(e as Error)
		// Stop the Worker and restart it
		//ping_job.terminate();
		//ping_job = get_job();
	}
})
ping_job.on("error", (ex: Error) => {
	log.error(ex)

	// Stop the Worker and restart it
	try {
		ping_job.terminate()
		setTimeout(function () {
			ping_job = get_job()
		}, 3000)
	} catch (error) {
		log.error(error as Error)
	}
})
function get_job() {
	return new Worker("./src/job/ping")
}

RSAUtils.initKeys();

// Console
Interface.start();