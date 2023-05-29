/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty, contains } from "../util/library"
import Config from "../util/config"
import Logger from "../util/logger"

// API Discord
import { Collection, Message, PartialMessage } from "discord.js"

const log = new Logger("Discord-Event-messageDeleteBulk")

export default async function run(messages: Collection<string, Message<boolean> | PartialMessage>) {
	log.warn(`${messages.size} messages deleted (bulk) in ${messages.first()?.channel.toString() || "???"}`)
}
