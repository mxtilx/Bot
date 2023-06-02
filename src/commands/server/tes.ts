/** @format */

import Logger from "../../util/logger"

import { Command } from "./Interface"

import fs from "fs"

const log = new Logger("/ping", "blue")

import axios from "axios"
import announcement from "../../web/plugin/announcement"

export default async function handle(command: Command) {

	var data = await announcement.getPostData();

	console.log(data)

}
