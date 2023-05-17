/** @format */

import axios from "axios"
import fs from "fs"

import { ServerDispatchData, RegionSimpleInfo, QueryRegionListHttpRsp } from './proto/schema';

export async function RES(version = "OSPRODWin1.0.5", seed_id = "495e8edf66", audio_lang = 2) {
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
		var decoded = ServerDispatchData.decode(content);
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
}
export async function GET_LIST_SERVER(raw = false) {
	try {

		const region_list = []
		const regionSimpleInfo1 = RegionSimpleInfo.create({
			dispatchUrl: "http://localhost:10010/query_gateway",
			envType: "2",
			name: "sr-gc1",
			title: "YuukiPS SR"
		})
		region_list.push(regionSimpleInfo1)

		const regionSimpleInfo2 = RegionSimpleInfo.create({
			dispatchUrl: "http://localhost:10010/query_gateway",
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
}

