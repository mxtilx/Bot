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
import GM_GIO from "../gm/gio";
import API_HOYO from "../../game/hoyolab/api";
import API_GS from "../../game/genshin/api";
import API_SR from "../../game/starrails/api";

const log = new Logger("link-CMD");

const cmd = new SlashCommandBuilder()
	.setName("link")
	.setDescription("Get latest download link")
	.addStringOption((option) => option.setName("game").setDescription("Game ID: [gs]").setRequired(true))
	.addStringOption((option) =>
		option.setName("version").setDescription("Use this for complete link").setRequired(false)
	)

async function run(interaction: CommandInteraction) {

	const baseReply: InteractionReplyOptions = { ephemeral: false }; // shit

	try {
		let game_id = interaction.options.get("game")?.value?.toString() ?? '';
		let set_version = interaction.options.get("version")?.value?.toString() ?? '';
		let id_user = interaction.user.id

		await interaction.deferReply(baseReply)
		await sleep(2)

		let d = await API_GS.INFO(set_version)

		if (d == undefined || d.data == undefined) {
			return;
		}

		var info = `Currently Available ` + d.data.length + " Version\n\n"

		d.data.forEach(function (i: { data: { game: { latest: { version: any; entry: any; path: any; }; }; }; }) {
			// TODO: check pre-download
			var version = i.data.game.latest.version
			var cn_game = i.data.game.latest.entry
			var link_full = i.data.game.latest.path
			var cn_game_rel = "Global"
			if (cn_game == "YuanShen.exe") {
				cn_game_rel = "China"
			}

			// post
			info += ` \
                ${version} (${cn_game_rel}) -> \
                ${link_full}\n`
		})

		return await interaction.editReply({ content: info, ...baseReply })
	} catch (err) {
		log.error(err)
		return await interaction.editReply({ content: "Unknown error", ...baseReply })
	}
}

