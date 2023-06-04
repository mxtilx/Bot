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
import { ServerDispatchData, RegionSimpleInfo, QueryRegionListHttpRsp, ServerDispatchDataCBT2 } from "./proto/schema"

import { Ec2bKey, RSAUtils } from "../../game/hoyolab/crypto"

const log = new Logger("GAME-API-SR")

let hostname = ""
let port = 0
let protocol = ""

interface Region {
	dispatch_url: string
	env_type: string
	title: string
	name: string
}

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
	GET_LIST_REGION: async function (version = "", raw = false, chost: string = "") {
		try {
			let region_list: RegionSimpleInfo[] = []
			let region_listCBT: Region[] = []

			// Extract the version number using regex
			const versionRegex = /(\d+\.\d+\.\d+)/
			const match = version.match(versionRegex)
			const versionNumber = match ? match[1] : ""

			// Check if the version number is less than 0.70.0
			let encode = versionNumber < "0.70.0"

			//console.log(versionNumber) // Output: 0.70.0
			//console.log(isUnder070) // Output: false

			Config.server.forEach((item) => {
				if (item.game == 2) {
					if (contains(version, item.version)) {
						var dispatchUrl = `${protocol}://${hostname}:${port}/query_gateway/${item.name}`
						if (!isEmpty(chost)) {
							dispatchUrl = `${chost}/query_gateway/${item.name}`
						}
						if (!isEmpty(item.dispatchUrl)) {
							dispatchUrl = item.dispatchUrl
						}

						if (encode) {
							const regionSimpleInfo1 = RegionSimpleInfo.create({
								dispatchUrl: dispatchUrl,
								envType: "DEV_PUBLIC",
								name: item.name,
								title: item.title
							})
							region_list.push(regionSimpleInfo1)
						} else {
							region_listCBT.push({
								dispatch_url: dispatchUrl,
								env_type: "2",
								title: item.name, // id server
								name: item.title // REAL TITLE LOL
							})
						}
					}
				}
			})

			var dispatchUrl = `${protocol}://${hostname}:${port}/query_gateway/not_found`
			if (encode) {
				if (region_list.length == 0) {
					const regionSimpleInfo1 = RegionSimpleInfo.create({
						dispatchUrl: dispatchUrl,
						envType: "DEV_PUBLIC",
						name: "not_found",
						title: "YuukiPS - Update Game Client"
					})
					region_list.push(regionSimpleInfo1)
				}
			} else {
				if (region_listCBT.length == 0) {
					region_listCBT.push({
						dispatch_url: dispatchUrl,
						env_type: "2",
						title: "not_found", // id server
						name: "YuukiPS - Update Game Client" // REAL TITLE LOL
					})
				}
			}

			if (encode) {
				// CBT3 + REL?
				const toaddquery = QueryRegionListHttpRsp.create({
					regionList: region_list
				})
				const buffer = QueryRegionListHttpRsp.encode(toaddquery).finish()
				return Buffer.from(buffer).toString("base64")
			} else {
				// CBT2
				return {
					region_list: region_listCBT,
					retcode: 0
				}
			}
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

			const dispatchData = Config.server.find(
				(r) => r.name == name && contains(version, r.version) == true && r.game == 2
			)

			let dataObjCBT2: ServerDispatchDataCBT2

			if (dispatchData !== undefined) {
				dataObjCBT2 = ServerDispatchDataCBT2.fromPartial({
					retcode: 0,
					msg: "OK",
					regionName: dispatchData.name,
					ip: dispatchData.ip,
					port: dispatchData.port,
					serverDescription: dispatchData.title,
					exResourceUrl: "https://ps.yuuki.me/asb/design",
					dataUseAssetBoundle: false,
					resUseAssetBoundle: false,
					assetBundleUrl: "https://ps.yuuki.me/asb"
				} as ServerDispatchDataCBT2)
			} else {
				dataObjCBT2 = ServerDispatchDataCBT2.fromPartial({
					retcode: 20,
					msg: `Server ${name} does not support ${version} version, Use another server or update game client!. if you believe this is an error that shouldn't be happening please send this id or screenshot to discord support (SEED: ${seed})`,
					customServiceUrl: "https://ps.yuuki.me"
				})
			}

			return Buffer.from(ServerDispatchDataCBT2.encode(dataObjCBT2).finish()).toString("base64")
		} catch (error) {
			log.error(error as Error)
			return this.NO_VERSION_CONFIG()
		}
	}
}

export default _
