/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty } from "../lib";
import Config from '../util/config';
import Logger from "../util/logger";

// API Discord
import { CommandInteraction, SlashCommandBuilder, InteractionReplyOptions } from 'discord.js';

// API Yuuki
import { Server } from "../gm/control";
import { SearchRedeemCode } from "../game/hoyolab/api";
import { RES as RES_GS } from "../game/genshin/api";
import { RES as RES_SR } from "../game/starrails/api";
const log = new Logger("ONLINE-CMD");

const cmd = new SlashCommandBuilder().setName("online").setDescription("Check Server Online Player")

async function run(interaction: CommandInteraction) {

	const baseReply: InteractionReplyOptions = { ephemeral: false }; // shit

	try {

		await interaction.deferReply(baseReply)
		await sleep(3)

		var tes = ""
		var total = 0
		let d = await Server()
		d.data.forEach(function (i: { name: any; id: any; server: { player: number; cpu: any; ram: any } }) {
			tes += `${i.name} (${i.id}) > Player ${i.server.player} | CPU: ${i.server.cpu} / RAM ${i.server.ram} \n`
			total = total + i.server.player
		})

		tes += `\nTotal Player ${total}`
		return await interaction.editReply({ content: `${tes}`, ...baseReply })
	} catch (err) {
		log.error(err as Error)
		await interaction.editReply({ content: "Unknown problem", ...baseReply })
	}
}

let _;
export default _ = {
	process: run,
	command: cmd
}