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
import axios, { AxiosError } from "axios"

const log = new Logger("GM-GC")

export const _ = {
	GM: async function (url: string, uid: any, cmd: any, code: any, set_timeout = 15) {
		var msg = `${uid} | ${url} -> ${cmd}`
		try {			
			const response = await axios.get(url + "api/command", {
				params: {
					token: code,
					cmd: cmd,
					player: uid
				},
				timeout: 1000 * set_timeout
			})
			const d = response.data
			return {
				msg: d.message,
				code: d.retcode,
				data: d.data
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				if (contains(error.message, ["socket", "ECONNRESET", "Connection lost","timeout"])) {
					log.warn(`server gc timeout with ${error.message} use ${msg}`)
					return {
						msg: error.message,
						code: 408
					}
				}
			}
			log.error({ msg: `SERVER_GC_ERROR_GM: ${uid} | ${url} -> ${(error as Error).message} -> ${cmd}`, error: error })
			return {
				msg: `Out of time doing this command, maybe this command is not recognized or too heavy.`,
				code: 302
			}
		}
	},
	Server: async function (server_url: string, set_timeout = 15) {
		try {
			const response = await axios.get(server_url + "status/server", {
				timeout: 1000 * set_timeout
			})
			const d = response.data
			return {
				msg: "OK",
				code: d.retcode,
				data: d.status
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				if (contains(error.message, ["socket", "ECONNRESET", "Connection lost","timeout"])) {
					log.warn(`server gc timeout with ${error.message} in server ${server_url}`)
					return {
						msg: error.message,
						code: 408
					}
				}
			}
			log.error({ msg: "SERVER_GC_ERROR_0", error: error })
			return {
				msg: "Error Get",
				code: 302
			}
		}
	}
}

export default _
