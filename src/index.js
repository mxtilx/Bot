/**
 * Yuuki
 *
 * @format
 */

const express = require("express")
const rateLimit = require("express-rate-limit")

const cors = require("cors")
const eta = require("eta")
const { Worker } = require("worker_threads")

const argv = require("minimist")(process.argv.slice(2))
console.log(argv)

const port_http = argv.port || 3000

const log = require("./util/logger")

const api_control = require("./gm/control")
const api_genshin = require("./game/genshin/api") // TODO: use control version game by game type

const mylib = require("./lib")
const config = require("./config.json")
var eta_plugin_random = require("./web/plugin/random")

const fs = require("node:fs")
const path = require("node:path")

log.info("Yuuki Web Server 2 Up")

const { Client, Collection, GatewayIntentBits, Partials, Events, WebhookClient, EmbedBuilder } = require("discord.js")

process.on("unhandledRejection", (error) => {
	console.log(error)
	//process.exit(1);
})

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
	console.log(error)
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

	// Get guild object for server reaction was made in
	const guild = reaction.message.guild

	var is = reaction.emoji.name
	var id_user = user.id // whos reaction
	var name_user = user.username
	var id_user_to_reaction = reaction.message.author.id // whos message
	var msg = reaction.message.content

	const id_role_member = "1039554857746583573" // id member
	const id_role_mute = "1040051266912534598" // id mute member

	// Get role object for role id
	const muteRole = guild.roles.cache.get(id_role_mute)
	const MemberRole = guild.roles.cache.get(id_role_member)

	// Get user get reaction
	const member = guild.members.cache.get(id_user_to_reaction)

	if (!member.roles) {
		console.log(member)
		return
	}

	const member_have = member.roles.cache

	// Get whos reaction
	const users = guild.members.cache.get(id_user)

	if (!users.roles) {
		console.log(users)
		return
	}

	const users_have = users.roles.cache

	log.info(`LOG Reaction: ${name_user} ${is} -> ${msg}`)

	// Mod Only
	if (users_have.some((role) => config.id_mod.includes(role.id))) {
		// Remove Member Role
		if (is === "🔒" || is === "🔓") {
			if (member_have.has(id_role_member)) {
				member.roles.remove(MemberRole)
				log.info("Remove member")
			}
		}

		// Check if reaction is 🔒 emoji
		if (is === "🔒") {
			// Check if the user already has the mute role
			if (member_have.has(muteRole.id)) {
				log.info("The user already has mute role, so do nothing")
				return
			} else {
				// The user does not have the mute role, so add it
				member.roles.add(muteRole)
				log.info("Add mute")
				reaction.message.reply(`${reaction.message.author.toString()} has been added to muted role`)
			}
		} else if (is === "🔓") {
			// Check if user has mute role
			if (member.roles.cache.has(muteRole.id)) {
				// The user has mute role, so remove it
				member.roles.remove(muteRole)
				log.info("Remove Mute")
				reaction.message.reply(`${reaction.message.author.toString()} has been remove to muted role`)

				// or just manual it
				/*
        if (!member_have.has(MemberRole.id)) {
          member.roles.add(MemberRole);
          log.info("Add back Member");
        }
        */
			} else {
				log.info("The user does not have mute role, so do nothing")
				return
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

		// verify channel
		if (cn_id == "1039554337438961714") {
			if (!use_cmd.includes("verify")) {
				await interaction.reply({
					content: "can't be used here",
					ephemeral: true
				})
				return // bye bug :p
			}
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
			/*
      await interaction.reply({
        content: "Modals is not recognized :(",
        ephemeral: true,
      });
      */
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

	// (verify) Delete useless messages, If not admin (TODO: Add multi user)
	if (message.channel.id == 1039554337438961714) {
		if (message.author.id != config.id_admin) {
			message.delete()
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
	windowMs: 60 * 1000,
	max: 10,
	statusCode: 200,
	message: {
		msg: "Too many requests, please try again later.",
		code: 403
	}
})

const web = express()

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
	//console.log(request);
	response.send(request.ip)
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
			ping_notif.send(d.data)
			log.info(`Send Ping: ${d.data.content}`)
		} else if (d.type == "bot_stats") {
			bot.user.setPresence({
				activities: [
					{
						name: d.data
					}
				],
				status: "online"
			})
		}
	} catch (ex) {
		log.error("Error Message Ping: ", ex)
		// Stop the Worker and restart it
		//ping_job.terminate();
		//ping_job = get_job();
	}
})
ping_job.on("error", (ex) => {
	console.log("ping error")
	console.log(ex)

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
