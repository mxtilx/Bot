/** @format */

const { SlashCommandBuilder, CommandInteraction } = require("discord.js")

const log = require("../util/logger")

const api_hoyolab = require("../game/hoyolab/api") // TODO: use control version game by game type

const lib = require("../lib")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("search")
		.setDescription("Looking for something")
		.addStringOption((option) => option.setName("search").setDescription("code gs,sr,hk").setRequired(true)),
	/**
	 * @param {CommandInteraction} interaction
	 * @returns {void}
	 */
	async execute(interaction) {
		try {
			let search = interaction.options.getString("search")

			interaction.reply({ content: `looking for ${search} ...` })

			await lib.sleep(2)

			if (search == "code gs") {
				let d = await api_hoyolab.SearchRedeemCode()
				console.log(d)
				d = `Genshin Impact Game code for OS ,found: ${d.toString()}`
				return await interaction.editReply({ content: d })
			} else if (search == "code sr") {
				let d = await api_hoyolab.SearchRedeemCode(6)
				console.log(d)
				d = `Star Rail Game code for OS ,found: ${d.toString()}`
				return await interaction.editReply({ content: d })
			} else if (search == "code hk") {
				let d = await api_hoyolab.SearchRedeemCode(1)
				console.log(d)
				d = `Honkai Impact Game code for OS ,found: ${d.toString()}`
				return await interaction.editReply({ content: d })
			}

			return await interaction.editReply({ content: `I don't know \`${search}\` so give up` })
		} catch (err) {
			log.error(err)
			return await interaction.editReply({ content: "Unknown error" })
		}
	}
}
