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
import { CommandInteraction, SlashCommandBuilder, InteractionReplyOptions, DiscordAPIError } from "discord.js"

// API Yuuki
import Control from "../gm/control"
import GM_GIO from "../gm/gio"
import API_HOYO from "../../game/hoyolab/api"
import API_GS from "../../game/genshin/api"
import API_SR from "../../game/starrails/api"

const log = new Logger("dailycheck-CMD")

const cmd = new SlashCommandBuilder()
	.setName("dailycheck")
	.setDescription("Simple daily check-in game")
	.addStringOption((option) =>
		option.setName("uid_acc").setDescription("Set uid account, found in cookies").setRequired(true)
	)
	.addStringOption((option) =>
		option.setName("token").setDescription("Set token, found in cookies").setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("game_name")
			.setDescription("Set game name like hk4e for gs, you can input (all) to try all game?")
	)

async function run(interaction: CommandInteraction) {
	try {
		var uid_acc = interaction.options.get("uid_acc")?.value?.toString() ?? ""
		var token = interaction.options.get("token")?.value?.toString() ?? ""
		var game_name = interaction.options.get("game_name")?.value?.toString() ?? ""

		if (!game_name) {
			game_name = "hk4e"
		}

		interaction.reply({ content: `Wait a moment...` })

		await sleep(5)

		let d = await API_HOYO.DailyCheckIn(game_name, token, uid_acc)

		//console.log(d);

		interaction.editReply({
			content: `${d.message}`
		})
	} catch (err) {
		log.error({ name: "dailycheck", error: err })
	}
}

let _
export default _ = {
	process: run,
	command: cmd
}
