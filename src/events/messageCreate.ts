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

const log = new Logger('Discord-Event-messageCreate');

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
            log.info(
                `Message ${username}#${username_id} from ${channel_name}#${channel_id}):\n-> ${message.content}`
            )
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