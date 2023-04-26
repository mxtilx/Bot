/** @format */

//const config = require("../config.json");
const log = require("../../util/logger")
const axios = require("axios")
const fs = require("fs")
const path = require("path")

const { promisify } = require("util")

const crypto = require("crypto")
const protobuf = require("protobufjs")
const loadProto = promisify(protobuf.load)

const KEY_SIZE = 256

function read_json(file) {
	return JSON.parse(fs.readFileSync(file))
}

module.exports = {
	RES: async function (version = "OSRELAndroid3.5.0", seed_id = "3f8038a6406a3b89", key_rsa = 5, audio_lang = 2) {
		try {
			/*

			Language: 1-EN, 2-JP, 13-ID
			Platform: 3-PC, 2-Android

			OSRELWin3.5.0 | 39f0ecc6d4a1046d
			CNRELWin3.5.0 | d64c50db414535a2
			OSRELAndroid3.5.0 | 3f8038a6406a3b89
			CNRELAndroid3.5.0 | 26aeefb488ada624

			OSRELWin3.6.0 | 5a7f44b6a1aba0e2
			CNRELWin3.6.0 | 6afecbf1786dc983
			OSRELAndroid3.6.0 | b89009325796c5cf
			CNRELAndroid3.6.0 | f6bd35789bd586da
			*/

			var platform = 1
			if (version.includes("Android")) {
				platform = 2
			} else if (version.includes("Win")) {
				platform = 3
			}

			var server = "osasiadispatch.yuanshen.com"
			if (version.includes("CN")) {
				server = "cngfdispatch.yuanshen.com"
				key_rsa = 4
			}

			const pubKey = fs.readFileSync(`./src/game/genshin/keys/${key_rsa}-public.pem`)
			const privKey = fs.readFileSync(`./src/game/genshin/keys/${key_rsa}-private.pem`)

			const url = `https://${server}/query_cur_region?version=${version}&lang=${audio_lang}&binary=1&platform=${platform}&channel_id=1&sub_channel_id=0&account_type=1&dispatchSeed=${seed_id}&key_id=${key_rsa}`
			console.log("URL: " + url)

			const response = await axios.get(url, {
				timeout: 1000 * 10
			})
			const d = response.data
			//console.log(d)

			if (d.content) {
				let content = Buffer.from(d.content, "base64")
				let sign = Buffer.from(d.sign, "base64")

				let res = []

				while (content.length > 0) {
					let data = content.slice(0, KEY_SIZE)
					content = content.slice(data.length)

					res.push(
						crypto.privateDecrypt(
							{
								key: privKey,
								padding: crypto.constants.RSA_PKCS1_PADDING
							},
							Buffer.from(data)
						)
					)
				}

				let result = Buffer.concat(res)
				let verified = crypto.createVerify("RSA-SHA256").update(result).verify(pubKey, sign)

				console.log("Verified signature =>", verified)

				const root = await loadProto("./src/game/genshin/proto/schema.proto")
				const dmsg = root.lookupType("QueryCurrRegionHttpRsp")
				const decoded = dmsg.decode(result)

				if (decoded.regionInfo.resVersionConfig) {
					//save dump
					const jsonString = JSON.stringify(decoded, null, 4)
					fs.writeFile(`./src/game/genshin/dump/${seed_id}.json`, jsonString, (err) => {
						if (err) {
							console.error(err)
							return
						}
						console.log("Save dump file...")
					})

					return {
						msg: "OK",
						code: 200,
						data: decoded
					}
				} else {
					return {
						msg: "No Config Found",
						code: 404,
						raw: decoded
					}
				}
			} else {
				console.log(d)
				return {
					msg: "Faild",
					code: 404
				}
			}
		} catch (error) {
			log.error(error)
			return {
				msg: "Error Get",
				code: 302
			}
		}
	},
	// RAW DATA
	INFO: async function (version = "", platform = 1) {
		// 1 = PC, 2 = Android, 3 = iOS
		try {
			var data = []
			if (version) {
				// grab version only
			} else {
				// get all version
				// TODO: save and load by datebase
				// TODO: add android & ios

				// Load by file json (PC)
				const file_version = "./src/web/public/json/genshin/version/archive"
				fs.readdirSync(file_version).forEach((cn) => {
					var file_cn = path.join(file_version, cn)
					fs.readdirSync(file_cn).forEach((cn2) => {
						var x = path.join(file_cn, cn2)
						let jsonData = read_json(x)
						//log.info(jsonData);
						data.push(jsonData)
					})
				})
			}
			return {
				msg: "OK",
				code: 200,
				data: data
			}
		} catch (error) {
			log.error(error)
			return {
				msg: "Error Get",
				code: 302
			}
		}
	}
}
