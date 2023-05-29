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

const log = new Logger("CMD-MAIL")

const cmd = new SlashCommandBuilder()
	.setName("mail")
	.setDescription("Send Mail to Server")
	.addStringOption((option) => option.setName("id").setDescription("Server ID: [sg1|eu1|gio2]").setRequired(true))
	.addStringOption((option) => option.setName("uid").setDescription("uid player").setRequired(true))
	.addStringOption((option) =>
		option
			.setName("command")
			.setDescription("msg-title-yourmessage|gitem-itemid-amount,itemid-amount")
			.setRequired(true)
	)

async function run(interaction: CommandInteraction) {
	try {
		let server_id = interaction.options.get("id")?.value?.toString() ?? ""
		let uid = interaction.options.get("uid")?.value?.toString() ?? ""
		let set_command = interaction.options.get("command")?.value?.toString() ?? ""
		let username = interaction.user.username

		// TODO: add gc mail

		var input
		if (set_command.includes("msg")) {
			// send email
			var valb = set_command.split("-")
			input = await GM_GIO.Mail(server_id, uid, valb[1], username, -0, valb[2])
		} else if (set_command.includes("gitem")) {
			// send multi item
			var more_item = set_command.split(",")
			var itemtoadd: {
				item_id: any // item id
				amount: any // quantity
				level: number // level
				promote_level: number // cts
			}[] = []
			more_item.forEach(function (data_msg: string) {
				log.info(data_msg)
				let ks = data_msg.replace("gitem-", "")
				var valb2 = ks.split("-")
				itemtoadd.push({
					item_id: valb2[0], // item id
					amount: valb2[1], // quantity
					level: 0, // level
					promote_level: 0 // cts
				})
			})
			input = await GM_GIO.Mail(
				server_id,
				uid,
				"A gift item from Discord",
				username,
				-0,
				`Accept a gift from me ~ YuukiPS`,
				itemtoadd
			)
		} else {
			return await interaction.reply({ content: `Unknown command: ${set_command}`, ephemeral: true })
		}
		if (input.code == 200) {
			return await interaction.reply({ content: `Message has been sent`, ephemeral: true })
		} else {
			return await interaction.reply({
				content: `Error msg: ${input.msg}, code: ${input.code}`,
				ephemeral: true
			})
		}
	} catch (err) {
		log.error(err as Error)
		return await interaction.reply({ content: "error2", ephemeral: true })
	}
}

let _
export default _ = {
	process: run,
	command: cmd
}
