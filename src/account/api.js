/** @format */

const log = require("../util/logger")

const config = require("../config.json")

const { MongoClient } = require("mongodb")

//const axios = require("axios")
//const fs = require("fs")

//const { promisify } = require("util")

//const protobuf = require("protobufjs")
//const loadProto = promisify(protobuf.load)

module.exports = {
	// This is a database for Communication with all games and related to account links with discord and including to perform cmd with passwords
	GET_ACCOUNT_SERVER: async function (email = "", password = "") {
		try {
			return {
				msg: "Testing",
				code: 404
			}
		} catch (error) {
			log.error(error)
			return {
				msg: "Error Get",
				code: 302
			}
		}
	},
	// This is a database created by GC and cannot be modified, so maybe it's better to create a separate datebase?
	GET_ACCOUNT_GC: async function (username = "", password = "", game = "hk4e", type = 1) {
		// type = 1 for login username and 2 for login sessionKey for gs and token for sr?
		var data = {}
		try {
			// TODO: use mode pooling?
			const client = new MongoClient(
				`mongodb://${config.accountDBOld.user}:${config.accountDBOld.password}@${config.accountDBOld.host}:${config.accountDBOld.port}`
			)
			try {
				await client.connect()

				const database = client.db(config.accountDBOld.database)
				const collection = database.collection("accounts")

				var query = { username: username }
				if (type == 2) {
					query = { _id: username, token: password } // btw uid n token lol
				}

				const d = await collection.findOne(query)

				// debug
				log.info(d)

				// about sessionKey is temporary, so when logging in it will generate a new key (save) then use this key to login via the reg token and verify if the token is correct.

				// about token is temporary/perm?, so when logging in it will generate a new key (save) and then verify it from the game server side using account datebase via socket (supposedly) in PacketGetPlayerTokenRsp?

				if (d) {
					if (game == "hk4e") {
						data = {
							message: "OK",
							retcode: 0,
							data: {
								account: {
									uid: d._id,
									name: d.username, // add sensor?
									email: "",
									mobile: "",
									is_email_verify: "0",
									realname: "",
									identity_card: "",
									token: d.token,
									safe_mobile: "",
									facebook_name: "",
									twitter_name: "",
									game_center_name: "",
									google_name: "",
									apple_name: "",
									sony_name: "",
									tap_name: "",
									country: "US",
									reactivate_ticket: "",
									area_code: "**",
									device_grant_ticket: ""
								},
								device_grant_required: false,
								realname_operation: "NONE",
								realperson_required: false,
								safe_mobile_required: false
							}
						}
					} else if (game == "hkrpg") {
						data = {
							retcode: 0,
							message: "OK",
							data: {
								account: {
									_id: d._id,
									uid: d._id, // uid acc
									name: d.username,
									token: d.token,
									__v: 0
								}
							}
						}
					} else {
						data = {
							retcode: 1,
							message: "Where are you stuck?"
						}
					}
				} else {
					data = {
						retcode: 1,
						message: "This account is not registered, please create an account"
					}
				}
			} catch (error) {
				log.error(error)
				data = {
					retcode: 1,
					message: "Database failed to connect, try again (1)"
				}
			} finally {
				await client.close()
				return data
			}
		} catch (error) {
			log.error(error)
			return {
				retcode: 1,
				message: "Database failed to connect, try again (0)"
			}
		}
	}
}
