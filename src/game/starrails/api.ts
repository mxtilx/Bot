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
import axios from "axios"
import fs from "fs"

// Proto
import { ServerDispatchData, RegionSimpleInfo, QueryRegionListHttpRsp } from "./proto/schema"

import { Ec2bKey, RSAUtils } from "../../game/hoyolab/crypto"

const log = new Logger("GAME-API-SR")

let hostname = ""
let port = 0
let protocol = ""

export const _ = {
	initserver(h: string, p: number, uh: string) {
		hostname = h
		port = p
		protocol = uh
		log.info(`set dispatch url sr: ${uh}://${h}:${p} `)
	},

	NO_VERSION_CONFIG() {
		return `CAESGE5vdCBGb3VuZCB2ZXJzaW9uIGNvbmZpZxoA`
	},

	RES: async function (version = "OSPRODWin1.0.5", seed_id = "495e8edf66", audio_lang = 2) {
		try {
			/*
	
			OSPRODWin1.0.5 | 495e8edf66
			
			*/

			var platform = 1
			if (version.includes("Android")) {
				platform = 2
			} else if (version.includes("Win")) {
				platform = 3
			}

			var server = "prod-official-asia-dp01.starrails.com"

			// TODO CN
			if (version.includes("CN")) {
				server = "prod-official-cht-dp01.starrails.com"
				// prod-official-eur-dp01.starrails.com
				// prod-official-usa-dp01.starrails.com
				// prod-official-asia-dp01.starrails.com
				// prod-official-cht-dp01.starrails.com
			}

			let url = `https://${server}/query_gateway?version=${version}&language_type=${audio_lang}&binary=1&platform_type=${platform}&channel_id=1&sub_channel_id=1&dispatch_seed=${seed_id}&is_need_url=1&uid=1`

			console.log("URL: " + url)

			const response = await axios.get(url, {
				timeout: 1000 * 10
			})
			const d = response.data
			//console.log(d)

			let content = Buffer.from(d, "base64")
			var decoded = ServerDispatchData.decode(content)
			if (decoded) {
				//save dump
				const jsonString = JSON.stringify(decoded, null, 4)
				fs.writeFile(`./src/game/starrails/dump/${seed_id}.json`, jsonString, (err: any) => {
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
		} catch (error) {
			//log.error(error)
			return {
				msg: "Error Get",
				code: 302
			}
		}
	},
	GET_LIST_SERVER: async function (raw = false) {
		try {
			const region_list = []
			const regionSimpleInfo1 = RegionSimpleInfo.create({
				dispatchUrl: "http://2.0.0.100:10010/query_gateway",
				envType: "2",
				name: "sr-gc1",
				title: "YuukiPS SR"
			})
			region_list.push(regionSimpleInfo1)

			const regionSimpleInfo2 = RegionSimpleInfo.create({
				dispatchUrl: "http://2.0.0.100:10010/query_gateway",
				envType: "2",
				name: "sr-gc2",
				title: "MelonPS SR"
			})
			region_list.push(regionSimpleInfo2)

			const toaddquery = QueryRegionListHttpRsp.create({
				regionList: region_list
			})

			const buffer = QueryRegionListHttpRsp.encode(toaddquery).finish()

			return Buffer.from(buffer).toString("base64")
		} catch (error) {
			console.log(error)
			// TODO: check if error
			return {
				msg: "Error Get",
				code: 302
			}
		}
	},
	GET_DATA_REGION: async function (name: string = "", seed: string = "", key: number = 5, version: string = "") {
		try {
			if (!key) {
				return this.NO_VERSION_CONFIG()
			}

			//log.debug(`Client Key: ${key}`)

			//const dispatchData = Config.server.find(r => r.name == name && contains(version, r.version) == true)

			const dataObj = ServerDispatchData.fromPartial({
				_AssetBundleVersionUpdateUrl:
					"https://autopatchos.starrails.com/asb/V1.0Live/output_4186973_52d0b74c56",
				_LuaBundleVersionUpdateUrl: "https://autopatchos.starrails.com/lua/V1.0Live/output_4135247_48f4e37838",
				enableDesignDataBundleVersionUpdate: true,
				_DesignDataBundleVersionUpdateUrl:
					"https://autopatchos.starrails.com/design_data/V1.0Live/output_4188516_478ae5483e",
				name: "YuukiSR",
				port: 22102,
				enableAssetBundleVersionUpdate: true,
				host: "2.0.0.100",
				onlineReplayUploadUrl: "https://prod-official-asia-upload01.starrails.com/upload_replay",
				redeemCodeUrl: "https://sg-hkrpg-api.hoyoverse.com/common/apicdkey/api",
				luaPatchVersion: "4135247",
				officialCommunityUrl:
					"https://act.hoyoverse.com/sr/event/ob-combine-page/index.html?game_biz=hkrpg_global&sign_type=2&auth_appid=e20230216socialpage&authkey_ver=1&gamebrowser=1&mode=fullscreen",
				loginWhiteMsg: "星穹列車將於2023/04/26 10:00（UTC+8）啟程，請開拓者耐心等待～",
				kMJAFDLEPOH:
					"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",
				eventTrackingOpen: true,
				temporaryMaintenanceUrl: "https://m.hoyolab.com/toBBS.html?game_id=6",
				iFixPatchRevision: "4186933",
				_IFixPatchVersionUpdateUrl: "https://autopatchos.starrails.com/ifix/V1.0Live/output_4186933_fbdb7f24b2",
				customServiceUrl:
					"https://webstatic-sea.hoyoverse.com/csc-service-center-fe/index.html?sign_type=2&auth_appid=csc&authkey_ver=1&win_direction=portrait&page_id=11",
				onlineReplayDownloadUrl: "https://downloadjp.starrails.com/replay/prod_official_asia"
			} as ServerDispatchData)

			let rsp
			try {
				rsp = ServerDispatchData.encode(dataObj).finish()
			} catch {
				rsp = ServerDispatchData.encode(
					ServerDispatchData.fromPartial({
						stopBeginTime: Date.now(),
						stopEndTime: Date.now() * 2
					})
				).finish()
			}

			return Buffer.from(rsp).toString("base64")
		} catch (error) {
			log.error(error as Error)
			return this.NO_VERSION_CONFIG()
		}
	}
}

export default _
