/** @format */

import { CommandInteraction,SlashCommandBuilder } from 'discord.js';

const log = require("../util/logger")

const axios = require("axios")
const api_gio = require("../gm/gio")
const config = require("../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mail")
		.setDescription("Send Mail to Server")
		.addStringOption((option) => option.setName("id").setDescription("Server ID: [sg1|eu1|gio2]").setRequired(true))
		.addStringOption((option) => option.setName("uid").setDescription("uid player").setRequired(true))
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("msg-title-yourmessage|gitem-itemid-amount,itemid-amount")
				.setRequired(true)
		),
	/**
	 * @param {CommandInteraction} interaction
	 * @returns {void}
	 */
	async execute(interaction: { options: { getString: (arg0: string) => any; }; user: { username: any; }; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
		try {
			let server_id = interaction.options.getString("id")
			let uid = interaction.options.getString("uid")
			let set_command = interaction.options.getString("command")
			let username = interaction.user.username

			// TODO: add gc mail

			var input
			if (set_command.includes("msg")) {
				// send email
				var valb = set_command.split("-")
				input = await api_gio.Mail(server_id, uid, valb[1], username, null, valb[2])
			} else if (set_command.includes("gitem")) {
				// send multi item
				var more_item = set_command.split(",")
				var itemtoadd: {
					item_id: any; // item id
					amount: any; // quantity
					level: number; // level
					promote_level: number; // cts
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
				input = await api_gio.Mail(
					server_id,
					uid,
					"A gift item from Discord",
					username,
					null,
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
			log.error("Error: ", err)
			return await interaction.reply({ content: "error2", ephemeral: true })
		}
	}
}
