/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

import axios from "axios";

function getPotentialCodes(searchResult: string) {
	const regex = /[A-Z0-9]{8,}/g
	const regexResult = searchResult.match(regex)
	//log.debug("HoyolabApiClient", "Potential codes", "Substrings", regexResult)
	const uppercaseRegex = /[A-Z]+/
	if (regexResult == undefined) {
		return "";
	}
	const potentialCodes = regexResult.filter((str: string) => uppercaseRegex.exec(str))
	//log.debug("HoyolabApiClient", "Potential codes", "Result", potentialCodes)
	return potentialCodes
}

export const _ = {
	// TODO:
	// https://api-account-os.hoyoverse.com/account/binding/api/getUserGameRolesByCookieToken?lang=en&region=os_asia&game_biz=hk4e_global&sLangKey=en-us
	// https://sg-hk4e-api.hoyolab.com/event/sol/info?lang=en-us&act_id=e202102251931481
	// https://bbs-api-os.hoyolab.com/community/painter/wapi/user/full?t=1684060268669
	// https://bbs-api-os.hoyolab.com/community/hyl_resource/wapi/game_version_live/live/bonus?is_latest=false&module_id=64586097f8242d07b405a3e4
	SearchRedeemCode: async function (id_game = 2) {
		// 2 or 5 for gs and 6 for sr? and 1=hk
		const url = `https://bbs-api-os.hoyolab.com/community/painter/wapi/search?game_id=${id_game}&keyword=Redeem%20Code`
		console.log("Find: " + url)
		const response = await axios.get(url, {
			timeout: 1000 * 10
		})
		const r = JSON.stringify(response.data)
		const pt = getPotentialCodes(r)
		return pt
	},
	ClaimRedeem: async function (uid:string | number = 0, region = "os_asia", key = "", game = "hk4e", ck_token = "", ck_acc_id = "") {
		// hk4e = gs, hkrpg=sr for asia prod_official_asia
		const url = `https://sg-${game}-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey?uid=${uid}&region=${region}&lang=en&cdkey=${key}&game_biz=${game}_global&sLangKey=en-us`
		console.log("Check: " + url)
		var vtoken = `cookie_token=${ck_token}; account_id=${ck_acc_id}`
		if (ck_token.includes("v2_")) {
			// new acc
			vtoken = `cookie_token_v2=${ck_token}; account_id_v2=${ck_acc_id}`
		}
		console.log("Token: " + vtoken)
		const response = await axios.get(url, {
			timeout: 1000 * 10,
			headers: {
				Cookie: vtoken
			}
		})
		var r = response.data
		console.log(r)
		var msg = ""
		if (r.retcode == 0) {
			// OK
			msg = r.data.msg
			// idk about special_shipping
			// -2011 level 10, -2017 use
		} else {
			msg = r.message
		}
		return {
			retcode: r.retcode,
			message: msg
		}
	},
	DailyCheckIn: async function (game = "hk4e", ck_token = "", ck_acc_id = "") {
		// hk4e = gs, hkrpg=sr for asia prod_official_asia
		var url = `https://sg-${game}-api.hoyolab.com/event/sol/sign`
		var real_name_game = "Genshin Impact"
		var user_call = "Traveler"
		var pages_id = "e202102251931481"
		if (game == "sr") {
			// idk why sr use this and have os?
			url = `https://sg-public-api.hoyolab.com/event/luna/os/sign`
			real_name_game = "Star Rail"
			pages_id = "e202303301540311"
			user_call = "Trailblazer"
		} else if (game == "hk") {
			// no os?
			url = `https://sg-public-api.hoyolab.com/event/mani/sign`
			real_name_game = "Honkai Impact"
			pages_id = "e202110291205111"
			user_call = "Captain"
		} else if (game == "tt") {
			// gay lol, wtf have os and use same sr aka luna?
			url = `https://sg-public-api.hoyolab.com/event/luna/os/sign`
			real_name_game = "Tears of Themis"
			pages_id = "e202202281857121"
			user_call = "Honey"
		}
		console.log("Check: " + url)
		var vtoken = `ltoken=${ck_token}; ltuid=${ck_acc_id}; cookie_token=${ck_token}; account_id=${ck_acc_id}`
		if (ck_token.includes("v2_")) {
			// new acc (seems unnecessary?)
			//vtoken = `cookie_token_v2=${ck_token}; account_id_v2=${ck_acc_id}`
		}
		console.log("Token: " + vtoken)
		const response = await axios.post(
			url,
			{
				act_id: pages_id // pages
			},
			{
				timeout: 1000 * 10,
				headers: {
					Cookie: vtoken
				}
			}
		)
		var r = response.data
		console.log(r)
		var msg = ""
		if (r.retcode == 0) {
			// OK
			msg = `Congratulations ${user_call}! You've successfully checked in today!`
			// idk about first_bind
		} else {
			msg = r.message
		}
		return {
			retcode: r.retcode,
			message: `${real_name_game} | ${msg}`
		}
	}
}
export default _;