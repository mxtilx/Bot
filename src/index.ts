/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// Important
import { join, basename } from "path"
import fs from "fs/promises"
import {
	sleep,
	isEmpty,
	contains,
	clientTypeFromClientId,
	generateSEOTitle,
	bitsToGigabytes,
	bytesToGigabytes,
	readFileAsync,
	registerEvent
} from "./util/library"
import Config from "./util/config"
import Logger from "./util/logger"
import Interface from "./commands/server/Interface"
import crypto from "crypto"

// WEB
import express, { Request, Response, NextFunction } from "express"
import rateLimit from "express-rate-limit"
import bodyParser from "body-parser"
import cors from "cors"
import eta from "eta"

// Node
import { Worker } from "worker_threads"

// Translate
import backend from "i18next-node-fs-backend"
import cookieParser from "cookie-parser"
import i18next from "i18next"
import i18nextMiddleware from "i18next-http-middleware"
import chokidar from "chokidar"

// API Discord
import {
	Client,
	GatewayIntentBits,
	Partials,
	Events,
	WebhookClient,
	WebhookClientData,
	TextChannel,
	DMChannel,
	NewsChannel,
	Routes,
	REST
} from "discord.js"

import register from "./util/registercommands"

// API
import Account from "./db/account/api"
import Control, { ListServer, ServerData } from "./commands/gm/control"
import API_GS, { GSDispatch } from "./game/genshin/api"
import API_SR, { SRDispatch } from "./game/starrails/api"

import { RSAUtils } from "./game/hoyolab/crypto"
import axios from "axios"
import { statusCodes } from "./util/constants"
import announcement from "./web/plugin/announcement"

const c_sys = new Logger("System")
const c_job = new Logger("Job")
const c_bot = new Logger("Bot")
const c_web = new Logger("Web")
const c_dp = new Logger("Dispatch")

// Handler error
process.on("uncaughtException", (error: Error) => {
	c_sys.error({ msg: "uncaughtException", error: error })
})
process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
	if (reason == undefined) {
		c_sys.error({ msg: "unhandledRejection does not work wtf", error: promise })
		return
	}
	c_sys.error({ msg: "unhandledRejection", error: reason })
	//process.exit(1)
})

// Temporary Config
const argv = require("minimist")(process.argv.slice(2))
c_sys.debug(argv)

let regcmd = argv.reg || false
let online_string: number = 9999

const set_env = argv.env || "prod"
let config_tmp = Config.profile.find((profile) => profile.name === set_env)

if (config_tmp == undefined) {
	c_sys.error("No Config Found....")
	process.exit(1)
}

let public_url = config_tmp.url.public

c_sys.info(`Hi ${config_tmp.title} | URL: ${public_url} | ${set_env}`)

// TODO: make index go green

// Setup Dispatch
let GS_Dispatch = new GSDispatch(public_url, c_dp)
let SR_DIspatch = new SRDispatch(public_url, c_dp)

var eta_plugin_random = require("./web/plugin/random")

//TODO: move bot

// debug, remove some later
let bot = new Client({
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

// Interaction Bot
bot.on("interactionCreate", async (interaction) => {
	let username = interaction.user.username
	let username_id = interaction.user.id

	const channel_name =
		interaction.channel instanceof TextChannel
			? interaction.channel.name
			: interaction.channel instanceof DMChannel
			? interaction.channel.recipient?.username // or any other property/method you want to use for DMChannel
			: interaction.channel instanceof NewsChannel
			? interaction.channel.name
			: "Unknown Channel"

	c_bot.info(`Event Interaction ${username}#${username_id} in Channel${channel_name} with Type ${interaction.type}`)

	if (interaction.isCommand()) {
		c_bot.debug(`/${interaction.commandName} was called by ${username}`)
		import(`./commands/discord/${interaction.commandName}`)
			.then(async (cmd) => {
				await cmd.default.process(interaction)
			})
			.catch(async (error) => {
				c_bot.error(error as unknown as Error)
			})
	} else if (interaction.isModalSubmit()) {
		// TODO
	} else if (interaction.isButton()) {
		// TODO
	}
})

// Event
bot.on("messageCreate", async (message) => {
	await registerEvent("messageCreate", message)
})
bot.on("messageReactionAdd", async (reaction, user) => {
	await registerEvent("messageReactionAdd", reaction, user, bot)
})
bot.on("guildMemberAdd", async (member) => {
	await registerEvent("guildMemberAdd", member)
})
bot.on("messageUpdate", async (oldMessage, newMessage) => {
	await registerEvent("messageUpdate", oldMessage, newMessage)
})
bot.on("messageDelete", async (message) => {
	await registerEvent("messageDelete", message)
})
bot.on("messageDeleteBulk", async (messages) => {
	await registerEvent("messageDeleteBulk", messages)
})

if (regcmd) {
	const rest = new REST({ version: "9" }).setToken(Config.api.discord.client_secret)
	register()
		.then((commands) => {
			return rest.put(
				Routes.applicationGuildCommands(Config.api.discord.client_id, Config.api.discord.guild_id),
				{
					body: commands
				}
			)
		})
		.then(() => {
			console.log("Commands registered successfully.")
		})
		.catch((error) => {
			console.error("Failed to register commands:", error)
		})
} else {
	c_bot.warn(`skip register`)
}

bot.on("error", (error: Error) => {
	c_bot.error({ msg: "Bot encountered an error", error: error })
})
bot.on("ready", () => {
	if (bot == undefined) {
		c_bot.warn("idk bot")
		return
	}
	c_bot.info(`Ready to serve in ${bot.guilds.cache.size} guilds as ${bot.user?.tag}.`)
})

let connectionDelay = 1000 * 10 // Initial delay of 10 seconds
function connectWithRetry() {
	bot.login(Config.api.discord.token)
		.then(() => {
			c_bot.info("Bot connected successfully.")
		})
		.catch((error) => {
			c_bot.error({ msg: "Failed to connect:", error: error })
			c_bot.warn(`Retrying connection in ${connectionDelay / 1000} seconds...`)
			setTimeout(connectWithRetry, connectionDelay)
			connectionDelay += 1000 * 5 // Increase delay by 5 seconds for subsequent attempts
		})
}
connectWithRetry()

// Ratelimit
const limit_cmd = rateLimit({
	windowMs: 3 * 1000,
	max: 5,
	statusCode: 200,
	message: async (request: Request, response: Response) => {
		c_web.info(`limit ${request.ip}`)
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
		c_web.info(`limit login ${request.ip}`)
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
		c_web.info(`limit login token ${request.ip}`)
		return {
			data: null,
			retcode: 1,
			message: "Expired login (2)"
		}
	}
})

// Initialize i18next
i18next
	.use(backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		//debug: true,
		lowerCaseLng: true,
		fallbackLng: "en", // Default language fallback
		preload: ["en"], // Preload supported languages
		ns: ["translation"],
		backend: {
			loadPath: join(__dirname, "../src/language/{{lng}}.json") // Path to language files
		}
	})

// Watch for changes in the language files
const languageFilesPath = join(__dirname, "../src/language/*.json")
chokidar.watch(languageFilesPath).on("change", (file) => {
	const langCode = basename(file, ".json")
	console.log(`Language file ${file} has changed. Reloading '${langCode}' language...`)
	i18next.reloadResources(langCode)
})

// TODO move route web
const web = express()

web.use(bodyParser.json({ limit: "50mb" }))
web.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
web.use(cookieParser())
web.use(i18nextMiddleware.handle(i18next))

// Function to translate a string based on the user's language preference
function translateString(key: string, req: Request): string {
	const translation = req.t(key) // { lng: userLanguage }
	return translation
}

// Function to translate a JSON object based on the user's language preference
function translate(data: Record<string, any>, req: Request): Record<string, any> {
	const translatedData: Record<string, any> = {}

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key]
			if (typeof value === "string") {
				const translatedValue = translateString(value, req)
				//console.log("load " + value + " > " + translatedValue);
				translatedData[key] = translatedValue
			} else if (typeof value === "object" && value !== null) {
				const translatedValue = translate(value, req)
				//console.log(translatedValue);
				translatedData[key] = translatedValue
			} else {
				translatedData[key] = value
			}
		}
	}

	return translatedData
}

// Core
web.use(cors())

// Static
web.use(express.static(__dirname + "/web/public"))

// LOG STUFF, maybe move to config
const log_hoyo = [
	"/*/dataUpload",
	"/common/h5log/log/batch?*",
	"/sdk/dataUpload",
	"/crashdump/dataUpload",
	"/apm/dataUpload",
	"/log",
	"/crash/dataUpload",
	"/h5/upload",
	"/h5/dataUpload",
	"/errlog"
]

// done cek
const done_check = [
	"/ip", // get your ip
	"/status/server", // cek online
	"/api/server", // get server
	"/query_cur_region/*", // GS
	"/query_region_list" // GS
	//"/account/*",
	//"/combo/*",
	//"/admin/*",
	//"/api/verify"
]

web.use("/*", (req: Request, res: Response, next: NextFunction) => {
	const lowerCaseOriginalUrl = req.originalUrl.toLowerCase()

	// IF HOYO URL
	if (
		log_hoyo.some((pattern) => {
			const regexPattern = pattern.replace(/\*/g, ".*")
			return new RegExp(`^${regexPattern}$`, "i").test(lowerCaseOriginalUrl)
		})
	) {
		return res.json({ retcode: 200, message: "Success", data: 404 })
	}

	// IF DONE URL
	if (
		done_check.some((pattern) => {
			const regexPattern = pattern.replace(/\*/g, ".*")
			return new RegExp(`^${regexPattern}$`, "i").test(lowerCaseOriginalUrl)
		})
	) {
		return next()
	}

	// Add Log debug information if not done yet
	if (config_tmp?.debug.web) {
		c_web.debug({
			route: `${req.originalUrl}`,
			params: req.params,
			query: req.query,
			body: req.body
		})
	}

	// Call the next middleware or route handler
	next()
})

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
	const action = req.query.action

	// login browser? (query: 'type=sdk'), sometimes it is cached by browser if login is official, so it breaks it. Maybe the Yuukips launcher has to clear cache every time you log in?
	if (userAgent !== undefined && userAgent.includes("ZFBrowser")) {
		return res.redirect("/account/login")
	} else {
		c_web.debug(`Home Enter ${userAgent}`)
	}

	res.render("home", {
		title: req.t("home_title"),
		description: req.t("home_description"),
		keyword: req.t("home_keyword"),
		index: true,
		t: req.t,
		c: config_tmp,
		type: type,
		action: action
	})
})

// Account
web.all("/account/login", async (req: Request, res: Response) => {
	var action = "none"
	var message = ""

	const userAgent = req.headers["user-agent"]

	var p = req.body
	if (!isEmpty(p.login_username) && !isEmpty(p.login_password)) {
		if (userAgent !== undefined && userAgent.includes("ZFBrowser")) {
			// not work
			/*
			var accessToken = btoa(
				JSON.stringify({
					account: p.login_username,
					password: p.login_password,
					is_crypto: false
				})
			)
			return res.send(
				`<h1>Wait login...</h1><meta http-equiv="refresh" content="0;url=uniwebview://sdkThirdLogin?accessToken=${accessToken}">`
			)
			*/
			action = "OK_LOGIN"
		} else {
			action = "OK_LOGIN"
		}
	} else if (!isEmpty(p.reg_username) && !isEmpty(p.reg_email) && !isEmpty(p.reg_pass) && !isEmpty(p.reg_pass_tes)) {
		try {
			const verificationResponse = await axios.post(
				"https://hcaptcha.com/siteverify",
				new URLSearchParams({
					secret: Config.api.hcaptcha.key,
					response: p["h-captcha-response"]
				})
			)
			var dx = verificationResponse.data
			if (dx.success) {
				let r = await Account.CREATE_ACCOUNT_GC(p.reg_username, p.login_password)
				if (r.retcode == 0) {
					action = "OK_REG"
				} else {
					action = "FAILD_REG"
				}
				message = req.t(r.message)
			} else {
				c_web.error({ name: "FAILD_REG", error: dx })
				action = "FAILD_REG"
				message = req.t("web_title_error_captcha_failed")
			}
		} catch (error) {
			c_web.error({ name: "FAILD_REG", error: error })
			action = "FAILD_REG"
			message = req.t("web_title_error_unknown")
		}
	}
	res.render("account/login", {
		title: req.t("account_title"),
		description: req.t("account_description"),
		keyword: req.t("account_keyword"),
		index: false,
		t: req.t,
		c: config_tmp,
		action: action,
		message: message
	})
})

web.all("/command", (req: Request, res: Response) => {
	res.render("command", {
		title: req.t("command_title"),
		description: req.t("command_description"),
		keyword: req.t("command_keyword"),
		index: true,
		t: req.t,
		c: config_tmp
	})
})

// Web Portal
web.all("/game/:cn", async (req: Request, res: Response) => {
	var game_id = 0
	var p = req.params
	if (p.cn == "genshin-impact") {
		game_id = 1
	} else if (p.cn == "star-rail") {
		game_id = 2
	} else {
		//p.cn = "no-found"
		return res.redirect(`/?action=404&game=${p.cn}`)
	}
	var title = generateSEOTitle(p.cn)
	let data
	try {
		data = JSON.parse(await fs.readFile(join(__dirname, `./web/public/json/${p.cn}/download.json`), "utf8"))
	} catch (error) {
		c_web.error({ name: "portal game", error: error })
	}
	res.render("game", {
		title: req.t(`game_title_id_${game_id}`),
		description: req.t(`game_description_id_${game_id}`),
		keyword: req.t(`game_keyword_id_${game_id}`),
		index: true,
		t: req.t,
		c: config_tmp,
		game_title: `${title}`,
		game_id: game_id,
		data: data,
		bytesToGigabytes: bytesToGigabytes
	})
})

web.all("/api", (req: Request, res: Response) => {
	res.send(`API ${config_tmp?.title} v2`)
})

// Launcher Api
web.get("/api/:namegame/patch/:md5", async (req: Request, res: Response) => {
	const { md5 } = req.params
	const filePath = join(__dirname, `./web/public/json/genshin-impact/version/patch/${md5}.json`)
	try {
		const fileContent = await fs.readFile(filePath)
		res.setHeader("Content-Type", "application/json")
		res.send(fileContent)
	} catch (error) {
		c_web.debug({ name: `error ${md5} : ${filePath}`, error: error })
		return res.json({ retcode: 404, message: "Error", data: 404 })
	}
})

web.all("/api/launcher/server", async (req: Request, res: Response) => {
	const time_ms = Date.now().toString()
	return res.json({
		time: time_ms,
		list: [
			{
				name: "YuukiPS",
				host: "ps.yuuki.me",
				game: "GS",
				port: 443,
				https: true,
				version: "3.4.0"
			},
			{
				name: "Localhost",
				host: "localhost",
				game: "GS",
				port: 443,
				https: false,
				version: "3.4.0"
			},
			{
				name: "Official Servers",
				host: "official",
				game: "GS",
				port: 443,
				https: true,
				version: "3.4.0"
			}
		]
	})
})
web.all("/api/:namegame/banner", async (req: Request, res: Response) => {
	const filePath = join(__dirname, `./web/public/json/genshin-impact/banner.json`)
	try {
		const fileContent = await fs.readFile(filePath)
		res.setHeader("Content-Type", "application/json")
		res.send(fileContent)
	} catch (error) {
		c_web.debug({ name: `error banner : ${filePath}`, error: error })
		return res.json({ retcode: 404, message: "Error", data: 404 })
	}
})
web.all("/api/:namegame/event", async (req: Request, res: Response) => {
	const filePath = join(__dirname, `./web/public/json/genshin-impact/event.json`)
	try {
		const fileContent = await fs.readFile(filePath)
		res.setHeader("Content-Type", "application/json")
		res.send(fileContent)
	} catch (error) {
		c_web.debug({ name: `error event : ${filePath}`, error: error })
		return res.json({ retcode: 404, message: "Error", data: 404 })
	}
})

// Testing
web.all("/api/game/:name_game", async (req: Request, res: Response) => {
	try {
		let d = await API_GS.INFO()
		return res.json(d)
	} catch (e) {
		c_web.error({ name: "API_GAME", error: e })
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})

web.all("/api/server", async (req: Request, res: Response) => {
	try {
		let need_reload = req.query.reload as unknown as boolean;
		let d = await Control.Server(need_reload)
		return res.json(d)
	} catch (e) {
		c_web.error({ name: "GET SERVER", error: e })
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})
web.all("/api/server/:id", async (req: Request, res: Response) => {
	try {
		let id = req.params.id;
		let d = await Control.Server(false, id)
		return res.json(d)
	} catch (e) {
		c_web.error({ name: "GET LIST SERVER", error: e })
		return res.json({
			msg: "Error",
			code: 302
		})
	}
})

web.all("/api/server/:id/ping", async (req: Request, res: Response) => {
	var s = "gio"

	if (req.params.id) {
		s = req.params.id
		var g_config = Config.server.find((server) => server.name === s)
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
		c_web.error({ name: "PING SERVER", error: e })
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
web.get("/teslang", async (req: Request, res: Response) => {
	res.send({
		"req.language": req.language,
		"req.i18n.language": req.i18n.language,
		"req.i18n.languages": req.i18n.languages,
		"req.i18n.languages[0]": req.i18n.languages[0],
		'req.t("title")': req.t("title")
	})
})

// Combo
web.all("/status/server", (req: Request, res: Response) => {
	return res.json({
		retcode: statusCodes.success.RETCODE,
		status: {
			runMode: "HYBRID",
			MemoryMax: 1,
			MemoryCurrently: 1,
			MemoryInit: 1,
			MemoryCommitted: 1,
			Thread: 1,
			ThreadTotalStarted: 1,
			ThreadDaemon: 1,
			TotalPlayer: 0,
			playerCount: online_string,
			maxPlayer: 1000,
			DockerGS: "null",
			Version: "5.0 devkit"
		}
	})
})

// event
web.all("/ys/event/:id_event/index.html", async (req: Request, res: Response) => {
	var p = req.params
	if (p.id_event == "e20210830cloud") {
		return res.redirect("/command")
	} else {
		//TOOD
	}
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

// announcement
web.all("/:cn/announcement/index.html", async (req: Request, res: Response) => {
	res.render("announcement/home", {
		title: req.t("announcement_title"),
		description: req.t("announcement_description"),
		keyword: req.t("announcement_keyword"),
		index: false,
		t: req.t,
		c: config_tmp
	})
})
web.all("/common/:cn/announcement/api/:id1", async (req: Request, res: Response) => {
	var p = req.params
	var target = p.id1

	let jsonData = null
	let time_ms = Date.now().toString()
	if (target == "getAnnList") {
		var cx = await announcement.getPostData(false)
		jsonData = {
			retcode: 0,
			message: "OK",
			data: {
				list: [
					{
						list: cx,
						type_id: 2,
						type_label: "Announcement"
					},
					{
						list: [],
						type_id: 1,
						type_label: "YuukiPS"
					}
				],
				total: 2,
				type_list: [
					{
						id: 2,
						name: "Announcement",
						mi18n_name: "Announcement"
					},
					{
						id: 1,
						name: "YuukiPS",
						mi18n_name: "YuukiPS"
					}
				],
				alert: false,
				alert_id: 0,
				timezone: -5,
				t: time_ms,
				pic_list: [],
				pic_total: 0,
				pic_type_list: [],
				pic_alert: false,
				pic_alert_id: 0,
				static_sign: ""
			}
		}
	} else if (target == "getAnnContent") {
		var cx = await announcement.getPostData(true)
		jsonData = {
			retcode: 0,
			message: "OK",
			data: {
				list: cx,
				total: cx.length,
				pic_list: [],
				pic_total: 0
			}
		}
	} else {
		try {
			const data = await fs.readFile(join(__dirname, `./web/public/json/announcement/${target}.json`), "utf8")
			jsonData = JSON.parse(data)
		} catch (err) {
			console.error(err)
			jsonData = {
				data: null,
				message: "Error 500",
				retcode: -1
			}
		}
	}
	return res.json(jsonData)
})

// idk
web.all("/geetestV2.html", async (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/sw.html", async (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/game_weather/weather/get_weather", async (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/bus/combo/postman/device/setAlias", async (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/Api/create_mmt?", async (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/map_manage/:id1/id2.png", async (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

// Hoyo Acc Stuff
web.all("/account/risky/api/check", async (req: Request, res: Response) => {
	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: { id: "none", action: "ACTION_NONE", geetest: null }
	}) // maybe fix android stuck
})
web.all("/account/device/api/listNewerDevices", (req: Request, res: Response) => {
	// Android Stuck ?
	res.status(404)
	return res.send("")
})
// SR, gs use bus bruh
web.all("/:cn/combo/granter/login/beforeVerify", (req: Request, res: Response) => {
	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: {
			is_heartbeat_required: false,
			is_realname_required: false,
			is_guardian_required: false
		}
	})
})
web.all("/:cn/combo/panda/qrcode/fetch", (req: Request, res: Response) => {
	let url = "https://google.com/Api/login_by_qr"
	let expires = new Date().setHours(1, 0, 0).toString()
	let ticket = Buffer.from(crypto.randomUUID().replaceAll("-", "")).toString("hex")

	let debug = {
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: { url: `${url}?expire=${expires}\u0026ticket=${ticket}\u0026device=${req.body.device}` }
	}
	return res.json(debug)
})
web.all("/:cn/combo/panda/qrcode/query", (req: Request, res: Response) => {
	let debug = { retcode: statusCodes.error.FAIL, message: "QRCode login is disabled!" }
	return res.json(debug)
})

web.all("/dgen", (req: Request, res: Response) => {
	// Android 3.2 Stuck ?
	res.status(404)
	return res.send("")
})

web.all("/dsign", (req: Request, res: Response) => {
	// Android 3.2 Stuck ?
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/:cn/mdk/shield/api/actionTicket", (req: Request, res: Response) => {
	return res.json({ retcode: statusCodes.success.RETCODE, message: "OK", data: { ticket: `123` } }) // OK=0
})

web.all("/:cn/mdk/shield/api/emailCaptcha", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/:cn/mdk/shield/api/bindEmail", (req: Request, res: Response) => {
	return res.json({ retcode: statusCodes.success.RETCODE, message: "Success", data: 404 }) // OK=0
})

web.all("/:cn/mdk/shield/api/loginByThirdparty", async (req: Request, res: Response) => {
	var b = req.body
	var token = (b.access_token as string) ?? ""

	var lang = req.language
	let ip = req.ip ?? "?1"

	let c = { retcode: statusCodes.error.LOGIN_FAILED, message: "Error Login" }

	try {
		const response = await axios.get("https://discord.com/api/users/@me", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		const userData = response.data

		var username = userData.email
		if (!isEmpty(username)) {
			c = await Account.GET_ACCOUNT_GC(username, "", "hk4e", 1, true) // tmp hk4e

			const ts = translate(c, req)

			if ((c.retcode as number) == 0) {
				c_dp.info(`${ip} | ${username} have logged discord`)
			} else {
				c_dp.info(`${ip} | ${username} login failed discord because "${c.message}" ${lang}`)
			}

			return res.json(ts)
		} else {
			c = { retcode: statusCodes.error.LOGIN_FAILED, message: "No found acc discord" }
		}
	} catch (error) {
		c_dp.debug({ name: "Error fetching user data:", error: error })
		c = { retcode: statusCodes.error.LOGIN_FAILED, message: "No find acc discord" }
	}

	return res.json(c)
})

web.all("/:cn/combo/granter/api/getFont", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/combo/box/api/config/sdk/drmSwitch", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/device-fp/api/getFp", (req: Request, res: Response) => {
	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: { device_fp: `${req.body.device_fp}`, code: 200, msg: "ok" }
	})
})

web.all("/account/auth/api/getConfig", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/:cn/mdk/shopwindow/shopwindow/listPriceTier", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/common/:cn/announcement/api/getAlertPic", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/common/:cn/announcement/api/getAlertAnn", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/:cn/combo/red_dot/list", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/v5/gc", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/v5/gcf", (req: Request, res: Response) => {
	return res.json({
		status: 200,
		timestamp: 1685381978335,
		sc: "kRvXHDGG3+i6wGa6QZD3Oqo5c8w1/4sdqpiKngIlWWRrAKw416r7PNIKUpu+ueFO2tiURA2wlaBs7rwac73NjCA9ZOeqTgQj21uJSWMPOctAIsW6+c27GzKSSidnHbMmYoprbH9Pjxy9ku4LZJP+SuLQ4rOPsbRH0ZwNh1IsiwMgeVeSW0/swLqk5Rj6kdUD9YHMR2n9Xvtceq4Pj7gbULPOyTAA07agHPzxCxX64mcdf6xCUVNVIzDlmL1xrjtPMAGYdsw7ITu6soSM2mrFLC+uLXFQUuPgh6cNnhN4PqnqM0hf18PUXGBjc8euxsdO1NLbQYCOeyrzs4BWq4MCuGLJTTBWOZedYpYaIJR6MuZ7BS/IiPAVPZTcbx57+h5q7La2THPGSSJO5CAWksYslMDHmYZdYp1HGmo9Jzoe3JZh1FmS80gKQ0sqOjvm8jkip5S/NZLOyunkb8YPlLuOcjx77syqOulahYH17V9hg+nkTmZ2CbMW4hX2qr0R8dhN9iSG22fxpCn9fX0JbXiCACsMu3yZon18HIrHtrRrJ0w+VAMMWwzWwEswKUEqA0Ob5HCIxe7rNtVeMYcBy4Lf5hc+fIWIS+7VuYIxmBwdvksDZDAcKZAwN+EgowmY7g8JdTMyV2EUuVwsU8S7DPsv5HfQhzwQ5FL3kG30QOh5mVP5/YVlFAi0rq3DlejPrvqmsFU6K9Iylp9BX/K7uBtXaimrOwWMFrBZMYJmdb1XFJBJFUFsNdn1CSiC0NEvJwQ552nzhNkqH0WEQV2FCg/CsAgdgPRt+3f2cHoOmgxjxQUT8bi/NR5oxh/uzezNoUbGG3n668JGp1oKFKW3wO5Cp82o5fLp2e6CHDe8zDxiBqukYAeY5blsSKec/pUDx+zb4cBDUyeLuE/+0ibnGTxO+E5TLAW7tvJoK/qDe5FZ1Un289VuK1vbybStUO4xyDjecg4EJjP6nYskoQa/5l2YyKXo08qaY1bq+x2lpB/qWDFWzl516D0izlNfIYqhgMig2zTNEFRuumT2RMl0AGeYWhd+xHMORO44VBxg4GpfHgs0cdrFVkEY3PdHDGUEI8iLjMN1e2405Bk9ZfbyHkB6KYGGBa+Uso5kHkPBrMVEESJCJTWtJXUWKWafBSAib2/468+jpgwvXyJUMTsI8eI7i1z3R2sSeznLVcapk46SJa7OfPJMCtt/03/gMb7oX/QDY0mx058IkleEnKI4M6Dg6FhEb+ij3gyry0m/K5gOBu9aOJN1CXUP1F6pC6jVftG2phStXxgtOFXZcIKmGF3/UWtdkVNQcgwU+w9RDoZd0oz9eWShh6zmqz8dExry81er9m93WkDUs0YtKynvnc+FwdYBKz6SOiUNxmsAXzMUQm53FnL0lxiUs5J97mZyHUpMM/CBQUjXI6a/NwhTJxji6BMfw3cjlB/KH/+Kil/f0Atx2seCPx2WbYohACg2bB/NaHDoausQxp+Wuir9apQY81zrSJgRA5YMEe0rJfOcR7dcbWhqsABDDLS3NPU2mLhi97VSJgu6hvIlZ82DjgaOVu3RK9MC6OnB4TgUJmpYxFd7kIPcrJ7YDCeYV8E7WugucNRpAurZCxJSfuB2JFf5afOjqYE10gnMk1HHPh+cIHzj1AQqP19kkU5WKNmC7RRgSe7XaTKVR/i0RV9NrF0k0S6pu9hLYPDK9Zr+lWjJD6KtVgouEEL8CgsaFJGar8YaE/QuFPySVdjQhdOGtts+39aNvzZhG2r6LT7zI57NDS3R6yaI7P4ahyq+PMtfkCQ/hgkhjV7tgbYzRLSL/Qyw9A==",
		sr: "RyBcVxcBUoEzbyH2V9nyZg=="
	})
})

web.all("/v5/gcl", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/:cn/mdk/shield/api/loginCaptcha", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/privacy/policy/authorization/status", (req: Request, res: Response) => {
	return res.json({ code: 200, message: "success" })
})

web.all("/privacy/policy/ms/version", (req: Request, res: Response) => {
	return res.json({
		code: 200,
		message: "success",
		data: { content: "Of2a4Our9PYDGyH2QVCfXkqdwZ+HDv+OTryXRcbTOpw=", timestamp: 1685381978324 }
	})
})

// Config
web.all("/:cn/combo/granter/api/getConfig", async (req: Request, res: Response) => {
	// https://sdk-static.mihoyo.com/hk4e_global/combo/granter/api/getConfig?app_id=4&channel_id=1&client_type=3 cn only
	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: {
			protocol: true,
			qr_enabled: true,
			log_level: "INFO",
			announce_url:
				config_tmp?.url.public +
				"/hk4e_yuuki/announcement/index.html?sdk_presentation_style=fullscreen&sdk_screen_transparent=true&auth_appid=announcement&authkey_ver=1&game_biz=hk4e_yuuki&sign_type=2&version=1.37&game=hk4e#/",
			push_alias_type: 2,
			disable_ysdk_guard: false,
			enable_announce_pic_popup: true,
			name: "原神海外",
			qr_enabled_apps: { bbs: true, cloud: true },
			qr_app_icons: {
				app: "",
				bbs: "",
				cloud: ""
			},
			qr_cloud_display_name: "1",
			qr_app_display_name: "2",
			qr_bbs_display_name: "3",
			enable_user_center: true
		}
	})
})
web.all("/:cn/mdk/shield/api/loadConfig", async (req: Request, res: Response) => {
	var d = req.query
	var key = (d.game_key ?? 0) as number
	let client = clientTypeFromClientId((d.client ?? 0) as number)

	c_dp.debug(`load config ${key} with ${client}`)

	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: {
			id: 6,
			game_key: key,
			client: client,
			identity: "I_IDENTITY",
			guest: true,
			ignore_versions: "",
			scene: "S_NORMAL",
			name: "原神海外",
			disable_regist: false,
			enable_email_captcha: false,
			thirdparty: ["tw"],
			disable_mmt: false,
			server_guest: true,
			thirdparty_ignore: {},
			enable_ps_bind_account: false,
			thirdparty_login_configs: {
				tw: { token_type: "TK_GAME_TOKEN", game_token_expires_in: 2592000 }
			},
			initialize_firebase: false,
			bbs_auth_login: true,
			bbs_auth_login_ignore: []
		}
	})
})

// Combo
web.all("/combo/box/api/config/sw/precache", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/combo/box/api/config/sdk/combo", async (req: Request, res: Response) => {
	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: {
			vals: { disable_email_bind_skip: "false", email_bind_remind_interval: "7", email_bind_remind: "false" }
		}
	})
})
web.all("/:cn/combo/granter/api/compareProtocolVersion", async (req: Request, res: Response) => {
	return res.json({
		retcode: statusCodes.success.RETCODE,
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
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: {
			code: 200,
			msg: "ok",
			ext_list: [
				"cpuName",
				"systemName",
				"systemType",
				"deviceUID",
				"gpuID",
				"gpuName",
				"gpuAPI",
				"gpuVendor",
				"gpuVersion",
				"gpuMemory",
				"osVersion",
				"cpuCores",
				"cpuFrequency",
				"gpuVendorID",
				"isGpuMultiTread",
				"memorySize"
			],
			pkg_list: []
		}
	})
})
web.all("/admin/:id3/:id4/:id1/:id2.json", async (req: Request, res: Response) => {
	var url = `https://webstatic.hoyoverse.com/admin/${req.params.id3}/${req.params.id4}/${req.params.id1}/${req.params.id2}.json`
	if (req.params.id4 == "plat_os") {
		//c_dp.info(`${req.originalUrl}`)
		url = `https://webstatic.hoyoverse.com` + req.originalUrl
	}
	var file = `./language/game/genshin/webstatic/${req.params.id1}-${req.params.id2}.json`
	try {
		// if found
		const data = await fs.readFile(join(__dirname, file), "utf8")
		const jsonData = JSON.parse(data)
		return res.json(jsonData)
	} catch (err) {
		c_dp.error(`No found ${file} so find ${url}`)
		const response = await axios.get(url, {
			timeout: 1000 * 10
		})
		const d = response.data
		const jsonString = JSON.stringify(d, null, 4)
		fs.writeFile(join(__dirname, file), jsonString)
		return res.json(d)
	}
	//res.status(500).send('Error reading or parsing JSON');
})

web.all("/data_abtest_api/config/experiment/list", async (req: Request, res: Response) => {
	return res.json({
		retcode: statusCodes.success.RETCODE,
		success: true,
		message: "",
		data: [
			{
				code: 1000,
				type: 2,
				config_id: "14",
				period_id: "6036_99",
				version: "1",
				configs: { cardType: "old" }
			}
		]
	})
})

web.all("/:cn/mdk/agreement/api/getAgreementInfos", async (req: Request, res: Response) => {
	return res.json({ retcode: statusCodes.success.RETCODE, message: "OK", data: { marketing_agreements: [] } })
})

// Login

// Login Twitter
web.all("/sdkTwitterLogin.html", async (req: Request, res: Response) => {
	var q = req.query

	var key = q.consumer_key as string
	var code = q.code as string

	const redirectUri = "https://login.yuuki.me/sdkTwitterLogin.html"

	if (!isEmpty(key)) {
		//return res.redirect("/account/login?sdk=twitter")

		// or
		const scope = "identify email guilds"
		const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
			Config.api.discord.client_id
		}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`
		return res.redirect(discordAuthUrl)
	} else if (!isEmpty(code)) {
		// Get Token
		const tokenParams = new URLSearchParams({
			client_id: Config.api.discord.client_id,
			client_secret: Config.api.discord.client_secret,
			grant_type: "authorization_code",
			code: code,
			redirect_uri: redirectUri,
			scope: "identify email guilds"
		})
		try {
			const tokenResponse = await axios.post("https://discord.com/api/oauth2/token", tokenParams, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			})
			return res.send(
				`<h1>Wait login Discord...</h1><meta http-equiv="refresh" content="0;url=uniwebview://sdkThirdLogin?accessToken=${tokenResponse.data.access_token}">`
			)
		} catch (error) {
			c_dp.debug({ name: "Error exchanging code for token:", error: error })
		}
	}
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
// Login Twitter (API?)
web.all("/Api/twitter_login", async (req: Request, res: Response) => {
	return res.json({
		code: 200,
		data: {
			auth_url: "https://login.yuuki.me/account/login",
			info: "",
			msg: "Success",
			status: 1
		}
	})
})
// Login Twitter (API?)
web.all("/Api/twitter_access", async (req: Request, res: Response) => {
	var p = req.query
	return res.json({
		code: 200,
		data: {
			access_token: p.access_token,
			info: "",
			msg: "Success",
			status: 1
		}
	})
})

// Login Facebook
web.all("/sdkFacebookLogin.html", async (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
// Login Facebook (API?)
web.all("/Api/facebook_login", async (req: Request, res: Response) => {
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
	/*
	{
    game_key: 'hk4e_global',
    sign: 'd7a5fedf5e9919e3d93c95c45a69b047246e94a168a9f56b9079805fbdc5801d',
    client: 2,
    device: 'b917ca0e21fd9f9c',
    g_version: 'OSRELAndroid3.6.0'
  }
	*/
	return res.json({
		retcode: statusCodes.error.LOGIN_FAILED,
		message: "Please register at ps2.yuuki.me or join discord.yuuki.me or open register in-game"
	})
})
// Cached token login (from registry).
web.all("/:cn/mdk/shield/api/verify", async (req: Request, res: Response) => {
	var uid = req.body.uid // uid acc?
	var key = req.body.token // token aka key
	var cn = req.params.cn
	var ip = req.ip

	if (!isEmpty(cn)) {
		cn = cn.split("_")["0"]
	}

	var c = await Account.GET_ACCOUNT_GC(uid, key, cn, 2)
	if (c.retcode == 0) {
		c_dp.info(`${ip} | ${uid} have logged (login registry) in from ${cn}`)
	} else {
		c_dp.info(`${ip} | ${uid} login failed (login registry) because "${c.message}" in from ${cn}`)
	}

	return res.json(c)
})
// Cached token login (from registry), unfortunately this cannot be deleted or given a zero response
web.all("/:cn/combo/granter/login/v2/login", async (req: Request, res: Response) => {
	const d = JSON.parse(req.body.data) // tmp just send back

	return res.json({
		message: "OK",
		retcode: statusCodes.success.RETCODE,
		data: {
			account_type: 1,
			heartbeat: false,
			combo_id: "157795300",
			combo_token: d.token,
			open_id: d.uid,
			data: '{"guest":false}',
			fatigue_remind: null
		}
	})
})
// Username & Password login (from client).
web.post("/:cn/mdk/shield/api/login", limit_login, async (req: Request, res: Response) => {
	// hk4e_global = gs and hkrpg_global = sr

	var lang = req.language

	var username = req.body.account
	var password = req.body.password // temporarily useless
	var cn = req.params.cn
	var ip = req.ip

	if (!isEmpty(cn)) {
		cn = cn.split("_")["0"]
	}

	var c = await Account.GET_ACCOUNT_GC(username, "", cn, 1, Config.autoAccount)
	const ts = translate(c, req)
	if (c.retcode == 0) {
		c_dp.info(`${ip} | ${username} have logged (normal login) in from ${cn}`)
	} else {
		c_dp.info(`${ip} | ${username} login failed (normal login) because "${c.message}" in from ${cn} / ${lang}`)
	}

	return res.json(ts)
})

// SR Stuff

// for list server sr
web.all("/query_dispatch", async (req: Request, res: Response) => {
	try {
		var d = req.query

		let version = (d.version as string) ?? "?0"
		let ip = (req.ip as string) ?? "?1"

		// TODO: get real name
		let lang = d.lang ?? "?2"
		let platform = d.platform ?? "?3"

		c_dp.info(
			`${ip} | trying to access region list with version ${version} and language codes ${lang} and platform ${platform}`
		)

		var data = await SR_DIspatch.GET_LIST_REGION(version)

		return res.send(data)
	} catch (e) {
		c_dp.error({ name: "query_dispatch (SR)", error: e })
		return res.send(API_SR.NO_VERSION_CONFIG())
	}
})

web.all("/query_gateway/:name", async (req: Request, res: Response) => {
	try {
		var d = req.query
		var p = req.params

		let version = d.version as string
		let ip = req.ip ?? "?1"
		let dispatchSeed = d.dispatch_seed as string
		let key = d.key_id as unknown as number
		let name = p.name ?? "none"

		// TODO: get real name
		let lang = d.language_type ?? "?2"
		let platform = d.platform_type ?? "?3"

		if (version == undefined || dispatchSeed == undefined) {
			c_dp.debug(`${ip} | trying to access region with no config`)
			return res.send(API_SR.NO_VERSION_CONFIG())
		}

		c_dp.info(`${ip} | trying to access region ${name} with ${version}|${lang}|${platform}|${dispatchSeed}|${key}`)

		var data = await SR_DIspatch.GET_DATA_REGION(name, dispatchSeed, key, version)

		return res.send(data)
	} catch (e) {
		c_dp.error({ name: "query_gateway (SR)", error: e })
		return res.send(API_SR.NO_VERSION_CONFIG())
	}
})

// GS Stuff

// for list server gs
web.all("/query_region_list", async (req: Request, res: Response) => {
	try {
		var d = req.query

		let version = (d.version as string) ?? "?0"
		let ip = (req.ip as string) ?? "?1"

		// TODO: get real name
		let lang = d.lang ?? "?2"
		let platform = d.platform ?? "?3"

		c_dp.info(
			`ip ${ip} trying to access region list with version ${version} and language codes ${lang} and platform ${platform}`
		)

		var data = await GS_Dispatch.GET_LIST_REGION(version)

		return res.send(data)
	} catch (e) {
		c_dp.error({ name: "query_region_list (GS)", error: e })
		return res.send(API_GS.NO_VERSION_CONFIG())
	}
})

web.all("/query_cur_region/:name", async (req: Request, res: Response) => {
	try {
		var d = req.query
		var p = req.params

		let version = d.version as string
		let ip = req.ip ?? "?1"
		let dispatchSeed = d.dispatchSeed as string
		let key = (d.key_id as unknown as number) ?? 5
		let name = p.name ?? "none"

		// TODO: get real name
		let lang = d.lang ?? "?2"
		let platform = d.platform ?? "?3"

		if (version == undefined || dispatchSeed == undefined || key == undefined) {
			c_dp.debug(`${ip} | trying to access region with no config`)
			return res.send(API_GS.NO_VERSION_CONFIG())
		}

		c_dp.info(`${ip} | trying to access region ${name} with ${version}|${lang}|${platform}|${dispatchSeed}|${key}`)

		var data = await GS_Dispatch.GET_DATA_REGION(name, dispatchSeed, key, version)

		return res.send(data)
	} catch (e) {
		c_dp.error({ name: "query_cur_region (GS)", error: e })
		return res.send(API_GS.NO_VERSION_CONFIG())
	}
})

web.all("/query_cur_region", async (req: Request, res: Response) => {
	return res.send(API_GS.NO_VERSION_CONFIG())
})

web.all("/api/key/:id/*", async (req: Request, res: Response) => {
	let ip = req.ip ?? "?1"
	let code = req.params[0].split("=")[1]

	c_web.warn(`${ip} | trying input code ${code}`)

	// TODO: if code work send to all server in this acc?

	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "Got it"
	})
})

// catch all if not found
web.use((req: Request, res: Response) => {
	c_web.error(`${req.url} not found`, false)
	// Redirect to the homepage
	res.redirect("/?action=404")
})

if (config_tmp.startup.web) {
	web.listen(config_tmp.port.private, function () {
		c_web.info(`Server started on port ${config_tmp?.port.private}`)
		//startBot()
	})
} else {
	c_web.info("skip run webserver...")
	//startBot()
}

const webhookData: WebhookClientData = Config.api.discord.webhook.stats
const ping_notif = new WebhookClient(webhookData)
let ping_job = get_job()
ping_job.on("message", (d: { type: string; data: any }) => {
	try {
		c_bot.debug({ msg: `Job`, data: d })

		if (d.type == "msg") {
			if (config_tmp?.startup.bot) {
				ping_notif.send(d.data)
			}
		} else if (d.type == "bot_stats") {
			online_string = parseInt(d.data)
			if (config_tmp?.startup.bot) {
				if (bot == undefined || bot.user == undefined) {
					c_bot.warn("Bot error update stats")
					return
				}
				try {
					let isok = bot.isReady()
					if (isok) {
						bot.user.setPresence({
							activities: [
								{
									name: d.data
								}
							],
							status: "online"
						})
					} else {
						c_bot.warn(`Bot not run? ${isok}`)
					}
				} catch (x) {
					c_job.error({ msg: "stats error send", error: x })
				}
			}
		}
	} catch (e) {
		c_job.error({ msg: "ping error send", error: e })
	}
})
ping_job.on("error", (ex: Error) => {
	c_job.error({ msg: "ping error 0", error: ex })

	// Stop the Worker and restart it
	try {
		ping_job.terminate()
		setTimeout(function () {
			ping_job = get_job()
		}, 3000)
	} catch (error) {
		c_job.error({ msg: "ping error 1", error: error })
	}
})
function get_job() {
	return new Worker("./src/job/ping")
}

RSAUtils.initKeys()
Interface.start()
