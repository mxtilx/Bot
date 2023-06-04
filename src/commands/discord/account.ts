/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty } from "../../util/library"
import Config from "../../util/config"
import Logger from "../../util/logger"

// API Discord
import { CommandInteraction, SlashCommandBuilder, InteractionReplyOptions } from "discord.js"

// API Yuuki
import Control from "../gm/control"
import API_HOYO from "../../game/hoyolab/api"
import API_GS from "../../game/genshin/api"
import API_SR from "../../game/starrails/api"
import API_ACC from "../../db/account/api"

const log = new Logger("Account-CMD")

const cmd = new SlashCommandBuilder()
	.setName("account")
	.setDescription("YuukiPS Account")
	.addStringOption((option) => option.setName("metode").setDescription("try create|forget|login").setRequired(true))
	.addStringOption((option) =>
		option.setName("username").setDescription("Email account/username for YuukiPS").setRequired(true)
	)
	.addStringOption((option) =>
		option.setName("password").setDescription("Password for your YuukiPS Account").setRequired(false)
	)

async function run(interaction: CommandInteraction) {
	const baseReply: InteractionReplyOptions = { ephemeral: true } // shit

	try {
		var metode = interaction.options.get("metode")?.value?.toString() ?? ""
		var username = interaction.options.get("username")?.value?.toString() ?? ""
		var password = interaction.options.get("password")?.value?.toString() ?? ""

		await interaction.deferReply(baseReply)
		await sleep(3)

		var tes = ""

		// tmp
		if (metode == "create") {
			let r = await API_ACC.CREATE_ACCOUNT_GC(username, password)
			tes = `${r.message}`
		} else {
			tes = `Metode ${metode} is not yet available, Tips: if you want to create an account just type "create" why are people so lazy to search and look around it.`
		}
		log.warn(`Account ${username} get respon ${tes}`)

		return await interaction.editReply({ content: `${tes}`, ...baseReply })
	} catch (err) {
		log.error(err as Error)
		await interaction.editReply({ content: "Unknown problem", ...baseReply })
	}
}

let _
export default _ = {
	process: run,
	command: cmd
}
