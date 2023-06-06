/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import Logger from "../util/logger"

// API Discord
import { GuildMember } from "discord.js"

const log = new Logger("Discord-Event-guildMemberAdd")

export default async function run(member: GuildMember) {
	log.info(`${member.user.username} joined the server.`)
}
