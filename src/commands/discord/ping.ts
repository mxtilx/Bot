/** @format */

import { CommandInteraction, SlashCommandBuilder } from "discord.js"

const cmd = new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!")

async function run(interaction: CommandInteraction) {
	await interaction.reply("Pong goblok")
}

let _
export default _ = {
	process: run,
	command: cmd
}
