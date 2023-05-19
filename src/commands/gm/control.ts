/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { contains, isEmpty } from "../../util/library";
import ConfigR from '../../util/config';
import Logger from "../../util/logger";
import { NodeSSH } from 'node-ssh';

// API Yuuki
import GC from "../gm/gc";
import GIO from "../gm/gio";

const log = new Logger("GM-Control");

interface ListServer {
	name: string;
	id: string;
	server: DataServer;
}

interface DataServer {
	online: boolean;
	player: number;
	game: any;
	version: any;
	public: any;
	monitor: any;
	cpu: string;
	ram: string;
	startup: string;
	commit: string;
	sub: string;
}

// TODO: better use datebase
let key = []
// Thank you ChatGPT
let cache_serverlist: { [x: string]: string | ListServer[] | number | undefined; cache: any; data: any; msg?: any; code?: any; };

export const _ = {

	Config: async function (server_id: string) {
		// check id server
		if (server_id) {
			//console.log("shit",server_id)
			var g_config = ConfigR.server.find((server) => server.name == server_id);
			if (!g_config) {
				const string_list_server = ConfigR.server.map((server) => server.name).join(", ");
				return {
					msg: `Config (${server_id}) not found, try another like: ${string_list_server}`,
					code: 404
				}
			}
		} else {
			return {
				msg: "Need id server",
				code: 404
			}
		}
		return {
			msg: "OK",
			code: 200,
			data: g_config
		}
	},
	GM: async function (server_id: any, uid: any, cmd: any, code: any) {
		try {
			if (isEmpty(cmd)) {
				log.info(`ID ${server_id} | UID ${uid} | SPAM....`)
				return {
					msg: "SPAM!!!!",
					code: 302
				}
			}

			log.info(`ID ${server_id} | UID ${uid} | CMD ${cmd} | CODE ${code}`)

			// stop spam
			if (contains(cmd, ["item add all", "clear all", "quest clear all"])) {
				return {
					msg: "This command is temporarily blocked by admin",
					code: 403
				}
			}

			// Emergency, todo: we should have added password to public command only
			if (contains(cmd, ["account", "stop"])) {
				return {
					msg: "This command can only be accessed by admin",
					code: 403
				}
			}

			// check uid
			if (!uid) {
				return {
					msg: "no uid",
					code: 301
				}
			}
			// check cmd
			if (!cmd) {
				return {
					msg: "no cmd",
					code: 301
				}
			}

			// check server
			var configis = await this.Config(server_id)
			if (configis.code != 200) {
				return {
					msg: configis.msg,
					code: configis.code
				} // maybe it's better to take it safe
			}

			if (configis.data == undefined) {
				return {
					msg: "No Found config server2",
					code: 404
				}
			}

			if (configis.data.api.type == 1) {
				// GIO
				return await GIO.GM(configis.data.api.url, uid, cmd)
			} else if (configis.data.api.type == 2) {
				// GC
				let pass = configis.data.api.password // token public
				if (pass && pass != "") {
					code = pass
				}
				return await GC.GM(configis.data.api.url, uid, cmd, code)
			} else {
				return {
					msg: "No Found config server1",
					code: 404
				}
			}
		} catch (error) {
			log.error(error as Error)
			return {
				msg: "Error Get",
				code: 302
			}
		}
	},
	Server: async function (server_id: string = "") {
		var obj = ConfigR.server

		if (cache_serverlist && Date.now() < cache_serverlist.cache) {
			cache_serverlist["msg"] = "OK but cache"
			if (server_id) {
				return cache_serverlist.data.find((j: { id: any; }) => j.id == server_id)
			}
			return cache_serverlist
		}

		const r = await Promise.all(
			Object.keys(obj).map(async (key, index) => {

				var d = obj[index]

				var o = {
					online: false,
					player: 0,
					game: d.game,
					version: d.version,
					public: d.public,
					monitor: d.monitor, // This should be private data?
					cpu: "???",
					ram: "???",
					startup: "???",
					commit: "???",
					sub: "???",
				}

				var server_live = false

				try {
					if (d.api.type == 1) {
						var ts = await GIO.Server(d.api.url)
						if (ts !== undefined && ts.data !== undefined && ts.code == 200) {
							o["online"] = true
							o["player"] = ts.data.online
							o["sub"] = ts.data.server
							server_live = true
						}
					} else if (d.api.type == 2) {
						var ts1 = await GC.Server(d.api.url)
						if (ts1.code == 0) {
							o["online"] = true
							o["player"] = ts1.data.playerCount
							if (ts1.data.MemoryCurrently) {
								//console.log(ts.data);
								// 3.482GiB / 4GiB (87.04%)
								var gb = (ts1.data.MemoryCurrently / 1024).toFixed(3)
								var maxgb = (ts1.data.MemoryMax / 1024).toFixed(3)
								var pgb = ((ts1.data.MemoryCurrently / ts1.data.MemoryMax) * 100).toFixed(2)
								o["ram"] = `${gb}GiB / ${maxgb}GiB (${pgb}%)`
							}
							if (ts1.data.DockerGS) {
								o["commit"] = ts1.data.DockerGS
							}
							server_live = true
						}
					}

					if (server_live && d.monitor && d.monitor.name != "") {
						// TODO: add monitor in app
						let stats = await this.SH(
							`docker stats --format "{{ json . }}" --no-stream ${d.monitor.name}`,
							d.name
						)
						if (stats.code == 200) {
							const objstats = JSON.parse(stats.msg)

							// 1 = monitor container, 2 = monitor app
							if (d.monitor.type == 1) {
								// get startup container (cache data time if not restart yet)
								let startup = await this.SH(
									`date -u -d "$(docker inspect -f '{{.State.StartedAt}}' ${d.monitor.name})" +'%s'`,
									d.name
								)
								if (startup.code == 200) {
									o["startup"] = startup.msg // raw only
								}
							} else if (d.monitor.type == 2) {
								// get startup app in container
								let startup = await this.SH(
									`date -u -d "$(docker container exec ${d.monitor.name} ps -A -o comm,lstart | grep ${d.monitor.service} | awk '{print $(NF-3)" "$(NF-2)" "$(NF-1)" "$NF}')" +%s`,
									d.name
								)
								if (startup.code == 200) {
									o["startup"] = startup.msg // raw only
								}
							} else {
								console.log("idk")
							}

							var pre_ram = objstats["MemPerc"]
							o["cpu"] = objstats["CPUPerc"]
							o["ram"] = objstats["MemUsage"] + " (" + pre_ram + ")"
						} else {
							//log.error(stats)
						}
					}
				} catch (error) {
					log.error(error as Error)
				}

				var tmp: ListServer = {
					name: d.title,
					id: d.name,
					server: o
				};

				return tmp
			})
		)

		// fetch data from external source
		cache_serverlist = {
			data: r,
			msg: "OK but update",
			code: 200,
			cache: Date.now() + 10 * 1000 // 10 sec
		}
		if (server_id) {
			return cache_serverlist.data.find((j: { id: any; }) => j.id == server_id)
		}

		return cache_serverlist
	},
	SH: async function (raw: string, server_id: string, timeout: number = 30) {

		// check server
		var configis = await this.Config(server_id)
		if (configis.code != 200) {
			return {
				msg: configis.msg,
				code: configis.code
			}
		}

		var dt = configis.data

		if (dt == undefined) {
			return {
				msg: "SH NOT FOUND",
				code: 404
			}
		}

		const password = dt.ssh.password;
		const ssh = new NodeSSH();

		let result: { stdout: string; stderr: string } | undefined;

		try {

			await ssh.connect({
				host: dt.ip,
				username: dt.ssh.username,
				port: dt.ssh.port,
				password,
				tryKeyboard: true,
			});

			try {
				const commandPromise = ssh.execCommand(raw, { cwd: '.' });
				const timeoutPromise = new Promise<{ stdout: string; stderr: string }>((_, reject) => {
					setTimeout(() => {
						reject(new Error('Command execution timeout'));
					}, 1000 * timeout); // Command execution timeout duration of 5 seconds
				});

				result = await Promise.race([commandPromise, timeoutPromise]);
			} finally {
				ssh.dispose();
			}

			if (result && result.stderr) {
				return {
					msg: result.stderr,
					code: 404
				};
			} else if (result && result.stdout) {
				return {
					msg: result.stdout,
					code: 200
				};
			} else {
				return {
					msg: 'Unknown response',
					code: 500
				};
			}
		} catch (error) {
			log.error(error as Error);
			if (error instanceof Error) {
				if (error.message === 'Command execution timeout') {
					log.warn(`sh "${raw}" timeout in server ${server_id}`)
					return {
						msg: 'Command execution timeout',
						code: 408
					};
				}
			}
			return {
				msg: 'Error SH',
				code: 301
			};
		}

	},
	Verified: async function (tes: any) {
		/*
				   if (!set_code) {
					   // find id user in key
					   var found_user = key.find((j) => j.id === itme);
					   var time_expiry = Date.now() + 5 * 60 * 1000;
					   if (!found_user) {
						   var my_code = Math.floor(Math.random() * 100000);
						   key.push({
							   id: itme,
							   code: my_code,
							   expiry: time_expiry,
							   verification: false
						   });
						   // TODO: add time_expiry
						   var input = await api_gio.Mail(uid, "Verification Code", "YuukiPS", null, "Your verification code is: " + my_code);
						   if (input.code == 200) {
							   return await interaction.editReply({ content: `A mail has been sent please check in-game`, ephemeral: true });
						   } else {
							   return await interaction.editReply({ content: `Error send mail, msg: ${input.msg}, code: ${input.code}`, ephemeral: true });
						   }
					   } else {
						   let index_me = key.map(function (x) { return x.id; }).indexOf(itme);
						   if (!key[index_me].verification == true) {
							   return await interaction.editReply({ content: `Verification code has been sent, please check your in-game mail`, ephemeral: true });
						   } else {
							   await interaction.editReply({ content: `Previously you have been verified, so continue checking command`, ephemeral: true });
						   }
					   }
				   } else {
					   var found_user_code = key.find((j) => j.id === itme && j.code == set_code);
					   if (!found_user_code) {
						   return await interaction.editReply({ content: `Incorrect Verification Code`, ephemeral: true });
					   } else {
						   await interaction.editReply({ content: `Yay you have been verified, after that you don't need to type the code again, just make sure only this account can access commands on the account in-game`, ephemeral: true });
	   
						   // update verification
						   let index_me = key.map(function (x) { return x.id; }).indexOf(itme);
						   key[index_me].verification = true;
	   
					   }
				   }
				   */
	}
}

export default _;