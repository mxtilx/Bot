/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { contains, isEmpty } from "../../util/library"
import ConfigR from "../../util/config"
import Logger from "../../util/logger"
import axios from "axios"

const log = new Logger("GM-SR")

export const _ = {
	// TODO:
	GM: async function (url: string, uid: any, cmd: any, code: any, set_timeout = 60) {
		try {
			const response = await axios.get(url + "api/gm", {
				params: {
					password: code,
					command: cmd,
					uid: uid
				},
				timeout: 1000 * set_timeout
			})
			const d = response.data
			if (d.retcode == 0) {
				return {
					msg: `Message has been sent`,
					code: 200
				}
			} else {
				return {
					msg: d.msg,
					code: d.retcode
				}
			}
		} catch (error) {
			log.error(`SR ${uid} | ${url} -> ${(error as Error).message} -> ${cmd}`)
			return {
				msg: `Out of time doing this command, maybe this command is not recognized or too heavy.`,
				code: 302,
				error: error
			}
		}
	},
	Server: async function (server_url: string, set_timeout = 60) {
		try {
			const response = await axios.get(server_url + "api/status", {
				timeout: 1000 * set_timeout
			})
			const d = response.data
			return {
				msg: "OK",
				code: d.retcode,
				data: d.status
			}
		} catch (error) {
			return {
				msg: "Error Get Status",
				code: 302,
				error: error
			}
		}
	}
}

export default _
