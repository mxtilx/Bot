/** @format */

import Config from "../../util/config"
import Logger from "../../util/logger"
import { Command } from "./Interface"

const log = new Logger("/debug", "blue")

export default async function handle(command: Command) {
	var c = command.args[0]
	var s = command.args[1]
	if (!c) {
		log.warn(`Need Profile`)
		return
	}

	if (!s) {
		log.warn(`Need Set`)
		return
	}

	const prodProfile = Config.profile.find((profile) => profile.name === c)
	if (prodProfile != null) {
		const debugObject = prodProfile.debug as unknown as {
			[key: string]: boolean | number
		}
		if (debugObject.hasOwnProperty(s)) {
			debugObject[s] = !debugObject[s]
			console.log(`Toggled ${s} debug value to ${debugObject[s]}`)
		} else {
			console.log(`Debug key ${s} not found`)
		}
	}
}
