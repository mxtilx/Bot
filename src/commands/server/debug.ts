/** @format */

import Config from "../../util/config"
import Logger from "../../util/logger"
import { Command } from "./Interface"

const log = new Logger("/debug", "blue")

export default async function handle(command: Command) {
	var c = command.args[0]
	if (!c) {
		log.warn(`VerboseLevel: ${Config.DEBUG_WEB}`)
		return
	}

	if (c == "true") {
		Config.DEBUG_WEB = true
	} else {
		Config.DEBUG_WEB = false
	}

	log.log(`DEBUG WEB SET ${Config.DEBUG_WEB}`)
}
