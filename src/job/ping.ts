/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { contains, isEmpty, timestr } from "../util/library";
import ConfigR from '../util/config';
import Logger from "../util/logger";
import { NodeSSH } from 'node-ssh';
import { setIntervalAsync, clearIntervalAsync } from "set-interval-async"

import Control from "../commands/gm/control";

import { parentPort } from "worker_threads"

const log = new Logger("PING");

const regex_ram = /\((\d+\.\d+)%\)/

// send msg
var tmp_cek: any[] = []
var last_msg: any[] = []
function send(raw: { content: any; embeds?: { type: string; title: string; description: string; color: number; fields: { name: string; value: string }[]; footer: { text: string } }[] }, id: any) {
	var found = last_msg.findIndex((el) => el.id === id)
	var toadd = false
	var tosend = false
	var nowtime = new Date()
	var msg_now = raw.content

	if (found !== -1) {
		var old_msg = last_msg[found]
		if (old_msg) {
			if (old_msg.msg == msg_now) {
				return
			}

			var msgadd = ""

			var old_time = old_msg.date.getTime() / 1000

			msgadd = `${msg_now} (${timestr(old_time)})`

			msg_now = msgadd

			log.info("Update: " + old_msg.msg + " == " + msgadd + " ")

			// Update raw data
			raw.content = msg_now

			// Update msg & time
			last_msg[found].msg = msg_now
			last_msg[found].date = nowtime

			tosend = true
		} else {
			toadd = true
			log.info("nani")
		}
	} else {
		toadd = true
		tosend = true
	}
	if (toadd) {
		last_msg.push({
			id: id,
			msg: msg_now,
			date: nowtime
		})
	}
	if (tosend) {
		log.info("SEND: " + raw)
		if (parentPort !== null) {
			parentPort.postMessage({
				type: "msg",
				data: raw
			})
		}
	}
}

// type restart
async function restart(mnt_type: string | number, mnt_name: any, id_server: any, mnt_service: any) {
	if (mnt_type == 1) {
		// Restart Container
		let d = await Control.SH(`docker restart ${mnt_name}`, id_server)
		log.info(d)
	} else if (mnt_type == 2) {
		// Restart Process in Container
		let d = await Control.SH(`docker container exec ${mnt_name} pkill -9 ${mnt_service}`, id_server)
		log.info(d)
	} else {
		log.error("unknown restart: " + mnt_type)
	}
}

// check server every 10 seconds
setIntervalAsync(async () => {
	let d = await Control.Server()
	var total_online = 0
	d.data.forEach(async function (i: { id: any; name: any; server: { player: any; ram: any; cpu: any; online: any; startup: any; monitor: any } }) {
		//log.info(i);
		var id_server = i.id
		var server_name = i.name
		var player_online = i.server.player

		total_online = total_online + player_online

		var found = tmp_cek.findIndex((el) => el.id === id_server)
		if (found !== -1) {
			var ram_usg_raw = i.server.ram
			var cpu_usg_raw = i.server.cpu
			var is_online = i.server.online
			var is_startup = i.server.startup

			let timeupinsec = Math.floor(Date.now() / 1000) - parseInt(is_startup)

			// cek log msg
			var found_msg = last_msg.findIndex((el) => el.id === id_server)
			if (found_msg !== -1) {
				var old_msg = last_msg[found_msg]
				if (old_msg) {
					// get time by msg
					var old_time = old_msg.date.getTime() / 1000
					timeupinsec = Math.floor(Date.now() / 1000) - old_time

					//console.log(`${timeupinsec} - ${id_server}`);
				}
			}

			var stats = [
				{
					type: "rich",
					title: `${server_name}`,
					description: "",
					color: 0xc31815,
					fields: [
						{
							name: `RAM`,
							value: `${ram_usg_raw}`
						},
						{
							name: `CPU`,
							value: `${cpu_usg_raw}`
						},
						{
							name: `Up Time`,
							value: `${timestr(is_startup)}`
						},
						{
							name: `Player Online`,
							value: `${player_online}`
						}
					],
					footer: {
						text: `Stats Server`
					}
				}
			]

			// Check Only Online
			if (is_online) {
				if (timeupinsec >= 300) {
					// Monitor
					var mnt = i.server.monitor
					if (mnt) {
						// check config max
						var mnt_max = mnt.max
						var mnt_type = mnt.type
						var mnt_name = mnt.name
						var mnt_service = mnt.service
						if (mnt_max) {
							// Check RAM
							if (mnt_max.ram >= 1) {
								var get_ram = ram_usg_raw.match(regex_ram)
								if (get_ram) {
									const new_ram = parseFloat(get_ram[1])
									if (new_ram >= mnt_max.ram) {
										send(
											{
												content: `Server reaches memory limit, send command to restart server`,
												embeds: stats
											},
											id_server
										)
										log.info(`RestartTES2: ${timeupinsec} sec`)
										await restart(mnt_type, mnt_name, id_server, mnt_service)
									} else {
										//log.info(`Monitor ${id_server}: ${new_ram} | LIMIT RAM ${mnt_max.ram}`);
									}
								} else {
									log.info(`SKIP 3: ${ram_usg_raw} `)
								}
							} else {
								//log.info(`SKIP RAM...`)
							}

							// CPU
							if (mnt_max.cpu >= 1) {
								const new_cpu = parseFloat(cpu_usg_raw)
								if (new_cpu >= mnt_max.cpu) {
									send(
										{
											content: `Server too busy, send command to restart server`,
											embeds: stats
										},
										id_server
									)
									log.info(`RestartTES1: ${timeupinsec} sec`)
									await restart(mnt_type, mnt_name, id_server, mnt_service)
								} else {
									// is_startup = raw date time
									//log.info(`Monitor ${id_server}: ${new_cpu} | LIMIT CPU ${mnt_max.cpu} | TimeUP ${timeupinsec} (${lib.timestr(is_startup)})`);
								}
							} else {
								//log.info(`SKIP CPU...`)
							}
						} else {
							log.info(`SKIP 1`)
						}
					} else {
						log.info(`SKIP 2`)
					}
				} else {
					// Don't monitor if it restarts too early...
					//log.info(`SKIP TOO FAST: ${timeupinsec} sec`);
				}
			}

			//Check previous comparisons online
			var old = tmp_cek[found]
			if (is_online !== old.server.online) {
				if (is_online) {
					send(
						{
							content: `Server ${server_name} back online`
						},
						id_server
					)
				} else {
					send(
						{
							content: `Server ${server_name} down.`
						},
						id_server
					)
				}
			}

			// Update
			tmp_cek[found] = i
		} else {
			// Add
			tmp_cek.push(i)
		}
	})

	// send stats online
	if (parentPort !== null) {
		parentPort.postMessage({
			type: "bot_stats",
			data: `${total_online} people`
		})
	}
}, 1000 * 10)
