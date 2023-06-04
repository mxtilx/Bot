/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// Important
import { join } from "path"
import fs from "fs/promises"
import {
	sleep,
	isEmpty,
	contains,
	clientTypeFromClientId,
	generateSEOTitle,
	bitsToGigabytes,
	bytesToGigabytes,
	readFileAsync
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
import getEvents, { findEvent } from "./events/eventHandler"
import register from "./util/registercommands"

// API
import Account from "./db/account/api"
import Control from "./commands/gm/control"
import API_GS from "./game/genshin/api"
import API_SR from "./game/starrails/api"

import { RSAUtils } from "./game/hoyolab/crypto"
import axios from "axios"
import { statusCodes } from "./util/constants"
import announcement from "./web/plugin/announcement"

const log = new Logger("YuukiPS")
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

var domain = `${set_protocol}://${set_host}:${set_port_cloud}`

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
	log.debug({ event: "bot dc", log: error })
	process.exit(1)
})

async function registerEvent(event: string, ...args: any) {
	const events = await getEvents()
	const eventFunc = findEvent(events, event)
	//log.debug(`${event} was called`)
	if (eventFunc) await eventFunc(...args)
}

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

	log.info(`Event Interaction ${username}#${username_id} in Channel${channel_name} with Type ${interaction.type}`)

	if (interaction.isCommand()) {
		log.debug(`/${interaction.commandName} was called by ${username}`)
		import(`./commands/discord/${interaction.commandName}`)
			.then(async (cmd) => {
				await cmd.default.process(interaction)
			})
			.catch(async (error) => {
				log.error(error as unknown as Error)
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

// Bot Startup
;(async () => {
	if (Config.Startup.bot) {
		if (regcmd) {
			const rest = new REST({ version: "9" }).setToken(Config.token)
			await register().then(async (commands: any) => {
				await rest.put(Routes.applicationGuildCommands(Config.clientId, Config.guildId), {
					body: commands
				})
			})
		} else {
			log.warn(`skip register`)
		}
		bot.on("ready", () => {
			log.info(`Ready to serve in ${bot.guilds.cache.size} guilds as ${bot.user?.tag}.`)
		})
		bot.login(Config.token)
	} else {
		log.info("bot skip run....")
	}
})()

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
	fallbackLng: "en", // Default language fallback
	preload: ["en", "id"], // Preload supported languages
	ns: ["translation"],
	backend: {
		loadPath: join(__dirname, "../src/language/{{lng}}.json") // Path to language files
	}
})

// TODO move route web
const web = express()

// body-parser middleware
web.use(bodyParser.json({ limit: "50mb" }))
web.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
web.use(cookieParser())

// Function to translate a string based on the user's language preference
function translateString(key: string, userLanguage: string = "en"): string {
	const translation = i18next.t(key, { lng: userLanguage })
	return translation
}

// Function to translate a JSON object based on the user's language preference
function translate(data: Record<string, any>, userLanguage: string = "en"): Record<string, any> {
	const translatedData: Record<string, any> = {}

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key]
			if (typeof value === "string") {
				const translatedValue = translateString(value, userLanguage)
				//console.log("load " + value + " > " + translatedValue);
				translatedData[key] = translatedValue
			} else if (typeof value === "object" && value !== null) {
				const translatedValue = translate(value, userLanguage)
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
	if (userAgent !== undefined && userAgent.includes("ZFBrowser")) {
		return res.redirect("/account/login")
	} else {
		log.info(`Home Enter ${userAgent}`)
		//log.debug({ msg: "query home", tes: req.query })
		//log.debug({ msg: "body home", tes: req.body })
	}

	res.render("home", {
		title: "Welcome to YuukiPS",
		description: "Im lazy to write"
	})
})

// Account
web.all("/account/login", async (req: Request, res: Response) => {
	//log.debug(req.body)

	var action = "none"
	var message = ""

	const userAgent = req.headers["user-agent"]

	var p = req.body
	if (!isEmpty(p.login_username) && !isEmpty(p.login_password)) {
		//log.debug(userAgent)
		//log.debug({ msg: "params login", tes: req.params })
		//log.debug({ msg: "query login", tes: req.query })
		//log.debug({ msg: "body login", tes: req.body })

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
			var lang = req.headers["x-rpc-language"]?.toString() || "en"
			const verificationResponse = await axios.post(
				"https://hcaptcha.com/siteverify",
				new URLSearchParams({
					secret: Config.token_Hcaptcha,
					response: p["h-captcha-response"]
				})
			)
			var dx = verificationResponse.data
			if (dx.success) {
				let r = await Account.CREATE_ACCOUNT_GC(p.reg_username, p.login_password)
				const ts = translate(r, lang)
				if (r.retcode == 0) {
					action = "OK_REG"
				} else {
					action = "FAILD_REG"
				}
				message = ts.message
				//log.debug(r)
			} else {
				log.debug(dx)
				action = "FAILD_REG"
				message = "Captcha verification failed"
			}
		} catch (error) {
			log.error(error)
			action = "FAILD_REG"
			message = "Unknown error"
		}
	}
	//log.debug(p['h-captcha-response'])
	res.render("account/login", {
		title: "Login",
		description: "Register or login for a YuukiPS Account",
		action: action,
		message: message
	})
})

web.all("/command", (req: Request, res: Response) => {
	res.render("command", {
		title: "Command Tool",
		description: "Im lazy to write"
	})
})

// Web Portal
web.all("/game/:cn", async (req: Request, res: Response) => {
	//log.debug({ msg: "params game", tes: req.params })
	//log.debug({ msg: "query game", tes: req.query })
	//log.debug({ msg: "body game", tes: req.body })
	var game_id = 0
	var p = req.params
	if (p.cn == "genshin-impact") {
		game_id = 1
	} else if (p.cn == "star-rail") {
		game_id = 2
	} else {
		p.cn = "no-found"
	}
	var title = generateSEOTitle(p.cn)
	let data
	try {
		data = JSON.parse(await fs.readFile(join(__dirname, `./web/public/json/${p.cn}/download.json`), "utf8"))
	} catch (error) {
		log.error(error)
	}
	res.render("game", {
		game_title: `${title}`,
		game_id: game_id,
		title: `Playing Private Servers For ${title}`,
		description: `Embark on an unforgettable adventure in the captivating world of ${title} Game! Join our private server for true adventurers and explore vast landscapes, daunting dungeons, and mystical creatures. Engage in epic quests, battles, and uncover hidden treasures. Customize your character, forge alliances, and conquer challenges in a constantly evolving universe. Join us now and become a legend in ${title} Game!`,
		data: data,
		bytesToGigabytes: bytesToGigabytes
	})
})

web.all("/api", (req: Request, res: Response) => {
	res.send("API YuukiPS v2")
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
		log.debug({ name: `error ${md5} : ${filePath}`, tes: error })
		return res.json({ retcode: 404, message: "Error", data: 404 })
	}
})

web.all("/api/launcher/server", async (req: Request, res: Response) => {
	//log.debug({ msg: "params launcher", tes: req.params })
	//log.debug({ msg: "query launcher", tes: req.query })
	//log.debug({ msg: "body launcher", tes: req.body })
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
	log.debug({ msg: "params banner", tes: req.params })
	log.debug({ msg: "query banner", tes: req.query })
	log.debug({ msg: "body banner", tes: req.body })
	const filePath = join(__dirname, `./web/public/json/genshin-impact/banner.json`)
	try {
		const fileContent = await fs.readFile(filePath)
		res.setHeader("Content-Type", "application/json")
		res.send(fileContent)
	} catch (error) {
		log.debug({ name: `error banner : ${filePath}`, tes: error })
		return res.json({ retcode: 404, message: "Error", data: 404 })
	}
})
web.all("/api/:namegame/event", async (req: Request, res: Response) => {
	log.debug({ msg: "params event", tes: req.params })
	log.debug({ msg: "query event", tes: req.query })
	log.debug({ msg: "body event", tes: req.body })
	const filePath = join(__dirname, `./web/public/json/genshin-impact/event.json`)
	try {
		const fileContent = await fs.readFile(filePath)
		res.setHeader("Content-Type", "application/json")
		res.send(fileContent)
	} catch (error) {
		log.debug({ name: `error event : ${filePath}`, tes: error })
		return res.json({ retcode: 404, message: "Error", data: 404 })
	}
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

// Hoyo Love Log Stuff

web.all("/common/h5log/log/batch", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/sdk/dataUpload", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/crashdump/dataUpload", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/apm/dataUpload", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/log", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/crash/dataUpload", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/h5/upload", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/h5/dataUpload", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
web.all("/errlog", (req: Request, res: Response) => {
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

// event
web.all("/sw.html", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/ys/event/:id_event/index.html", async (req: Request, res: Response) => {
	log.debug({ msg: "params event", tes: req.params })
	log.debug({ msg: "query event", tes: req.query })
	log.debug({ msg: "body event", tes: req.body })
	var p = req.params
	if (p.id_event == "e20210830cloud") {
		return res.redirect("/command")
	}
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

// announcement
web.all("/:cn/announcement/index.html", async (req: Request, res: Response) => {
	//log.debug({ msg: "params announcement", tes: req.params })
	//log.debug({ msg: "query announcement", tes: req.query })
	//log.debug({ msg: "body announcement", tes: req.body })
	res.render("announcement/home", {
		title: "Announcement",
		description: "Im lazy to write"
	})
})
web.all("/common/:cn/announcement/api/:id1", async (req: Request, res: Response) => {
	var p = req.params
	var target = p.id1
	//log.debug({ msg: "params " + target, tes: req.params })
	//log.debug({ msg: "query " + target, tes: req.query })
	//log.debug({ msg: "body " + target, tes: req.body })
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

web.all("/game_weather/weather/get_weather", async (req: Request, res: Response) => {
	log.debug({ msg: "params weather", tes: req.params })
	log.debug({ msg: "query weather", tes: req.query })
	log.debug({ msg: "body weather", tes: req.body })
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/map_manage/:id1/id2.png", async (req: Request, res: Response) => {
	//log.debug({ msg: "params weather", tes: req.params })
	//log.debug({ msg: "query weather", tes: req.query })
	//log.debug({ msg: "body weather", tes: req.body })
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
// /map_manage/20221124/0ebe6d2f65fb5cc5ed4046a01a68dda9_7334983767356242405.png
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

web.all("/bus/combo/granter/login/beforeVerify", (req: Request, res: Response) => {
	log.debug({ msg: "query beforeVerify", tes: req.query })
	log.debug({ msg: "body beforeVerify", tes: req.body })
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
	log.debug({ msg: "query qrcode", tes: req.query })
	log.debug({ msg: "body qrcode", tes: req.body })

	let url = "https://google.com/Api/login_by_qr"
	let expires = new Date().setHours(1, 0, 0).toString()
	let ticket = Buffer.from(crypto.randomUUID().replaceAll("-", "")).toString("hex")

	let debug = {
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: { url: `${url}?expire=${expires}\u0026ticket=${ticket}\u0026device=${req.body.device}` }
	}

	log.debug(debug)

	return res.json(debug)
})

web.all("/:cn/combo/panda/qrcode/query", (req: Request, res: Response) => {
	log.debug({ msg: "query qrcodeq", tes: req.query })
	log.debug({ msg: "body qrcodeq", tes: req.body })

	let debug = { retcode: statusCodes.error.FAIL, message: "QRCode login is disabled!" }

	log.debug(debug)

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
	log.debug(req.body)
	return res.json({ retcode: statusCodes.success.RETCODE, message: "OK", data: { ticket: `123` } }) // OK=0
})

web.all("/:cn/mdk/shield/api/emailCaptcha", (req: Request, res: Response) => {
	log.debug(req.body)
	return res.json({ retcode: 200, message: "Success", data: 404 })
})

web.all("/:cn/mdk/shield/api/bindEmail", (req: Request, res: Response) => {
	log.debug(req.body)
	return res.json({ retcode: statusCodes.success.RETCODE, message: "Success", data: 404 }) // OK=0
})

web.all("/:cn/mdk/shield/api/loginByThirdparty", async (req: Request, res: Response) => {
	//log.debug({ msg: "params loginByThirdparty", tes: req.params })
	//log.debug({ msg: "query loginByThirdparty", tes: req.query })
	//log.debug({ msg: "body loginByThirdparty", tes: req.body })

	var b = req.body
	var token = (b.access_token as string) ?? ""

	var lang = req.headers["x-rpc-language"]?.toString() || "en"
	let ip = req.ip ?? "?1"

	//log.info(`token ${token} login...`)

	let c = { retcode: statusCodes.error.LOGIN_FAILED, message: "Error Login" }

	try {
		const response = await axios.get("https://discord.com/api/users/@me", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		const userData = response.data
		//log.debug("profile yor", userData)

		var username = userData.email
		if (!isEmpty(username)) {
			c = await Account.GET_ACCOUNT_GC(username, "", "hk4e", 1, true) // tmp hk4e

			const ts = translate(c, lang)

			log.debug(c)

			if ((c.retcode as number) == 0) {
				log.info(`${ip} | ${username} have logged discord`)
			} else {
				log.info(`${ip} | ${username} login failed discord because "${c.message}" ${lang}`)
			}

			return res.json(ts)
		} else {
			c = { retcode: statusCodes.error.LOGIN_FAILED, message: "No found acc discord" }
		}
	} catch (error) {
		log.debug("Error fetching user data:", error)
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
	// Fake Config SR
	log.debug(req.params)
	log.debug(req.query)
	// https://sdk-static.mihoyo.com/hk4e_global/combo/granter/api/getConfig?app_id=4&channel_id=1&client_type=3 cn only
	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "OK",
		data: {
			protocol: true,
			qr_enabled: true,
			log_level: "INFO",
			announce_url:
				domain +
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
	log.info(`load config ${key} with ${client}`)
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
		//log.info(`${req.originalUrl}`)
		url = `https://webstatic.hoyoverse.com` + req.originalUrl
	}
	var file = `./language/game/genshin/webstatic/${req.params.id1}-${req.params.id2}.json`
	try {
		// if found
		const data = await fs.readFile(join(__dirname, file), "utf8")
		const jsonData = JSON.parse(data)
		return res.json(jsonData)
	} catch (err) {
		log.warn(`No found ${file} so find ${url}`)
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
	//log.debug("sdk parms", req.params)
	//log.debug("sdk qu", req.query)
	//log.debug("body sdk", req.body)

	var q = req.query

	var key = q.consumer_key as string
	var code = q.code as string

	const redirectUri = "https://login.yuuki.me/sdkTwitterLogin.html"

	if (!isEmpty(key)) {
		//return res.redirect("/account/login?sdk=twitter")

		// or
		const scope = "identify email guilds"
		const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
			Config.clientId
		}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`
		return res.redirect(discordAuthUrl)
	} else if (!isEmpty(code)) {
		// Get Token
		const tokenParams = new URLSearchParams({
			client_id: Config.clientId,
			client_secret: Config.clientSecret,
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
			//var accessToken = btoa(JSON.stringify(tokenResponse.data.access_token))
			return res.send(
				`<h1>Wait login Discord...</h1><meta http-equiv="refresh" content="0;url=uniwebview://sdkThirdLogin?accessToken=${tokenResponse.data.access_token}">`
			)
			//log.debug("data your dm", data)
		} catch (error) {
			log.debug("Error exchanging code for token:", error)
		}
	}
	/*
	res.render("account/sdk/twitter", {
		title: "Login Twitter",
		description: "Register or login for a YuukiPS Account"
	})
	*/
	return res.json({ retcode: 200, message: "Success", data: 404 })
})
// Login Twitter (API?)
web.all("/Api/twitter_login", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
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
	log.debug(req.params)
	log.debug(req.query)
	log.debug(req.body)
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
	//log.debug(req.params)
	//log.debug(req.query)
	return res.json({ retcode: 200, message: "Success", data: 404 })
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
	//log.debug(req.body)
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
		log.info(`${ip} | ${uid} have logged (login registry) in from ${cn}`)
	} else {
		log.info(`${ip} | ${uid} login failed (login registry) because "${c.message}" in from ${cn}`)
	}

	return res.json(c)
})
// Cached token login (from registry), unfortunately this cannot be deleted or given a zero response
web.all("/:cn/combo/granter/login/v2/login", async (req: Request, res: Response) => {
	// TODO ACC
	//log.debug(res)
	//log.debug(req)
	//log.debug(req.body)

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
	// TODO ACC
	//log.debug(res)
	//log.debug(req)
	//log.debug(req.body)
	//log.debug()
	//console.log(req)
	// hk4e_global = gs and hkrpg_global = sr

	var lang = req.headers["x-rpc-language"]?.toString() || "en"

	var username = req.body.account
	var password = req.body.password // temporarily useless
	var cn = req.params.cn
	var ip = req.ip

	if (!isEmpty(cn)) {
		cn = cn.split("_")["0"]
	}

	var c = await Account.GET_ACCOUNT_GC(username, "", cn, 1, Config.autoAccount)
	const ts = translate(c, lang)
	//log.debug(c)
	if (c.retcode == 0) {
		log.info(`${ip} | ${username} have logged (normal login) in from ${cn}`)
	} else {
		log.info(
			`${ip} | ${username} login failed (normal login) because "${c.message}" in from ${cn} / ${lang}`
		)
	}

	return res.json(ts)
})

// SR Stuff

// for list server sr
web.all("/query_dispatch", async (req: Request, res: Response) => {
	try {
		log.debug(req.params)
		log.debug(req.query)
		log.debug(req.body)

		var d = req.query

		let version = (d.version as string) ?? "?0"
		let ip = (req.ip as string) ?? "?1"

		// TODO: get real name
		let lang = d.lang ?? "?2"
		let platform = d.platform ?? "?3"

		//const protocol = req.protocol; // 'http' or 'https'
		//const host = req.get('host'); // domain and port
		//const fullDomain = `${protocol}://${host}`;
		//log.debug(`Full Domain: ${fullDomain}`);

		log.info(
			`${ip} | trying to access region list with version ${version} and language codes ${lang} and platform ${platform}`
		)

		var data = await API_SR.GET_LIST_REGION(version)

		return res.send(data)
	} catch (e) {
		log.error(e as Error)
		return res.json({
			retcode: 1,
			message: "Error"
		})
	}
})

web.all("/query_gateway/:name", async (req: Request, res: Response) => {
	try {
		//log.debug(req.params)
		//log.debug(req.query)
		//log.debug(req.body)
		//log.debug(req.url)

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
			log.info(`${ip} | trying to access region with no config`)
			return res.send(API_GS.NO_VERSION_CONFIG())
		}

		log.info(`${ip} | trying to access region ${name} with ${version}|${lang}|${platform}|${dispatchSeed}|${key}`)

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

		let version = (d.version as string) ?? "?0"
		let ip = (req.ip as string) ?? "?1"

		// TODO: get real name
		let lang = d.lang ?? "?2"
		let platform = d.platform ?? "?3"

		//const protocol = req.protocol; // 'http' or 'https'
		//const host = req.get('host'); // domain and port
		//const fullDomain = `${protocol}://${host}`;
		//log.debug(`Full Domain: ${fullDomain}`);

		log.info(
			`ip ${ip} trying to access region list with version ${version} and language codes ${lang} and platform ${platform}`
		)

		var data = await API_GS.GET_LIST_REGION(version)

		return res.send(data)
	} catch (e) {
		log.error(e as Error)
		return res.json({
			retcode: 1,
			message: "Error"
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

		let version = d.version as string
		let ip = req.ip ?? "?1"
		let dispatchSeed = d.dispatchSeed as string
		let key = (d.key_id as unknown as number) ?? 5
		let name = p.name ?? "none"

		// TODO: get real name
		let lang = d.lang ?? "?2"
		let platform = d.platform ?? "?3"

		if (version == undefined || dispatchSeed == undefined || key == undefined) {
			//log.info(`ip ${ip} trying to access region with no config`)
			return res.send(API_GS.NO_VERSION_CONFIG())
		}

		log.info(`${ip} | trying to access region ${name} with ${version}|${lang}|${platform}|${dispatchSeed}|${key}`)

		var data = await API_GS.GET_DATA_REGION(name, dispatchSeed, key, version)

		return res.send(data)
	} catch (e) {
		log.error(e as Error)
		return res.send(API_GS.NO_VERSION_CONFIG())
	}
})

web.all("/query_cur_region", async (req: Request, res: Response) => {
	//log.debug(req.params)
	//log.debug(req.query)
	return res.send(API_GS.NO_VERSION_CONFIG())
})

web.all("/api/key/:id/*", async (req: Request, res: Response) => {
	log.debug(req.params)
	log.debug(req.query)
	log.debug(req.body)

	let ip = req.ip ?? "?1"

	let code = req.params[0].split("=")[1]

	log.info(`${ip} | trying input code ${code}`)

	// TODO: if code work send to all server in this acc?

	return res.json({
		retcode: statusCodes.success.RETCODE,
		message: "Got it"
	})
})

// catch all if not found

web.use((req: Request, res: Response) => {
	log.warn(`${req.url} not found`)
	res.status(404).send("Sorry, my cat is lost...")
})

if (Config.Startup.webserver) {
	var listener = web.listen(set_port_local, function () {
		log.info(`Server started on port ${set_port_local}`)
	})
} else {
	log.info("skip run webserver...")
}

const webhookData: WebhookClientData = Config.webhook.stats
const ping_notif = new WebhookClient(webhookData)
let ping_job = get_job()
ping_job.on("message", (d: { type: string; data: any }) => {
	try {
		if (d.type == "msg") {
			log.debug(d)
			if (Config.Startup.bot) {
				ping_notif.send(d.data)
			}
			log.info(`Send Ping:`, d.data.content)
		} else if (d.type == "bot_stats") {
			online_string = parseInt(d.data)
			if (Config.Startup.bot) {
				if (bot == undefined || bot.user == undefined) {
					return
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
		}
		log.debug(d)
	} catch (e) {
		log.debug({ event: "ping error send", log: e })
		// Stop the Worker and restart it
		//ping_job.terminate();
		//ping_job = get_job();
	}
})
ping_job.on("error", (ex: Error) => {
	log.debug({ event: "ping error 0", log: ex })

	// Stop the Worker and restart it
	try {
		ping_job.terminate()
		setTimeout(function () {
			ping_job = get_job()
		}, 3000)
	} catch (error) {
		log.debug({ event: "ping error 1", log: error })
	}
})
function get_job() {
	return new Worker("./src/job/ping")
}

RSAUtils.initKeys()

// Console
Interface.start()
