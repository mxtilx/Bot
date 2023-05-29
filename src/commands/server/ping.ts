/** @format */

import Logger from "../../util/logger"

import { Command } from "./Interface"

import fs from "fs"

const log = new Logger("/ping", "blue")

export default async function handle(command: Command) {
	log.log(`udah goblok`)
}
