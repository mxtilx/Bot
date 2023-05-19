/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty, contains } from "../lib";
import Config from '../util/config';
import Logger from "../util/logger";

// API Discord
import { DMChannel, Message, NewsChannel, TextChannel } from "discord.js";

const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

const log = new Logger('Discord-Event-messageCreate');

const characterId = "BELYJ-unxtO41wk4IYdmMnLfVVmyP8IxMZVrIWQQEk0";

let count_melon = 0

export default async function run(message: Message) {
    try {

        // if bot
        if (message.author.bot) return;

        let username_id = message.author.id;
        let username = message.author.username;

        let channel_id = message.channel.id;
        let channel_name =
            message.channel instanceof TextChannel
                ? message.channel.name
                : message.channel instanceof DMChannel
                    ? message.channel.recipient?.username // or any other property/method you want to use for DMChannel
                    : message.channel instanceof NewsChannel
                        ? message.channel.name
                        : 'Unknown Channel';

        // 969145030537281536,988248508429647922 = log public (join/out/levelup) | 987073348418809928 = log private
        /*
        if (!contains(message.channel.id, ["969145030537281536", "987073348418809928", "988248508429647922"])) {            
        }
        */

        // If have message
        if (message.content) {
            var msg = message.content;
            log.info(
                `Message ${username}#${username_id} from ${channel_name}#${channel_id}):\n-> ${msg}`
            )

            // Chat with Ayaka
            if (channel_id == "1078345891557158987") {
                // Login
                if (!characterAI.isAuthenticated()) {
                    await characterAI.authenticateWithToken(Config.token_CharacterAI);

                }
                const chat = await characterAI.createOrContinueChat(characterId,message.id);
                const response = await chat.sendAndAwaitResponse(msg, true)
                if (!isEmpty(response.text)) {
                    message.reply({
                        content: response.text
                    })
                } else {
                    log.info(response);
                    message.reply({
                        content: "Don't know"
                    })
                }
            }
        }

        // If message has Interaction
        if (message.interaction) {
            var use_cmd = message.interaction.commandName
            if (!contains(use_cmd, ["cmd"])) {
                log.info("Message Create with Interaction Message: " + use_cmd)
            }
        }

        // Melon
        if (message.content.toLowerCase() === "melon") {
            message.react("🍈")
        }
        if (message.content.toLowerCase() === "count melon") {
            count_melon++;
            message.reply(`Right now I'm getting ${count_melon} melons, thanks that's delicious`)
        }


    } catch (e) {
        log.error(e as Error)
    }
}