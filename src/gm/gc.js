/** @format */

//const crypto = require("crypto");
//const config = require("../config.json");
const log = require("../util/logger")

const axios = require("axios")

module.exports = {
	GM: async function (url, uid, cmd, code, set_timeout = 60) {
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
			log.error(`GC ${uid} | ${url} -> ${error.message} -> ${cmd}`)
			return {
				msg: `Out of time doing this command, maybe this command is not recognized or too heavy.`,
				code: 302
			}
		}
	},
	Server: async function (server_url, set_timeout = 60) {
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
			//log.error(error);
			return {
				msg: "Error Get",
				code: 302
			}
		}
	}
}
