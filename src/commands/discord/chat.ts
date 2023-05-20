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
import { CommandInteraction, InteractionReplyOptions, SlashCommandBuilder } from 'discord.js';

import { ChatRealtime } from "../../game/openai/api";

const log = new Logger("AI");

const cmd = new SlashCommandBuilder()
	.setName('chat')
	.setDescription('Chat with AI')
	.addStringOption((option) => option.setName("msg").setDescription("msg").setRequired(true))

async function run(interaction: CommandInteraction) {
	const baseReply: InteractionReplyOptions = { ephemeral: false }; // shit

	try {
		let msg = interaction.options.get("msg")?.value?.toString() ?? '';
		
		await interaction.deferReply(baseReply)
		await sleep(2)

		const c = new ChatRealtime();
		c.listen('msg', (sender: any, type: string, data: any) => {
			interaction.editReply(data);
		});
		c.input(msg);

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