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
import {
	RegionSimpleInfo,
	QueryRegionListHttpRsp,
	ServerDispatchDataCBT2,
	MainTenis,
	ServerDispatchDataNEW
} from "./proto/schema"

const plog = new Logger("API-SR")

interface Region {
	dispatch_url: string
	env_type: string
	title: string
	name: string
}

// Helper function to compare version numbers
function compareVersions(a: string, b: string): number {
	const versionA = a.split(".").map(Number)
	const versionB = b.split(".").map(Number)

	for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
		const numA = versionA[i] || 0
		const numB = versionB[i] || 0

		if (numA !== numB) {
			return numA - numB
		}
	}

	return 0
}

function readJSON(file: string): any {
	return JSON.parse(fs.readFileSync(file, "utf-8"))
}

export const API = {
	NO_VERSION_CONFIG() {
		return `CAESGE5vdCBGb3VuZCB2ZXJzaW9uIGNvbmZpZxoA`
	},

	RES: async function (version = "OSPRODWin1.0.5", seed_id = "495e8edf66", audio_lang = 2) {
		try {
			/*
	
			OSPRODWin1.0.5 | 495e8edf66
			OSPRODWin1.1.0 | 44744310a7
			
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
			console.log(d)

			let content = Buffer.from(d, "base64")
			var decoded = ServerDispatchDataNEW.decode(content)
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
			plog.error({ msg: "res error", error: error })
			return {
				msg: "Error Get",
				code: 302
			}
		}
	}
}

export class SRDispatch {
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

	public async GET_LIST_REGION(version = "", raw = false, chost: string = "") {
		try {
			let region_list: RegionSimpleInfo[] = []
			let region_listCBT: Region[] = []

			const versionRegex = /(\d+\.\d+\.\d+)/
			const match = version.match(versionRegex)
			const versionNumber = match ? match[1] : ""

			let encode: boolean

			if (compareVersions(versionNumber, "0.64.0") >= 0 && compareVersions(versionNumber, "1.0.5") < 0) {
				encode = false
			} else if (compareVersions(versionNumber, "1.0.5") >= 0) {
				encode = true
			} else {
				encode = false
				this.log.debug(`idk wtf ${versionNumber}`)
			}

			Config.server.forEach((item) => {
				if (item.game == 2) {
					if (contains(versionNumber, item.version)) {
						var dispatchUrl = `${this.domain_public}/query_gateway/${item.name}`
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

			// new version just stuck here?
			var mt = {
				retcode: 4,
				msg: `All Server does not support ${version} version, Update your game client! - PS.YUUKI.ME`,
				url: "https://ps.yuuki.me/game/star-rail"
			}
			if (region_list.length == 0 && encode == true) {
				return Buffer.from(MainTenis.encode(MainTenis.create(mt)).finish()).toString("base64")
			} else if (region_listCBT.length == 0 && encode == false) {
				return mt
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
	}
	public async GET_DATA_REGION(name: string = "", seed: string = "", key: number = 5, version: string = "") {
		try {
			const dispatchData = Config.server.find(
				(r) => r.name == name && contains(version, r.version) == true && r.game == 2
			)

			const versionRegex = /(\d+\.\d+\.\d+)/
			const match = version.match(versionRegex)
			const versionNumber = match ? match[1] : ""

			let isnew: boolean

			if (compareVersions(versionNumber, "0.64.0") >= 0 && compareVersions(versionNumber, "1.0.5") < 0) {
				isnew = false
			} else if (compareVersions(versionNumber, "1.0.5") >= 0) {
				isnew = true
			} else {
				isnew = false
				this.log.debug(`idk wtf ${versionNumber}`)
			}

			let dataObjCBT2: ServerDispatchDataCBT2
			let dataObjNEW: ServerDispatchDataNEW

			if (dispatchData !== undefined) {
				if (!isnew) {
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
					return Buffer.from(ServerDispatchDataCBT2.encode(dataObjCBT2).finish()).toString("base64")
				} else {

					dataObjNEW = ServerDispatchDataNEW.fromPartial({
						retcode: 0,
						msg: "OK",
						regionName: dispatchData.name,
						ip: dispatchData.ip,
						port: dispatchData.port,
						serverDescription: dispatchData.title,
						//dataUseAssetBoundle: false,
						//resUseAssetBoundle: false,
						JEGDHPFJFPG: true, // 3
						login_white_msg: "melon", // 654
						KKHJNPJMNIN: false, // 1238
						LNNIPPHEPOA: true, // 10
					} as ServerDispatchDataNEW)

					// res data
					let j = readJSON(`./src/game/starrails/dump/${seed}.json`) as ServerDispatchDataNEW
					if (j.assetBundleUrl !== undefined) {
						dataObjNEW.exResourceUrl = j.exResourceUrl // 6
						dataObjNEW.assetBundleUrl = j.assetBundleUrl // 14
						dataObjNEW.luaUrl = j.luaUrl // 4
					} else {
						this.log.error(`skip sr seed ${seed}`)
					}

					return Buffer.from(ServerDispatchDataNEW.encode(dataObjNEW).finish()).toString("base64")
				}
			} else {
				if (!isnew) {
					dataObjCBT2 = ServerDispatchDataCBT2.fromPartial({
						retcode: 20,
						msg: `idk if show it`,
						customServiceUrl: "https://ps.yuuki.me/game/star-rail"
					})
					return Buffer.from(ServerDispatchDataCBT2.encode(dataObjCBT2).finish()).toString("base64")
				} else {
					dataObjNEW = ServerDispatchDataNEW.fromPartial({
						retcode: 20,
						msg: "idk if show it"
					})
					this.log.debug(dataObjNEW)
					return Buffer.from(ServerDispatchDataNEW.encode(dataObjNEW).finish()).toString("base64")
				}
			}
		} catch (error) {
			this.log.error(error)
			return API.NO_VERSION_CONFIG()
		}
	}
}

export default API
