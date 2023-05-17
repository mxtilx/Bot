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
import { Message, PartialMessage } from "discord.js";

const log = new Logger("Discord-Event-messageUpdate");

export default async function run(oldMessage: Message<boolean> | PartialMessage, newMessage: Message<boolean> | PartialMessage) {

    // if bot
    if (newMessage.author?.bot) return;

    log.log(`Message edited by ${newMessage.author?.tag || ""} (${newMessage.id})`);
}