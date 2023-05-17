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
import { GM } from "../gm/control";
import { SearchRedeemCode } from "../game/hoyolab/api";
import { RES as RES_GS } from "../game/genshin/api";
import { RES as RES_SR } from "../game/starrails/api";
const log = new Logger("GM-CMD");

const cmd = new SlashCommandBuilder()
	.setName("cmd")
	.setDescription("Send Command (RAW) to Server")
	.addStringOption((option) => option.setName("id").setDescription("Server ID").setRequired(true))
	.addStringOption((option) => option.setName("uid").setDescription("uid player").setRequired(true))
	.addStringOption((option) => option.setName("command").setDescription("stamina infinite on").setRequired(true))
	.addStringOption((option) =>
		option
			.setName("code")
			.setDescription("Code you got in mail (in-game), if you dont have it, leave it blank.")
			.setRequired(false)
	)

async function run(interaction: CommandInteraction) {

	const baseReply: InteractionReplyOptions = { ephemeral: false }; // shit

	try {
		let server_id = interaction.options.get("id")?.value?.toString() ?? '';
		let uid = interaction.options.get("uid")?.value?.toString() ?? '';
		let set_command = interaction.options.get("command")?.value?.toString() ?? '';
		let set_code = interaction.options.get("code")?.value?.toString() ?? '';

		let id_user = interaction.user.id
		let name_user = interaction.user.username

		await interaction.deferReply(baseReply)
		await sleep(2)

		log.info(`${id_user} - ${name_user} use '${set_command}' `)
		let d = await GM(server_id, uid, set_command, set_code)

		return await interaction.editReply({ content: `${d.msg} | ${d.code}`, ...baseReply })
	} catch (err) {
		log.error(err as Error)
		return await interaction.reply({ content: "Unknown error", ...baseReply });
	}
}

let _;
export default _ = {
	process: run,
	command: cmd
}