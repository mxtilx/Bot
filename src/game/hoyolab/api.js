/** @format */

//const config = require("../config.json");
//const log = require("../../util/logger")
const axios = require("axios")

function getPotentialCodes(searchResult) {
	const regex = /[A-Z0-9]{8,}/g
	const regexResult = searchResult.match(regex)
	//log.debug("HoyolabApiClient", "Potential codes", "Substrings", regexResult)
	const uppercaseRegex = /[A-Z]+/
	const potentialCodes = regexResult.filter((str) => uppercaseRegex.exec(str))
	//log.debug("HoyolabApiClient", "Potential codes", "Result", potentialCodes)
	return potentialCodes
}

module.exports = {
	// TODO: INFO USER SIMPEL: https://api-account-os.hoyoverse.com/account/binding/api/getUserGameRolesByCookieToken?lang=en&region=os_asia&game_biz=hk4e_global&sLangKey=en-us
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
	ClaimRedeem: async function (uid = 0, region = "os_asia", key = "", game = "hk4e", ck_token = "", ck_acc_id = "") {
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
		if (r.retcode == 0) {
			// OK
			r = r.data.msg
			// idk about special_shipping
			// -2011 level 10, -2017 use
		} else {
			r = r.message
		}
		return {
			retcode: r.retcode,
			message: r
		}
	}
}
