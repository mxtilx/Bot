/**
 * Yuuki
 *
 * @format
 */

// Important
import Config from './util/config';
import Logger from "./util/logger";

// WEB
import express, { Request, Response, NextFunction } from 'express';
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import cors from 'cors';
import eta from "eta";

// Node
import { Worker } from 'worker_threads';

// API
import Account from "./account/api";
import { Server as Server_Control, GM as API_GM } from "./gm/control";
import { INFO as INFO_GS } from "./game/genshin/api";
import { GET_LIST_SERVER as GET_LIST_SERVER_SR } from "./game/starrails/api";

const log = new Logger("YuukiPS");
log.info("YuukiPS startup....")
process.on("unhandledRejection", (error) => {
	log.info(error as Error)
	//process.exit(1);
})

const argv = require("minimist")(process.argv.slice(2))
log.debug(argv)

const port_http = argv.port || 3000



// TODO: use control version game by game type


const mylib = require("./lib")
//const config = require("./config.json")
var eta_plugin_random = require("./web/plugin/random")

import * as fs from 'fs';
import * as path from 'path';

const { Client, Collection, GatewayIntentBits, Partials, Events, WebhookClient, EmbedBuilder } = require("discord.js")

// debug, remove some later
const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
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

// Commands
bot.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith(".ts"));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const m = require(filePath);
	let name = file.replace(".ts", "")
	bot.commands.set(name, m);
}

// Modal
bot.modals = new Collection()
const modalsPath = path.join(__dirname, "modals")
const modalsFiles = fs.readdirSync(modalsPath).filter((file: string) => file.endsWith(".ts"))
for (const file of modalsFiles) {
	const filePath = path.join(modalsPath, file)
	const m = require(filePath)
	let name = file.replace(".ts", "")
	bot.modals.set(name, m)
}

bot.on(Events.MessageReactionAdd, async (reaction: { partial: any; fetch: () => any; message: { channel: { id: any }; author: { id: any; username: any }; content: any; guild: any }; emoji: { name: any } }, user: { bot: any; id: any; username: any }) => {
	// TODO: Move to Folder Event Reaction

	// Ignore reactions from other bots
	if (user.bot) return

	// You are correct that the MessageReaction object that is passed to messageReactionAdd event handler is a partial object, and it does not contain the full message object. In order to get the full message object, you will need to fetch the message using the fetch() method.
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			log.error(error as Error)
			return
		}
	}

	var channelId = reaction.message.channel.id
	var is = reaction.emoji.name
	var id_user = user.id // whos reaction
	var name_user = user.username

	var id_user_to_reaction = reaction.message.author.id // whos message
	var name_user_get_reaction = reaction.message.author.username // whos message
	var msg = reaction.message.content

	const id_role_member = "1039554857746583573" // id member
	const id_role_mute = "1040051266912534598" // id mute member

	// Get role object for role id
	const guild = reaction.message.guild
	const muteRole = guild.roles.cache.get(id_role_mute)
	const MemberRole = guild.roles.cache.get(id_role_member)

	// Get user id from message that get reaction
	const member_get_reaction = guild.members.cache.get(id_user_to_reaction)
	const member_get_reaction_have = member_get_reaction.roles.cache

	// Get user id from person doing reaction
	const member_give_reaction = guild.members.cache.get(id_user)
	const member_give_reaction_have = member_give_reaction.roles.cache

	log.debug(`LOG Reaction: ${name_user} ${is} -> ${channelId}`)

	// Mod Control
	if (member_give_reaction_have.some((role: { id: any }) => Config.id_mod.includes(role.id))) {
		if (!member_get_reaction_have.some((role: { id: any }) => Config.id_mod.includes(role.id))) {
			if (is === "🔒") {
				log.warn(`lock ${name_user_get_reaction}`)
				// Check if user already has the mute role
				if (member_get_reaction_have.has(muteRole.id)) {
					log.warn(`${name_user_get_reaction} already has mute role, so do nothing`)
				} else {
					log.info(`${name_user_get_reaction} set mute role`)
					member_get_reaction.roles.add(muteRole)

					if (member_get_reaction_have.has(id_role_member)) {
						log.info(`${name_user_get_reaction} remove member`)
						member_get_reaction.roles.remove(MemberRole)
					} else {
						log.warn(`${name_user_get_reaction} no member, so do nothing`)
					}
				}
			} else if (is === "🔓") {
				log.warn(`unlock ${name_user_get_reaction}`)

				if (member_get_reaction_have.has(muteRole.id)) {
					log.info(`${name_user_get_reaction} set unlock...`)
					member_get_reaction.roles.remove(muteRole)
				} else {
					log.warn(`${name_user_get_reaction} does not have mute role, so do nothing`)
				}
			}
		} else {
			log.warn(`${name_user_get_reaction} mod, so skip`)
		}
	}

	// Get Member
	if (channelId == "1039554337438961714") {
		// Check if user already has mute role
		if (member_give_reaction_have.has(muteRole.id)) {
			log.warn(`${name_user} Unable to verify, because it has a mute role`)
		} else {
			// User does not have mute role, so add it
			if (!member_give_reaction_have.has(MemberRole.id)) {
				member_give_reaction.roles.add(MemberRole)
				log.info(`${name_user} Has been added as a member`)
			} else {
				log.warn(`${name_user} Already added as a member`)
			}
		}
	}
})

bot.on(Events.InteractionCreate, async (interaction: { channel: { id: any; name: any }; user: { id: any }; commandName: any; isModalSubmit: () => any; customId: any; isChatInputCommand: () => any; reply: (arg0: { content: string; ephemeral: boolean }) => any }) => {
	var cn_id = interaction.channel.id
	var user_id = interaction.user.id

	// if found cmd
	var use_cmd = interaction.commandName
	if (use_cmd) {
		// Skip LOG
		if (!mylib.contains(use_cmd, ["cmd"])) {
			log.info(`Event Interaction: ${use_cmd} - ${user_id} (Channel: ${interaction.channel.name} - ${cn_id}`)
		}
	} else {
		// Log Normal
		log.info(`Event Interaction:  ${user_id} (Channel: ${interaction.channel.name} - ${cn_id})`)
	}

	// If modal with input command
	if (interaction.isModalSubmit()) {
		const m = bot.modals.get(interaction.customId)
		if (!m) return
		try {
			await m.default.process(interaction)
		} catch (error) {
			log.error(error as Error)
		}
		return
	}

	// If interaction with inpu command
	if (!interaction.isChatInputCommand()) return
	const c = bot.commands.get(interaction.commandName)
	console.log(interaction.commandName)
	console.log(c)
	if (!c) return
	try {
		if (c.default) {
			console.log("newaaaaa")
			await c.default.process(interaction) // new
		} else {
			console.log("aaaaold")
			await c.execute(interaction) // old
		}
	} catch (e) {
		log.error(e as Error)
		try {
			await interaction.reply({
				content: `Command ${interaction.commandName} is not recognized.`,
				ephemeral: false
			})
		} catch (error_skip) {
			// skip
		}
	}
})

// https://discordjs.guide/creating-your-bot/creating-commands.html#server-info-command
// https://discordjs.guide/popular-topics/intents.html#error-disallowed-intents
// https://stackoverflow.com/questions/64006888/discord-js-bot-disallowed-intents-privileged-intent-provided-is-not-enabled-o
// https://stackoverflow.com/a/69110976/3095372

bot.on("messageCreate", (message: { author: { bot: any; username: any; id: any }; channel: { id: any; name: any }; content: string; interaction: { commandName: any }; react: (arg0: string) => void }) => {
	// ignore messages from bots
	if (message.author.bot) return

	// 969145030537281536,988248508429647922 = log public (join/out/levelup) | 987073348418809928 = log private
	if (!mylib.contains(message.channel.id, ["969145030537281536", "987073348418809928", "988248508429647922"])) {
		if (message.content) {
			log.info(
				`Message from ${message.author.username} - ${message.author.id} (Channel: ${message.channel.name} - ${message.channel.id}):\n-> ${message.content}`
			)
		}
	}

	// Log User Interaction
	if (message.interaction) {
		var use_cmd = message.interaction.commandName
		if (!mylib.contains(use_cmd, ["cmd"])) {
			log.info("Message Create with Interaction Message: " + use_cmd)
		}
	}

	// Add Melon
	if (message.content.toLowerCase() === "melon") {
		message.react("🍈")
	}
})

if (Config.Startup.bot) {
	log.info("bot run....")
	bot.login(Config.token)
} else {
	log.info("bot skip run....")
}

// Ratelimit
const limit_cmd = rateLimit({
	windowMs: 2 * 1000,
	max: 1,
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

const web = express()

// body-parser middleware
web.use(bodyParser.json())
web.use(bodyParser.urlencoded({ extended: true }))

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
				log.warn(req as any)
				return res.send("Hello YuukiPS GS")
			} else if (userAgent.includes("Star Rail")) {
				log.warn(req as any)
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
		let d = await INFO_GS()
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
		let d = await Server_Control()
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
		let d = await Server_Control(req.params.id)
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
	let d = await API_GM(req.params.id, req.query.uid, req.query.cmd, req.query.code)
	return res.json(d)
})

web.get("/ip", async (req: Request, res: Response) => {
	res.send(req.ip)
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
web.all("/sw.html", async (req: Request, res: Response) => {
	log.debug(req.params)
	log.debug(req.query)
	return res.json({ code: 0 })
})

// Hoyo Acc Stuff

web.all("/account/risky/api/check", async (req: Request, res: Response) => {
	return res.json({ retcode: 0, message: "OK", data: { id: "", action: "ACTION_NONE", geetest: null } })
})

web.all("/account/device/api/listNewerDevices", (req: Request, res: Response) => {
	return res.json({ code: 0 })
})

// Config
web.all("/:cn/combo/granter/api/getConfig", async (req: Request, res: Response) => {
	// Fake Config SR
	log.debug(req.params)
	log.debug(req.query)
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
	log.debug(req.params)
	log.debug(req.query)
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
	log.debug(req.params)
	log.debug(req.query)
	return res.json({ code: 0 })
})
web.all("/admin/mi18n/plat_oversea/:id1/:id2-version.json", async (req: Request, res: Response) => {
	log.debug(req.params)
	log.debug(req.query)
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
	log.debug(req.params)
	log.debug(req.query)
	return res.json({ code: 0 })
})
// Login Twitter
web.all("/sdkTwitterLogin.html", async (req: Request, res: Response) => {
	log.debug(req.params)
	log.debug(req.query)
	return res.json({ code: 0 })
})
// Login Twitter (API?)
web.all("/Api/twitter_login", async (req: Request, res: Response) => {
	log.debug(req.params)
	log.debug(req.query)
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
	log.debug(req.params)
	log.debug(req.query)
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
	log.debug(req.params)
	log.debug(req.query)
	return res.json({ code: 0 })
})
// Cached token login (from registry).
web.all("/:cn/mdk/shield/api/verify", async (req: Request, res: Response) => {
	//log.debug(res)
	//log.debug(req)
	log.debug(req.body)

	var uid = req.body.uid // uid acc?
	var key = req.body.token // token aka key
	var cn = req.params.cn
	var ip = req.ip

	if (!mylib.isEmpty(cn)) {
		cn = cn.split("_")["0"]
	}

	var c = await Account.GET_ACCOUNT_GC(uid, key, cn, 2)

	log.debug(c)

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
	log.debug(res)
	log.debug(req)
	log.debug(req.body)
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
	log.debug(res)
	log.debug(req)
	log.debug(req.body)
	//log.warn(req.query)
	//console.log(req)
	// hk4e_global = gs and hkrpg_global = sr

	var username = req.body.account
	var password = req.body.password // temporarily useless
	var cn = req.params.cn
	var ip = req.ip

	if (!mylib.isEmpty(cn)) {
		cn = cn.split("_")["0"]
	}

	var c = await Account.GET_ACCOUNT_GC(username, "", cn)

	log.debug(c)

	if (c.retcode == 0) {
		log.info(`${username} have logged (normal login) in from ${cn} using ip ${ip}`)
	} else {
		log.info(`${username} login failed (normal login) because "${c.message}" in from ${cn} using ip ${ip}`)
	}

	return res.json(c)
})

// SR Stuff

// for list server sr
web.all("/query_dispatch", async (req: Request, res: Response) => {
	try {
		log.debug(req.params)
		log.debug(req.query)
		log.debug(req.body)

		var d = req.query

		var data = await GET_LIST_SERVER_SR()

		return res.send(data)
	} catch (e) {
		log.error(e as Error)
	}
})

// GS Stuff

// catch all if not found

web.use((req: Request, res: Response) => {
	log.warn(`${req.url} not found`);
	res.status(404).send("Sorry, my cat is lost...")	
});

if (Config.Startup.webserver) {
	var listener = web.listen(port_http, function () {
		log.info(`Server started on port`)
	})
} else {
	log.info("skip run webserver...")
}

const ping_notif = new WebhookClient(Config.webhook.stats)
let ping_job = get_job()
ping_job.on("message", (d: { type: string; data: { content: any } }) => {
	try {
		if (d.type == "msg") {
			if (Config.Startup.bot) {
				ping_notif.send(d.data)
			}
			log.info(`Send Ping:`, d.data.content)
		} else if (d.type == "bot_stats") {
			if (Config.Startup.bot) {
				bot.user.setPresence({
					activities: [
						{
							name: d.data
						}
					],
					status: "online"
				})
			}
		}
	} catch (e) {
		log.error(e as Error)
		// Stop the Worker and restart it
		//ping_job.terminate();
		//ping_job = get_job();
	}
})
ping_job.on("error", (ex: any) => {
	log.error(ex)

	// Stop the Worker and restart it
	try {
		ping_job.terminate()
		setTimeout(function () {
			ping_job = get_job()
		}, 3000)
	} catch (error) {
		log.error("error restart....")
	}
})
function get_job() {
	return new Worker("./src/job/ping.js")
}
