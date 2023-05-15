/** @format */

const log = require("../util/logger")

const api_gio = require("./gio")
const api_gc = require("./gc")

const mylib = require("../lib")
const config = require("../config.json")

const axios = require("axios")

const { NodeSSH } = require("node-ssh")

// TODO: better use datebase
let key = []
// Thank you ChatGPT
let cache_serverlist

module.exports = {
	Config: function (server_id) {
		// check id server
		if (server_id) {
			var g_config = config.server[server_id]
			if (!g_config) {
				const list_server = Object.keys(config.server)
				const string_list_server = list_server.join(", ")
				return {
					msg: "Config server not found, try another like: " + string_list_server,
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
	GM: async function (server_id, uid, cmd, code) {
		try {
			if (mylib.isEmpty(cmd)) {
				log.info(`LOG GM: ID ${server_id} | UID ${uid} | SPAM....`)
				return {
					msg: "SPAM!!!!",
					code: 302
				}
			}

			log.info(`LOG GM: ID ${server_id} | UID ${uid} | CMD ${cmd} | CODE ${code}`)

			// stop spam
			if (mylib.contains(cmd, ["item add all", "clear all", "quest clear all"])) {
				return {
					msg: "This command is temporarily blocked by admin",
					code: 403
				}
			}

			// Emergency, todo: we should have added password to public command only
			if (mylib.contains(cmd, ["account", "stop"])) {
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
			var configis = this.Config(server_id)
			if (configis.code != 200) {
				return {
					msg: configis.msg,
					code: configis.code
				} // maybe it's better to take it safe
			}

			if (configis.data.api.type == 1) {
				// GIO
				return await api_gio.GM(configis.data.api.url, uid, cmd)
			} else if (configis.data.api.type == 2) {
				// GC
				let pass = configis.data.api.password // token public
				if (pass && pass != "") {
					code = pass
				}
				return await api_gc.GM(configis.data.api.url, uid, cmd, code)
			} else {
				return {
					msg: "No Found config server1",
					code: 404
				}
			}
		} catch (error) {
			log.error(error)
			return {
				msg: "Error Get",
				code: 302
			}
		}
	},
	Server: async function (server_id) {
		var obj = config.server

		if (cache_serverlist && Date.now() < cache_serverlist.cache) {
			cache_serverlist["msg"] = "OK but cache"
			if (server_id) {
				return cache_serverlist.data.find((j) => j.id == server_id)
			}
			return cache_serverlist
		}

		const r = await Promise.all(
			Object.keys(obj).map(async (key) => {
				var tmp = {}
				var d = obj[key]

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
					commit: "???"
				}

				var server_live = false

				try {
					if (d.api.type == 1) {
						var ts = await api_gio.Server(d.api.url)
						if (ts.code == 200) {
							o["online"] = true
							o["player"] = ts.data.online
							o["sub"] = ts.data.server
							server_live = true
						}
					} else if (d.api.type == 2) {
						var ts = await api_gc.Server(d.api.url)
						if (ts.code == 0) {
							o["online"] = true
							o["player"] = ts.data.playerCount
							if (ts.data.MemoryCurrently) {
								//console.log(ts.data);
								// 3.482GiB / 4GiB (87.04%)
								var gb = (ts.data.MemoryCurrently / 1024).toFixed(3)
								var maxgb = (ts.data.MemoryMax / 1024).toFixed(3)
								var pgb = ((ts.data.MemoryCurrently / ts.data.MemoryMax) * 100).toFixed(2)
								o["ram"] = `${gb}GiB / ${maxgb}GiB (${pgb}%)`
							}
							if (ts.data.DockerGS) {
								o["commit"] = ts.data.DockerGS
							}
							server_live = true
						}
					}

					if (server_live && d.monitor && d.monitor.name != "") {
						// TODO: add monitor in app
						let stats = await this.SH(
							`docker stats --format "{{ json . }}" --no-stream ${d.monitor.name}`,
							key
						)
						if (stats.code == 200) {
							const objstats = JSON.parse(stats.msg)

							// 1 = monitor container, 2 = monitor app
							if (d.monitor.type == 1) {
								// get startup container (cache data time if not restart yet)
								let startup = await this.SH(
									`date -u -d "$(docker inspect -f '{{.State.StartedAt}}' ${d.monitor.name})" +'%s'`,
									key
								)
								if (startup.code == 200) {
									o["startup"] = startup.msg // raw only
								}
							} else if (d.monitor.type == 2) {
								// get startup app in container
								let startup = await this.SH(
									`date -u -d "$(docker container exec ${d.monitor.name} ps -A -o comm,lstart | grep ${d.monitor.service} | awk '{print $(NF-3)" "$(NF-2)" "$(NF-1)" "$NF}')" +%s`,
									key
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
							log.error(stats)
						}
					}
				} catch (error) {
					log.error(error)
				}

				tmp["name"] = d.title
				tmp["id"] = key
				tmp["server"] = o

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
			return cache_serverlist.data.find((j) => j.id == server_id)
		}

		return cache_serverlist
	},
	SH: async function (raw, server_id) {
		// check server
		var configis = this.Config(server_id)
		if (configis.code != 200) {
			return {
				msg: configis.msg,
				code: configis.code
			}
		}

		var dt = configis.data

		const password = dt.ssh.password
		const ssh = new NodeSSH()

		return ssh
			.connect({
				host: dt.ip,
				username: dt.ssh.username,
				port: dt.ssh.port,
				password,
				tryKeyboard: true
			})
			.then(async function () {
				return ssh
					.execCommand(raw, { cwd: "." })
					.then(function (result) {
						ssh.dispose()
						if (result.stderr) {
							return {
								msg: result.stdout,
								code: 404
							}
						} else {
							return {
								msg: result.stdout,
								code: 200
							}
						}
					})
					.catch(async function (rx) {
						ssh.dispose()
						log.error("Error SH1: ", rx)
						return {
							msg: "ERROR SH1",
							code: 301
						}
					})
			})
			.catch(async function (rc) {
				ssh.dispose()
				log.error(`Error SH2: Server ${server_id}`)
				log.error(rc)
				return {
					msg: "ERROR SH2",
					code: 301
				}
			})
	},
	Verified: function (tes) {
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
