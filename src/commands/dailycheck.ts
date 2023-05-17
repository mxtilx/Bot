/** @format */

import { CommandInteraction, SlashCommandBuilder } from "discord.js"

const log = require("../util/logger")

const api_hoyolab = require("../game/hoyolab/api")

const lib = require("../lib")

module.exports = {
	data: new SlashCommandBuilder()
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
		),
	/**
	 * @param {CommandInteraction} interaction
	 * @returns {void}
	 */
	async execute(interaction: { options: { getString: (arg0: string) => any }; reply: (arg0: { content: string }) => void; editReply: (arg0: { content: string }) => void }) {
		try {
			var uid_acc = interaction.options.getString("uid_acc")
			var token = interaction.options.getString("token")
			var game_name = interaction.options.getString("game_name")

			if (!game_name) {
				game_name = "hk4e"
			}

			interaction.reply({ content: `Wait a moment...` })

			await lib.sleep(5)

			let d = await api_hoyolab.DailyCheckIn(game_name, token, uid_acc)

			//console.log(d);

			interaction.editReply({
				content: `${d.message}`
			})
		} catch (err) {
			log.error(err)
			return await interaction.editReply({ content: "Unknown error" })
		}
	}
}
