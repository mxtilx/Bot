/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty } from "../../util/library";
import Config from '../../util/config';
import Logger from "../../util/logger";

// API Yuuki
const log = new Logger("ACCOUNT");

const db_url = `mongodb://${Config.AccountDbold.user}:${Config.AccountDbold.password}@${Config.AccountDbold.host}:${Config.AccountDbold.port}`;

let db_name_acc = 'accounts';

import { MongoClient, Filter, ObjectId } from 'mongodb';

interface Login {
	message: string;
	retcode: number;
	data: Data | null;
}

interface Data {
	account: APILogin;
}

interface APILogin {
	uid: string;
	name: string;
	token: string;
}

interface AccountDB {
	_id: string;
	username: string;
	password: string;
	email: string;
	reservedPlayerId: number;
	token: string;
	sessionKey: string;
	permissions: string[];
	locale: string;
	banEndTime: number;
	banStartTime: number;
	banReason: string;
	isBanned: boolean;
	kickReason: string;
	kickCodeReason: number;
	isKick: boolean;
	tokenAPI: string;
}

function generateToken(length: number): string {
	const characters = '0123456789abcdef';
	let token = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		token += characters[randomIndex];
	}

	return token;
}

function validateUsername(username: string): boolean {
	const pattern = /^[\p{L}\p{N}]{3,50}$/u;
	return pattern.test(username);
}

function validateEmail(email: string): boolean {
	const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/u;
	return pattern.test(email);
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
	CREATE_ACCOUNT_GC: async function (username: string = "", password: string = "", uid: string = "") {

		const client = new MongoClient(db_url);
		var data = {} as Login // tmp

		if (!validateUsername(username)) {
			if (!validateEmail(username)) {
				return {
					data: null,
					retcode: 1,
					message: `UsernameInvaild`
				}
			}
		}

		password = "" // no password for tmp

		try {
			await client.connect();

			const database = client.db(Config.AccountDbold.database);
			const collection = database.collection<AccountDB>(db_name_acc);

			// Check if the username is already taken
			const existingAccountUsername = await collection.findOne({ username: username });
			if (!existingAccountUsername) {

				if (isEmpty(uid)) {
					const lastAccount = await collection.findOne({}, { sort: { $natural: -1 } });
					let lastId = 0;
					if (lastAccount) {
						//console.log(lastAccount)
						log.debug(`last acc ${lastAccount._id} with username ${lastAccount.username}`)
						lastId = parseInt(lastAccount._id);
					}
					uid = (lastId + 1).toString();
					/*
					let isDuplicateId = true;
					while (isDuplicateId) {
						uid = Math.round(Math.random() * 50000).toString();
						const existingAccount = await collection.findOne({ _id: uid });
						if (!existingAccount) {
							isDuplicateId = false;
						}
					}
					*/
				}

				const existingAccount = await collection.findOne({ _id: uid });
				if (!existingAccount) {

					const token1 = generateToken(64);
					const token2 = generateToken(64);

					const dc: AccountDB = {
						_id: uid,
						username: username,
						reservedPlayerId: 0,
						token: token1,
						sessionKey: token2,
						permissions: [],
						locale: "en_US",
						banEndTime: 0,
						banStartTime: 0,
						isBanned: false,
						kickCodeReason: 0,
						isKick: false,
						password: password,
						email: "",
						banReason: "",
						kickReason: "",
						tokenAPI: ""
					};

					//log.debug(dc)

					const result = await collection.insertOne(dc);
					if (result.insertedId) {
						log.info(`Account ${username} has been created with id ${result.insertedId}`)
						data = {
							retcode: 0,
							message: "AccountCreated",
							data: {
								account: {
									uid: uid, // uid acc
									name: username,
									token: token1,
								}
							}
						}
					} else {
						log.info(`Account ${username} failed to create`)
						console.log(result);
						data = {
							data: null,
							retcode: 1,
							message: `AccountFailed`
						}
					}
				} else {
					data = {
						data: null,
						retcode: 1,
						message: `UsernameAlready`
					}
				}
			} else {
				data = {
					data: null,
					retcode: 1,
					message: `UsernameAlready1.`
				}
			}
		} catch (error) {
			log.error(error);
			data = {
				data: null,
				retcode: 1,
				message: "Databasefailed1"
			}
		} finally {
			await client.close();
			return data
		}
	},
	// This is a database created by GC and cannot be modified, so maybe it's better to create a separate datebase?
	GET_ACCOUNT_GC: async function (username: string = "", password: string = "", game: string = "hk4e", type: number = 1) {
		// type = 1 for login username and 2 for login sessionKey for gs and token for sr?
		var data = {} as Login // tmp

		if (!validateUsername(username)) {
			if (!validateEmail(username)) {
				return {
					data: null,
					retcode: 1,
					message: `UsernameInvaild`
				}
			}
		}

		try {
			// TODO: use mode pooling?
			const client = new MongoClient(db_url)
			try {
				await client.connect()

				const database = client.db(Config.AccountDbold.database)
				const collection = database.collection(db_name_acc)

				let query: any;
				if (type === 2) {
					query = { _id: username, token: password };
				} else {
					query = { username: username };
				}

				const d = await collection.findOne(query)

				// debug
				//log.debug(d)
				//log.debug(query)

				// about sessionKey is temporary for gacha

				if (d) {
					if (game == "hk4e") {
						data = {
							message: "LoginOK",
							retcode: 0,
							data: {
								account: {
									uid: (d._id).toString(),
									name: d.username,
									token: d.token
								}
							}
						}
					} else if (game == "hkrpg") {
						data = {
							retcode: 0,
							message: "LoginOK",
							data: {
								account: {
									uid: (d._id).toString(), // uid acc
									name: d.username,
									token: d.token,
								}
							}
						}
					} else {
						data = {
							data: null,
							retcode: 1,
							message: "NoGame"
						}
					}
				} else {
					if (type == 1) {
						if (Config.autoAccount) {
							data = await this.CREATE_ACCOUNT_GC(username, password)
							console.log(data)
						} else {
							data = {
								data: null,
								retcode: 1,
								message: "errorcreateaccount"
							}
						}
					} else {
						data = {
							data: null,
							retcode: 1,
							message: "UnableToLogin"
						}
					}
				}
			} catch (error) {
				log.error(error)
				data = {
					data: null,
					retcode: 1,
					message: "Databasefailed1"
				}
			} finally {
				await client.close()
				return data
			}
		} catch (error) {
			log.error(error)
			return {
				retcode: 1,
				message: "Databasefailed0"
			}
		}
	}
}

export default Accounts;