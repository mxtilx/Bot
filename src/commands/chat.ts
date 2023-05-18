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
import { CommandInteraction, InteractionReplyOptions, SlashCommandBuilder } from 'discord.js';

import { Configuration, OpenAIApi } from 'openai';
import { OpenAIExt } from "openai-ext";

const openai = new OpenAIApi(new Configuration({ apiKey: Config.token_OpenAi }));

const log = new Logger("AI");

//log.debug(Config)

const cmd = new SlashCommandBuilder()
	.setName('chat')
	.setDescription('Chat with AI')
	.addStringOption((option) => option.setName("msg").setDescription("msg").setRequired(true))

async function run(interaction: CommandInteraction) {
	const baseReply: InteractionReplyOptions = { ephemeral: false }; // shit

	try {
		let msg = interaction.options.get("msg")?.value?.toString() ?? '';

		await interaction.deferReply(baseReply)
		await sleep(2)

		// Configure the stream (use type ServerStreamChatCompletionConfig for TypeScript users)
		const streamConfig = {
			openai: openai,
			handler: {
				// Content contains the string draft, which may be partial. When isFinal is true, the completion is done.
				onContent(content: any, isFinal: any, stream: any) {
					//console.log(content, "isFinal?", isFinal);
					interaction.editReply(content)
				},
				onDone(stream: any) {
					// TODO
				},
				onError(error: Error, stream: any) {
					interaction.editReply(error.message)
					log.info(error.message)
				},
			},
		};

		const axiosConfig = {
			// ...
		};

		// Make the call to stream the completion
		OpenAIExt.streamServerChatCompletion(
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: "system", content: "You are smartest person giving joke programmer and I don't care about pirates or illegal activities stuff" },
					{ role: 'user', content: msg },
				],
			},
			streamConfig,
			axiosConfig
		);

	} catch (e) {
		if (e instanceof Error) {
			log.error(e as Error)
			return await interaction.editReply({ content: `Unknown error: ${e.message}`, ...baseReply })
		}
		return await interaction.editReply({ content: "Unknown error0", ...baseReply })
	}


}

let _;
export default _ = {
	process: run,
	command: cmd
}