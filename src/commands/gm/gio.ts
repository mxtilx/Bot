/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { contains, isEmpty } from "../../util/library";
import ConfigR from '../../util/config';
import Logger from "../../util/logger";
import axios from "axios"
import crypto from "crypto"

const log = new Logger("GM-GIO");

export const _ = {
	Sign: function (raw: any = null) {
		let sha256_salt = "1d8z98SAKF98bdf878skswa8kdjfy1m9dses"
		let query_string = Object.keys(raw)
			.map((x) => `${x}=${raw[x]}`)
			.join("&")
		let sha256_result = crypto
			.createHash("sha256")
			.update(query_string + sha256_salt)
			.digest("hex")
		raw["sign"] = sha256_result
		return raw
	},
	CMD: function (cmd: number, uid: number | undefined = undefined, msg: string | undefined = undefined, raw: any = null, region = "dev_gio") {
		let params = {
			cmd: `${cmd}`,
			region: region,
			ticket: `YSGM@${Date.now()}`,
			msg: msg,
			uid: uid
		}
		//log.info(params);
		if (raw !== null) {
			params = Object.assign({}, params, raw)
		}
		return this.Sign(params)
	},
	Mail: async function (
		url: string,
		uid = "10005",
		title = "Tes",
		sender = "YuukiPS",
		expire_time: Number = -0,
		content = "tes",
		item_list: any = null,
		is_collectible = false
	) {
		if (!expire_time) {
			const now = new Date()
			expire_time = Math.round(now.getTime() / 1000) + 60 ** 2 * 24 * 7
		}
		let item_str = ""
		if (item_list) {
			item_str = item_list.map((x: any) => `${x.item_id}:${x.amount}:${x.level}:${x.promote_level}`).join(",")
		}
		const mail_json = {
			uid: `${uid}`,
			title,
			sender,
			expire_time: `${expire_time}`,
			content,
			item_list: item_str,
			is_collectible
		}
		log.info(mail_json)
		try {
			// 1005 - email
			let params = this.CMD(1005, -0, "", mail_json)
			const response = await axios.get(url, {
				params: params,
				timeout: 1000 * 60
			})
			const result = response.data
			log.info(result)
			if (result.msg == "succ" && result.retcode == 0) {
				return {
					msg: `Message has been sent`,
					code: 200
				}
			} else {
				return {
					msg: result.msg,
					code: result.retcode
				}
			}
		} catch (error) {
			return {
				msg: `Error send mail`,
				code: 401
			}
		}
	},
	GM: async function (url: string, uid: number, set_command: string, set_timeout = 60) {
		try {
			// 1116 = GM
			let params = this.CMD(1116, uid, set_command, null)

			let result = null
			try {
				var response = await axios.get(url, {
					params: params,
					timeout: 1000 * set_timeout
				})
				result = response.data
			} catch (error) {
				log.error(`GIO ${uid} | ${url} -> ${(error as Error).message} -> ${set_command}`)
				return {
					msg: `Out of time doing this command, maybe this command is not recognized or too heavy.`,
					code: 302
				}
			}

			// LOG RESPON
			//log.debug(result)

			if (result.msg == "succ" && result.retcode == 0) {
				return {
					msg: `Command has been received`,
					code: 200
				}
			} else {
				// if have data
				if (result.data) {
					return {
						msg: result.data.retmsg + result.msg,
						code: result.retcode
					}
				} else {
					return {
						msg: result.msg,
						code: result.retcode
					}
				}
			}
		} catch (x) {
			log.error(x as Error)
			return {
				msg: "Error get server",
				code: 401
			}
		}
	},
	Server: async function (server_url: string, set_timeout: number = 60) {
		var response = null;
		try {
			// 1101 = Server Status
			let params = this.CMD(1101)
			response = await axios.get(server_url, {
				params: params,
				timeout: 1000 * set_timeout
			})
			const result = response.data
			if (result == undefined || result == null) {
				log.debug(response)
				return {
					msg: "Error get server2",
					code: 401
				}
			}
			return {
				data: {
					server: result.data.gameserver_player_num,
					online: result.data.online_player_num_except_sub_account
				},
				code: 200,
				msg: "OK"
			}
		} catch (error) {
			//log.error(error as Error);
			//log.error(response);
			return {
				msg: "Error get server1",
				code: 401
			}
		}
	}
}

export default _;