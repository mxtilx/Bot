/**
 * Yuuki
 *
 * @format
 */

const log = require("./util/logger")

log.info("YuukiPS startup....")
process.on("unhandledRejection", (error) => {
	log.info(error)
	//process.exit(1);
})

const express = require("express")
const rateLimit = require("express-rate-limit")
const bodyParser = require("body-parser")

const cors = require("cors")
const eta = require("eta")
const { Worker } = require("worker_threads")

const argv = require("minimist")(process.argv.slice(2))
log.info(argv) // for debug

const port_http = argv.port || 3000

const api_control = require("./gm/control")

// TODO: use control version game by game type
const api_genshin = require("./game/genshin/api")
const api_starrails = require("./game/starrails/api")
const api_account = require("./account/api")

const mylib = require("./lib")
const config = require("./config.json")
var eta_plugin_random = require("./web/plugin/random")

const fs = require("node:fs")
const path = require("node:path")

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

bot.on(Events.Error, (error) => {
	log.error(error)
	//process.exit(1);
})

// Commands
bot.commands = new Collection()
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"))
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	bot.commands.set(command.data.name, command)
}

// Modal
bot.modals = new Collection()
const modalsPath = path.join(__dirname, "modals")
const modalsFiles = fs.readdirSync(modalsPath).filter((file) => file.endsWith(".js"))
for (const file of modalsFiles) {
	const filePath = path.join(modalsPath, file)
	const m = require(filePath)
	var name = file.replace(".js", "")
	//log.info(name);
	bot.modals.set(name, m)
}

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
	// TODO: Move to Folder Event Reaction

	// Ignore reactions from other bots
	if (user.bot) return

	// You are correct that the MessageReaction object that is passed to messageReactionAdd event handler is a partial object, and it does not contain the full message object. In order to get the full message object, you will need to fetch the message using the fetch() method.
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			log.error("Something went wrong when fetching the message:", error)
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
	if (member_give_reaction_have.some((role) => config.id_mod.includes(role.id))) {
		if (!member_get_reaction_have.some((role) => config.id_mod.includes(role.id))) {
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

bot.on(Events.InteractionCreate, async (interaction) => {
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
			await m.execute(interaction)
		} catch (error) {
			log.error("Modal Error", error)
		}
		return
	}

	// If interaction with inpu command
	if (!interaction.isChatInputCommand()) return
	const c = bot.commands.get(interaction.commandName)
	if (!c) return
	try {
		await c.execute(interaction)
	} catch (error_real) {
		try {
			await interaction.reply({
				content: "Command is not recognized :(",
				ephemeral: true
			})
		} catch (error_skip) {
			log.error(error_real)
		}
	}
})

// https://discordjs.guide/creating-your-bot/creating-commands.html#server-info-command
// https://discordjs.guide/popular-topics/intents.html#error-disallowed-intents
// https://stackoverflow.com/questions/64006888/discord-js-bot-disallowed-intents-privileged-intent-provided-is-not-enabled-o
// https://stackoverflow.com/a/69110976/3095372

bot.on("messageCreate", (message) => {
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

if (config.startup.bot) {
	log.info("bot run....")
	bot.login(config.token)
} else {
	log.info("bot skip run....")
}

// Ratelimit
const limit_cmd = rateLimit({
	windowMs: 120 * 1000,
	max: 100,
	statusCode: 200,
	message: {
		msg: "Too many requests, please try again later.",
		code: 403
	}
})

const web = express()

// body-parser middleware
web.use(bodyParser.json())
web.use(bodyParser.urlencoded({ extended: true }))

// Core
web.use(cors())

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

web.all("/", (req, res) => {
	const userAgent = req.headers["user-agent"]
	const type = req.query.type

	// login browser? (query: 'type=sdk'), sometimes it is cached by browser if login is official, so it breaks it. Maybe the Yuukips launcher has to clear cache every time you log in?
	if (type == "sdk") {
		if (userAgent.includes("Genshin Impact")) {
			log.warn(req)
			return res.send("Hello YuukiPS GS")
		} else if (userAgent.includes("Star Rail")) {
			log.warn(req)
			return res.send("Hello YuukiPS SR")
		}
	}

	res.render("home", {
		title: "Welcome to YuukiPS",
		description: "Im lazy to write"
	})
})

web.all("/command", (req, res) => {
	res.render("command", {
		title: "Command Tool",
		description: "Im lazy to write"
	})
})

// Web
web.all("/game/genshin", (req, res) => {
	res.render("genshin_list", {
		title: "Download Genshin",
		description: "Im lazy to write"
	})
})
// Web Download
web.all("/game/genshin/:id", (req, res) => {
	res.render("genshin_dl", {
		title: "Download Genshin",
		description: "Im lazy to write"
	})
})

web.all("/api", (req, res) => {
	res.send("API YuukiPS")
})

// Testing
web.all("/api/game/genshin", async (req, res) => {
	try {
		let d = await api_genshin.INFO()
		return res.json(d)
	} catch (error) {
		log.error(error)
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})

web.all("/api/server", async (req, res) => {
	try {
		let d = await api_control.Server()
		return res.json(d)
	} catch (error) {
		log.error(error)
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})
web.all("/api/server/:id", async (req, res) => {
	try {
		let d = await api_control.Server(req.params.id)
		return res.json(d)
	} catch (error) {
		log.error(error)
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})

web.all("/api/server/:id/ping", async (req, res) => {
	var s = "gio"

	if (req.params.id) {
		s = req.params.id
		var g_config = config.server[s]
		if (g_config) {
			// TODO: add check login
		} else {
			return res.json({
				msg: "Config server not found",
				code: 404
			})
		}
	}

	try {
		return res.json({
			data: {
				version: g_config.api.type
			},
			msg: "Hello",
			code: 200
		})
	} catch (error) {
		log.error(error)
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})

web.all("/api/server/:id/command", limit_cmd, async (req, res) => {
	let d = await api_control.GM(req.params.id, req.query.uid, req.query.cmd, req.query.code)
	return res.json(d)
})

web.get("/ip", async (request, response) => {
	response.send(request.ip)
})

// Hoyo Love Log Stuff

web.all("/common/h5log/log/batch", async (req, res) => {
	return res.json({ code: 0 })
})
web.all("/sdk/dataUpload", async (req, res) => {
	return res.json({ code: 0 })
})
web.all("/crashdump/dataUpload", async (req, res) => {
	return res.json({ code: 0 })
})
web.all("/apm/dataUpload", async (req, res) => {
	return res.json({ code: 0 })
})
web.all("/log", async (req, res) => {
	return res.json({ code: 0 })
})
web.all("/crash/dataUpload", async (req, res) => {
	return res.json({ code: 0 })
})
web.all("/sw.html", async (req, res) => {
	log.warn(req.params)
	log.warn(req.query)
	return res.json({ code: 0 })
})

// Hoyo Acc Stuff

web.all("/account/risky/api/check", async (req, res) => {
	return res.json({ retcode: 0, message: "OK", data: { id: "", action: "ACTION_NONE", geetest: null } })
})

web.all("/account/device/api/listNewerDevices", async (req, res) => {
	return res.json({ code: 0 })
})

// Config
web.all("/:cn/combo/granter/api/getConfig", async (req, res) => {
	// Fake Config SR
	log.warn(req.params)
	log.warn(req.query)
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
web.all("/:cn/mdk/shield/api/loadConfig", async (req, res) => {
	// Fake Config SR
	log.warn(req.params)
	log.warn(req.query)
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
web.all("/combo/box/api/config/sw/precache", async (req, res) => {
	return res.json({ code: 0 })
})
web.all("/combo/box/api/config/sdk/combo", async (req, res) => {
	return res.json({
		retcode: 0,
		message: "OK",
		data: {
			vals: { disable_email_bind_skip: "false", email_bind_remind_interval: "7", email_bind_remind: "false" }
		}
	})
})
web.all("/:cn/combo/granter/api/compareProtocolVersion", async (req, res) => {
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

web.all("/device-fp/api/getExtList", async (req, res) => {
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
web.all("/admin/mi18n/plat_os/:id1/:id2-version.json", async (req, res) => {
	log.warn(req.params)
	log.warn(req.query)
	return res.json({ code: 0 })
})
web.all("/admin/mi18n/plat_oversea/:id1/:id2-version.json", async (req, res) => {
	log.warn(req.params)
	log.warn(req.query)
	return res.json({ code: 0 })
})

web.all("/data_abtest_api/config/experiment/list", async (req, res) => {
	return res.json({ retcode: 0, success: true, message: "", data: [] })
})

web.all("/:cn/mdk/agreement/api/getAgreementInfos", async (req, res) => {
	return res.json({ retcode: 0, success: true, message: "", data: [] })
})

// Login
// Login Facebook
web.all("/sdkFacebookLogin.html", async (req, res) => {
	log.warn(req.params)
	log.warn(req.query)
	return res.json({ code: 0 })
})
// Login Twitter
web.all("/sdkTwitterLogin.html", async (req, res) => {
	log.warn(req.params)
	log.warn(req.query)
	return res.json({ code: 0 })
})
// Login Twitter (API?)
web.all("/Api/twitter_login", async (req, res) => {
	log.warn(req.params)
	log.warn(req.query)
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
web.all("/Api/facebook_login", async (req, res) => {
	log.warn(req.params)
	log.warn(req.query)
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
web.all("/:cn/mdk/guest/guest/v2/login", async (req, res) => {
	log.warn(req.params)
	log.warn(req.query)
	return res.json({ code: 0 })
})
// Cached token login (from registry).
web.all("/:cn/mdk/shield/api/verify", async (req, res) => {
	log.warn(res)
	log.warn(req)
	log.warn(req.body)

	var uid = req.body.uid // uid acc?
	var key = req.body.token // token aka key
	var cn = req.params.cn
	var ip = req.ip

	if (!mylib.isEmpty(cn)) {
		cn = cn.split("_")["0"]
	}

	var c = await api_account.GET_ACCOUNT_GC(uid, key, cn, 2)

	log.debug(c)

	if (c.retcode == 0) {
		log.info(`${uid} have logged (login registry) in from ${cn} using ip ${ip}`)
	} else {
		log.info(`${uid} login failed (login registry) because "${c.message}" in from ${cn} using ip ${ip}`)
	}

	return res.json(c)
})
// Cached token login (from registry), unfortunately this cannot be deleted or given a zero response
web.all("/:cn/combo/granter/login/v2/login", async (req, res) => {
	// TODO ACC
	log.warn(res)
	log.warn(req)
	log.warn(req.body)
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
web.post("/:cn/mdk/shield/api/login", async (req, res) => {
	// TODO ACC
	log.warn(res)
	log.warn(req)
	log.warn(req.body)
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

	var c = await api_account.GET_ACCOUNT_GC(username, "", cn)

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
web.all("/query_dispatch", async (req, res) => {
	try {
		log.warn(req.params)
		log.warn(req.query)

		var d = req.query

		var data = await api_starrails.GET_LIST_SERVER()

		return res.send(data)
	} catch (error) {
		log.error(error)
	}
})

// GS Stuff

// catch all if not found

web.use((req, res, next) => {
	res.status(404).send("Sorry my cat is lost...")
	log.warn(req.url)
})

if (config.startup.webserver) {
	var listener = web.listen(port_http, function () {
		log.info("Server started on port %d", listener.address().port)
	})
} else {
	log.info("skip run webserver...")
}

const ping_notif = new WebhookClient(config.webhook.stats)
let ping_job = get_job()
ping_job.on("message", (d) => {
	try {
		if (d.type == "msg") {
			if (config.startup.bot) {
				ping_notif.send(d.data)
			}
			log.info(`Send Ping:`, d.data.content)
		} else if (d.type == "bot_stats") {
			if (config.startup.bot) {
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
	} catch (ex) {
		log.error(ex)
		// Stop the Worker and restart it
		//ping_job.terminate();
		//ping_job = get_job();
	}
})
ping_job.on("error", (ex) => {
	log.error(ex)

	// Stop the Worker and restart it
	try {
		ping_job.terminate()
		setTimeout(function () {
			ping_job = undefined
			ping_job = get_job()
		}, 3000)
	} catch (error) {
		log.error("error restart....")
	}
})
function get_job() {
	return new Worker("./src/job/ping.js")
}
