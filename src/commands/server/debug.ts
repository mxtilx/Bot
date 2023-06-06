/** @format */

import Config from "../../util/config"
import Logger from "../../util/logger"
import { Command } from "./Interface"

const log = new Logger("/debug", "blue")

export default async function handle(command: Command) {
	var c = command.args[0]
	if (!c) {
		log.warn(`Web debug: ${Config.debug.web}`)
		return
	}

	if (c == "true") {
		Config.debug.web = true
	} else {
		Config.debug.web = false
	}

	log.log(`DEBUG WEB SET ${Config.debug.web}`)
}
