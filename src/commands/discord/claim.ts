/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty } from "../../util/library"
import Config from "../../util/config"
import Logger from "../../util/logger"

// API Discord
import { CommandInteraction, SlashCommandBuilder, InteractionReplyOptions } from "discord.js"

// API Yuuki
import Control from "../gm/control"
import GM_GIO from "../gm/gio"
import API_HOYO from "../../game/hoyolab/api"
import API_GS from "../../game/genshin/api"
import API_SR from "../../game/starrails/api"

const log = new Logger("claim-CMD")

const cmd = new SlashCommandBuilder()
	.setName("claim")
	.setDescription("Simple claim game prizes")
	.addStringOption((option) => option.setName("uid_game").setDescription("Set uid in-game").setRequired(true))
	.addStringOption((option) =>
		option.setName("uid_acc").setDescription("Set uid account, found in cookies").setRequired(true)
	)
	.addStringOption((option) =>
		option.setName("key").setDescription("Set key (code), you can input (all) to try all code").setRequired(true)
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
	)

async function run(interaction: CommandInteraction) {
	try {
		var uid_game = interaction.options.get("uid_game")?.value?.toString() ?? ""
		var uid_acc = interaction.options.get("uid_acc")?.value?.toString() ?? ""
		var key = interaction.options.get("key")?.value?.toString() ?? ""
		var token = interaction.options.get("token")?.value?.toString() ?? ""
		var region = interaction.options.get("region")?.value?.toString() ?? ""
		var game_name = interaction.options.get("game_name")?.value?.toString() ?? ""

		if (!region) {
			region = "os_asia"
		}
		if (!game_name) {
			game_name = "hk4e"
		}

		if (key == "free") {
			//const arr = ["GA9FPD42SJ4V", "LAQZMTPKNTYH ", "GENSHINGIFT"] // for startpack
			const arr = await API_HOYO.SearchRedeemCode(2) // testing code TODO: multi game and acc
			interaction.reply({
				content: `take all free ${arr.length} code`
			})
			await sleep(2)
			var count_ok = 0
			var count_faild = 0
			for (let i = 0; i < arr.length; i++) {
				var key_free = arr[i]

				interaction.editReply({
					content: `claim ${game_name} code for ${uid_game} (${uid_acc}) with key ${key_free} in ${region}`
				})

				await sleep(5)

				let d = await API_HOYO.ClaimRedeem(uid_game, region, key_free, game_name, token, uid_acc)
				if (d.retcode == 0) {
					count_ok++
				} else {
					count_faild++
				}
				let dd = `${key_free} | ${d.message}`

				await interaction.editReply({ content: dd })

				await sleep(2)
			}
			await sleep(2)
			await interaction.editReply({ content: `What you got is ${count_ok} and failed ${count_faild}` })
			return
		}

		interaction.reply({
			content: `claim ${game_name} code for ${uid_game} (${uid_acc}) with key ${key} in ${region}`
		})

		await sleep(5)

		let d = await API_HOYO.ClaimRedeem(uid_game, region, key, game_name, token, uid_acc)
		console.log(d)
		let dd = `${key} | ${d.message}`

		return await interaction.editReply({ content: dd })
	} catch (err) {
		log.error(err)
		return await interaction.editReply({ content: "Unknown error" })
	}
}

let _
export default _ = {
	process: run,
	command: cmd
}
