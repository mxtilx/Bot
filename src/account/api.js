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
	GET_ACCOUNT_GC: async function (username = "", password = "") {
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

				const query = { username: username }

				const d = await collection.findOne(query)

				// debug
				log.debug(d)

				if (d) {
					data = {
						retcode: 0,
						message: "OK",
						data: {
							account: {
								_id: d._id,
								uid: d._id, // uid in game?
								name: d.username,
								token: d.token,
								__v: 0
							}
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
