/** @format */

import { CommandInteraction,SlashCommandBuilder } from 'discord.js';

const log = require("../util/logger")

const api_genshin = require("../game/genshin/api") // TODO: use control version game by game type

const lib = require("../lib")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("link")
		.setDescription("Get latest download link")
		.addStringOption((option) => option.setName("game").setDescription("Game ID: [gs]").setRequired(true))
		.addStringOption((option) =>
			option.setName("version").setDescription("Use this for complete link").setRequired(false)
		),
	/**
	 * @param {CommandInteraction} interaction
	 * @returns {void}
	 */
	async execute(interaction: { options: { getString: (arg0: string) => any; }; user: { id: any; }; reply: (arg0: { content: string; ephemeral: boolean; }) => void; editReply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
		try {
			let game_id = interaction.options.getString("game")
			let set_version = interaction.options.getString("version")
			let id_user = interaction.user.id

			interaction.reply({ content: "Please wait...", ephemeral: true })

			await lib.sleep(2)

			let d = await api_genshin.INFO(set_version)

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

			return await interaction.editReply({ content: info, ephemeral: true })
		} catch (err) {
			log.error("Error: ", err)
			return await interaction.editReply({ content: "Unknown error", ephemeral: true })
		}
	}
}
