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
import { Message } from "discord.js";

const log = new Logger("Discord-Event-messageUpdate");

export default async function run(message: Message) {
    log.warn(`Message in ${message.channel.toString()} deleted`);
    log.trail(message.cleanContent);
}