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
import Control, { ListServer, ServerData } from "../gm/control"
import API_HOYO from "../../game/hoyolab/api"
import API_GS from "../../game/genshin/api"
import API_SR from "../../game/starrails/api"

const log = new Logger("ONLINE-CMD")

const cmd = new SlashCommandBuilder().setName("online").setDescription("Check Server Online Player")

async function run(interaction: CommandInteraction) {
	const baseReply: InteractionReplyOptions = { ephemeral: false } // shit

	try {
		await interaction.deferReply(baseReply)
		await sleep(3)

		var tes = ""
		var total = 0
		let d = (await Control.Server()) as ListServer
		if (d != undefined && d.data != undefined) {
			var dxx = d.data as ServerData[]
			dxx.forEach(function (i: { name: any; id: any; server: { player: number; cpu: any; ram: any } }) {
				tes += `${i.name} (${i.id}) > Player ${i.server.player} | CPU: ${i.server.cpu} / RAM ${i.server.ram} \n`
				total = total + i.server.player
			})

			tes += `\nTotal Player ${total}`
		}
		return await interaction.editReply({ content: `${tes}`, ...baseReply })
	} catch (err) {
		log.error({ name: "online", error: err })
		if (err instanceof DiscordAPIError) {
			if (err.message != `Unknown interaction`) {
				await interaction.editReply({ content: "Unknown problem", ...baseReply })
			} else {
				// skip
			}
		}
	}
}

let _
export default _ = {
	process: run,
	command: cmd
}
