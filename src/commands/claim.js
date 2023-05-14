/** @format */

const { SlashCommandBuilder, CommandInteraction } = require("discord.js")

const log = require("../util/logger")

const api_hoyolab = require("../game/hoyolab/api")

const lib = require("../lib")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("claim")
		.setDescription("Simple claim game prizes")
		.addStringOption((option) => option.setName("uid_game").setDescription("Set uid in-game").setRequired(true))
		.addStringOption((option) =>
			option.setName("uid_acc").setDescription("Set uid account, found in cookies").setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("key")
				.setDescription("Set key (code), you can input (all) to try all code")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("token").setDescription("Set token, found in cookies").setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("region")
				.setDescription("Set region like os_asia for asia gs, you can input (all) to try all region?")
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
	async execute(interaction) {
		try {
			var uid_game = interaction.options.getString("uid_game")
			var uid_acc = interaction.options.getString("uid_acc")
			var key = interaction.options.getString("key")
			var token = interaction.options.getString("token")
			var region = interaction.options.getString("region")
			var game_name = interaction.options.getString("game_name")

			if (!region) {
				region = "os_asia"
			}
			if (!game_name) {
				game_name = "hk4e"
			}

			if (key == "free") {
				//const arr = ["GA9FPD42SJ4V", "LAQZMTPKNTYH ", "GENSHINGIFT"] // for startpack
				const arr = await api_hoyolab.SearchRedeemCode(2) // testing code TODO: multi game and acc
				interaction.reply({
					content: `take all free ${arr.length} code`
				})
				await lib.sleep(2)
				var count_ok = 0
				var count_faild = 0
				for (let i = 0; i < arr.length; i++) {
					var key_free = arr[i]

					interaction.editReply({
						content: `claim ${game_name} code for ${uid_game} (${uid_acc}) with key ${key_free} in ${region}`
					})

					await lib.sleep(5)

					let d = await api_hoyolab.ClaimRedeem(uid_game, region, key_free, game_name, token, uid_acc)
					if (d.retcode == 0) {
						count_ok++
					} else {
						count_faild++
					}
					d = `${key_free} | ${d.message}`

					await interaction.editReply({ content: d })

					await lib.sleep(2)
				}
				await lib.sleep(2)
				await interaction.editReply({ content: `What you got is ${count_ok} and failed ${count_faild}` })
				return
			}

			interaction.reply({
				content: `claim ${game_name} code for ${uid_game} (${uid_acc}) with key ${key} in ${region}`
			})

			await lib.sleep(5)

			let d = await api_hoyolab.ClaimRedeem(uid_game, region, key, game_name, token, uid_acc)
			console.log(d)
			d = `${key} | ${d.message}`

			return await interaction.editReply({ content: d })
		} catch (err) {
			log.error(err)
			return await interaction.editReply({ content: "Unknown error" })
		}
	}
}
