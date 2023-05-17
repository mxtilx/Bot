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
import { SH } from "../gm/control";
import { SearchRedeemCode } from "../game/hoyolab/api"; // TODO: use control version game by game type

const log = new Logger("SEARCH-CMD");

const cmd = new SlashCommandBuilder()
	.setName("search")
	.setDescription("Looking for something")
	.addStringOption((option) => option.setName("search").setDescription("code gs,sr,hk").setRequired(true))

async function run(interaction: CommandInteraction) {

	const baseReply: InteractionReplyOptions = { ephemeral: false }; // shit

	try {
		let search = interaction.options.get("search")?.value?.toString() ?? '';

		await interaction.deferReply(baseReply)
		await sleep(2)		

		if (search == "code gs") {
			let d = await SearchRedeemCode()
			console.log(d)
			d = `Genshin Impact Game code for OS ,found: ${d.toString()}`
			return await interaction.editReply({ content: d, ...baseReply })
		} else if (search == "code sr") {
			let d = await SearchRedeemCode(6)
			console.log(d)
			d = `Star Rail Game code for OS ,found: ${d.toString()}`
			return await interaction.editReply({ content: d, ...baseReply })
		} else if (search == "code hk") {
			let d = await SearchRedeemCode(1)
			console.log(d)
			d = `Honkai Impact Game code for OS ,found: ${d.toString()}`
			return await interaction.editReply({ content: d, ...baseReply })
		}

		return await interaction.editReply({ content: `I don't know \`${search}\` so give up`, ...baseReply })
	} catch (err) {
		log.error(err as Error)
		return await interaction.editReply({ content: "Unknown error", ...baseReply })
	}
}

let _;
export default _ = {
	process: run,
	command: cmd
}