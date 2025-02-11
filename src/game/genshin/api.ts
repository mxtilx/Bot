/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty, contains } from "../../util/library"
import Config from "../../util/config"
import Logger from "../../util/logger"

// Proto
import {
	ForceUpdateInfo,
	QueryCurrRegionHttpRsp,
	QueryRegionListHttpRsp,
	RegionInfo,
	RegionSimpleInfo,
	StopServerInfo
} from "./proto/schema"

import { Ec2bKey, RSAUtils } from "../../game/hoyolab/crypto"

const ec2b = new Ec2bKey()

var plog = new Logger("API-GS")

// MORE
import axios from "axios"
import fs from "fs"
import path from "path"
import crypto from "crypto"

const KEY_SIZE = 256

function readJSON(file: string): any {
	return JSON.parse(fs.readFileSync(file, "utf-8"))
}

let COVER_SWITCH_DATA = {
	gacha: 1,
	mall: 2,
	battle_pass: 3,
	bulletin: 4,
	mail: 5,
	time: 6,
	community: 7,
	handbook: 8,
	feedback: 9,
	quest: 10,
	map: 11,
	team: 12,
	friends: 13,
	avatar_list: 14,
	character: 15,
	activity: 16,
	multiplayer: 17,
	recharge_card: 18,
	exchange_code: 19,
	guide_rating: 20,
	share: 21,
	mcoin: 22,
	battle_pass_recharge: 23,
	achievement: 24,
	photograph: 25,
	network_latency_icon: 26,
	user_center: 27,
	account_binding: 28,
	recommend_panel: 29,
	codex: 30,
	report: 31,
	derivative_mall: 32,
	edit_name: 33,
	edit_signature: 34,
	resin_card: 35,
	file_integrity_check: 36,
	activity_h5: 37,
	survey: 38,
	concert_package: 39,
	cloud_game: 40,
	battle_pass_discount: 41,
	share_bbs: 42
}

export const API = {
	NO_VERSION_CONFIG() {
		// CAESGE5vdCBGb3VuZCB2ZXJzaW9uIGNvbmZpZxoA
		// CAESGE5vdCBGb3VuZCB2ZXJzaW9uIGNvbmZpZw== for android no stcuk
		return `CAESGE5vdCBGb3VuZCB2ZXJzaW9uIGNvbmZpZw==`
	},

	RES: async function (version = "OSRELAndroid3.5.0", seed_id = "3f8038a6406a3b89", key_rsa = 5, audio_lang = 2) {
		try {
			/*
	
			Language: 1-EN, 2-JP, 13-ID
			Platform: 3-PC, 2-Android
	
			OSRELWin3.5.0     | 39f0ecc6d4a1046d
			CNRELWin3.5.0     | d64c50db414535a2
			OSRELAndroid3.5.0 | 3f8038a6406a3b89
			CNRELAndroid3.5.0 | 26aeefb488ada624
	
			OSRELWin3.6.0     | 5a7f44b6a1aba0e2
			CNRELWin3.6.0     | 6afecbf1786dc983
			OSRELAndroid3.6.0 | b89009325796c5cf
			CNRELAndroid3.6.0 | f6bd35789bd586da
			CNRELiOS3.6.0     | 24e8cbb8af855e68

			OSRELWin3.7.0     | 31c339cb23bd65a2
			CNRELWin3.7.0     | 916fa790e214f718
			OSRELAndroid3.7.0 | 24fdd422d5cce0cb
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
					let data = content.subarray(0, KEY_SIZE)
					content = content.subarray(data.length)

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

				var decoded = QueryCurrRegionHttpRsp.decode(result)
				if (decoded.regionInfo !== undefined && decoded.regionInfo.resVersionConfig) {
					//save dump
					const jsonString = JSON.stringify(decoded, null, 4)
					fs.writeFile(`./src/game/genshin/dump/${seed_id}.json`, jsonString, (err: any) => {
						if (err) {
							console.error(err)
							return
						}
						console.log("Save dump file...1")
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
			plog.error(error)
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
			var data: any[] = []
			if (version) {
				// grab version only
			} else {
				// get all version
				// TODO: save and load by datebase
				// TODO: add android & ios

				// Load by file json (PC)
				const file_version = "./src/web/public/json/genshin/version/archive"
				fs.readdirSync(file_version).forEach((cn: any) => {
					var file_cn = path.join(file_version, cn)
					fs.readdirSync(file_cn).forEach((cn2: any) => {
						var x = path.join(file_cn, cn2)
						let jsonData = readJSON(x)
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
			plog.error(error)
			return {
				msg: "Error Get",
				code: 302
			}
		}
	}
}

export class GSDispatch {
	private domain_public: string
	private log: Logger

	constructor(d: string, l: Logger) {
		this.domain_public = d
		this.log = l
		this.start()
	}

	public start(): void {
		this.log.info(`Dispatch URL: ${this.domain_public}`)
	}

	public async GET_LIST_REGION(version: string = "", raw: boolean = false, chost: string = "") {
		try {
			const region_list: RegionSimpleInfo[] = []
			Config.server.forEach((item) => {
				if (item.game == 1) {
					if (contains(version, item.version)) {
						var dispatchUrl = `${this.domain_public}/query_cur_region/${item.name}`
						if (!isEmpty(chost)) {
							dispatchUrl = `${chost}/query_cur_region/${item.name}`
						}
						if (!isEmpty(item.dispatchUrl)) {
							dispatchUrl = item.dispatchUrl
						}
						const regionSimpleInfo1 = RegionSimpleInfo.create({
							dispatchUrl: dispatchUrl,
							type: "DEV_PUBLIC",
							name: item.name,
							title: item.title
						})
						region_list.push(regionSimpleInfo1)
					}
				}
			})

			if (region_list.length == 0) {
				this.log.warn(`Someone is trying to access version ${version} with no support list`)
				var dispatchUrl = `${this.domain_public}/query_cur_region/not_found`
				const regionSimpleInfo1 = RegionSimpleInfo.create({
					dispatchUrl: dispatchUrl,
					type: "DEV_PUBLIC",
					name: "not_found",
					title: "YuukiPS - Update Game Client"
				})
				region_list.push(regionSimpleInfo1)
			}

			let config_custom = {
				sdkenv: version.includes("CN") ? "0" : "2",
				checkdevice: version.includes("CN") ? true : false,
				loadPatch: false,
				showexception: false,
				regionConfig: "pm|fk|add",
				downloadMode: 0
			}

			//log.debug(config_custom)

			const toaddquery = QueryRegionListHttpRsp.create({
				regionList: region_list,
				clientSecretKey: ec2b.ec2b,
				clientCustomConfigEncrypted: ec2b.cipher(Buffer.from(JSON.stringify(config_custom), "utf8")),
				enableLoginPc: true
			})

			//const buffer = QueryRegionListHttpRsp.encode(toaddquery).finish()
			return Buffer.from(QueryRegionListHttpRsp.encode(toaddquery).finish()).toString("base64")
		} catch (error) {
			this.log.error({ name: "GET_LIST_REGION", error: error })
			return {
				msg: "Error Get",
				code: 302
			}
		}
	}
	public async GET_DATA_REGION(name: string = "", seed: string = "", key: number = 5, version: string = "") {
		try {
			if (!key) {
				return API.NO_VERSION_CONFIG()
			}

			//log.debug(`Client Key: ${key}`)

			const dispatchData = Config.server.find(
				(r) => r.name == name && contains(version, r.version) == true && r.game == 1
			)

			let dataObj: QueryCurrRegionHttpRsp

			if (dispatchData !== undefined) {
				// found config

				var dispatchUrl = `${this.domain_public}`
				let reg = RegionInfo.fromPartial({
					gateserverIp: dispatchData.ip,
					gateserverPort: dispatchData.port,
					secretKey: ec2b.ec2b,
					payCallbackUrl: `${dispatchUrl}/`,
					feedbackUrl: `${dispatchUrl}/`,
					bulletinUrl: `${dispatchUrl}/`,
					handbookUrl: `${dispatchUrl}/`,
					officialCommunityUrl: `https://discord.yuuki.me/`,
					userCenterUrl: `${dispatchUrl}/`,
					accountBindUrl: `${dispatchUrl}/`,
					cdkeyUrl: `${dispatchUrl}/api/key/hk4e/`,
					privacyPolicyUrl: `${dispatchUrl}/`
				})

				// res data
				let j = readJSON(`./src/game/genshin/dump/${seed}.json`) as QueryCurrRegionHttpRsp
				if (j.regionInfo !== undefined) {
					reg.resourceUrl = j.regionInfo.resourceUrl
					reg.dataUrl = j.regionInfo.dataUrl
					reg.resourceUrlBak = j.regionInfo.resourceUrlBak

					reg.clientDataVersion = j.regionInfo.clientDataVersion
					reg.clientDataMd5 = j.regionInfo.clientDataMd5

					reg.clientSilenceDataVersion = j.regionInfo.clientSilenceDataVersion
					reg.clientSilenceDataMd5 = j.regionInfo.clientSilenceDataMd5

					reg.resVersionConfig = j.regionInfo.resVersionConfig
					reg.nextResVersionConfig = j.regionInfo.nextResVersionConfig

					reg.clientSilenceVersionSuffix = j.regionInfo.clientSilenceVersionSuffix
					reg.clientVersionSuffix = j.regionInfo.clientVersionSuffix

					reg.nextResourceUrl = j.regionInfo.nextResourceUrl
				} else {
					this.log.error(`skip ${seed}`)
				}
				//log.info(j);

				dataObj = QueryCurrRegionHttpRsp.fromPartial({
					regionInfo: reg
					/* not work in 3.7 ?
					clientSecretKey: ec2b.ec2b,
					regionCustomConfigEncrypted: ec2b.cipher(
						Buffer.from(
							JSON.stringify({
								coverSwitch: [8],
								perf_report_config_url: `${dispatchUrl}/config/verify`,
								perf_report_record_url: `${dispatchUrl}/dataUpload`,
							})
						)
					),
					*/
				})
			} else {
				// not found config (TODO: add multi lang)
				dataObj = QueryCurrRegionHttpRsp.fromPartial({
					retcode: 20,
					msg: `Server ${name} does not support ${version} version, Use another server or update game client!. if you believe this is an error that shouldn't be happening please send this id or screenshot to discord support (SEED: ${seed})`,
					forceUdpate: {
						forceUpdateUrl: "https://ps.yuuki.me"
					}
				})
			}

			return RSAUtils.encryptAndSign(QueryCurrRegionHttpRsp.encode(dataObj).finish(), key.toString())
		} catch (error) {
			this.log.error(error)
			return API.NO_VERSION_CONFIG()
		}
	}
}

export default API
