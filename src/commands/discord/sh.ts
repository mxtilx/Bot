/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty } from "../../util/library";
import Config from '../../util/config';
import Logger from "../../util/logger";

// API Discord
import { CommandInteraction, SlashCommandBuilder, InteractionReplyOptions } from 'discord.js';

// API Yuuki
import Control from "../gm/control";

const log = new Logger("SH-CMD");

const cmd = new SlashCommandBuilder()
	.setName("sh")
	.setDescription("Access Super Admin Servers")
	.addStringOption((option) => option.setName("id").setDescription("Server ID: [eu1|sg1|gio2]").setRequired(true))
	.addStringOption((option) => option.setName("command").setDescription("who").setRequired(true))

async function run(interaction: CommandInteraction) {

	const baseReply: InteractionReplyOptions = { ephemeral: false }; // shit

	try {
		let set_command = interaction.options.get("command")?.value?.toString() ?? '';
		let server_id = interaction.options.get("id")?.value?.toString() ?? '';
		let id_user = interaction.user.id
		let name_user = interaction.user.username

		log.info(`RUN: ${set_command} in ${server_id} by ${name_user}`)

		if (id_user != Config.id_admin) {
			return await interaction.reply({ content: `No Admin: ${id_user}`, ...baseReply })
		}

		await interaction.deferReply(baseReply)
		await sleep(2)

		let d = await Control.SH(set_command, server_id)

		console.log(d);

		if (isEmpty(d.msg)) {
			return await interaction.editReply({ content: `gak responnnya goblok`, ...baseReply })
		}

		return await interaction.editReply({ content: d.msg, ...baseReply })
	} catch (e) {
		if (e instanceof Error) {
			log.error(e as Error)
			return await interaction.editReply({ content: `Unknown error: ${e.message}`, ...baseReply })
		}
		return await interaction.editReply({ content: "Unknown error0", ...baseReply })
	}
}

let _;
export default _ = {
	process: run,
	command: cmd
}