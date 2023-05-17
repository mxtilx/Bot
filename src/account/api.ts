/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty } from "../lib";
import Config from '../util/config';
import Logger from "../util/logger";

// API Yuuki
const log = new Logger("ACCOUNT");

import { MongoClient, Filter,ObjectId } from 'mongodb';

interface Login {
	message: string;
	retcode: number;
	data: Data | null;
}

interface Data {
	account: Account;
}

interface Account {
	uid: ObjectId;
	name: string;
	token: string;
}

export const Accounts = {
	// This is a database for Communication with all games and related to account links with discord and including to perform cmd with passwords
	GET_ACCOUNT_SERVER: async function (email = "", password = "") {
		try {
			return {
				msg: "Testing",
				code: 404
			}
		} catch (error: any) {
			log.error("GET_ACCOUNT_SERVER", error)
			return {
				msg: "Error Get",
				code: 302
			}
		}
	},
	// This is a database created by GC and cannot be modified, so maybe it's better to create a separate datebase?
	GET_ACCOUNT_GC: async function (username: string = "", password: string = "", game: string = "hk4e", type: number = 1) {
		// type = 1 for login username and 2 for login sessionKey for gs and token for sr?
		var data = {} as Login // tmp
		try {
			// TODO: use mode pooling?
			const client = new MongoClient(
				`mongodb://${Config.AccountDbold.user}:${Config.AccountDbold.password}@${Config.AccountDbold.host}:${Config.AccountDbold.port}`
			)
			try {
				await client.connect()

				const database = client.db(Config.AccountDbold.database)
				const collection = database.collection("accounts")

				let query: Filter<import("mongodb").Document>;
				if (type === 2) {
					query = { id: username, token: password };
				} else {
					query = { username: username };
				}

				const d = await collection.findOne(query)

				// debug
				log.info(d as any)

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
									name: d.username,									
									token: d.token
								}
							}
						}
					} else if (game == "hkrpg") {
						data = {
							retcode: 0,
							message: "OK",
							data: {
								account: {
									uid: d._id, // uid acc
									name: d.username,
									token: d.token,
								}
							}
						}
					} else {
						data = {
							data: null,
							retcode: 1,
							message: "Where are you stuck?"
						}
					}
				} else {
					data = {
						data: null,
						retcode: 1,
						message: "This account is not registered, please create an account"
					}
				}
			} catch (error) {
				log.error(error as Error, true)
				data = {
					data: null,
					retcode: 1,
					message: "Database failed to connect, try again (1)"
				}
			} finally {
				await client.close()
				return data
			}
		} catch (error) {
			log.error(error as Error, true)
			return {
				retcode: 1,
				message: "Database failed to connect, try again (0)"
			}
		}
	}
}

export default Accounts;