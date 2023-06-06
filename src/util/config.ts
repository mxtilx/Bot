/** @format */

import acfg from "acfg"

export default acfg({
	debug: {
		web: false,
		bot: false,
		leve1: 1
	},
	api: {
		hcaptcha: {
			key: ""
		},
		characterai: {
			key: ""
		},
		openai: {
			key: ""
		},
		discord: {
			token: "",
			client_id: "",
			client_secret: "",
			guild_id: "",
			password: {
				admin: [""],
				guest: [""]
			},
			permission: {
				admin: "",
				mod: [""],
				guest: [""],
				member: [""]
			},
			webhook: {
				stats: {
					id: "",
					token: ""
				}
			}
		}
	},
	autoAccount: true,
	accountDB: {
		host: "",
		port: 1,
		user: "",
		password: "",
		database: "",
		type: 1
	},
	accountDBOld: {
		host: "",
		port: 1,
		user: "",
		password: "",
		database: "",
		type: 1
	},
	server: [
		{
			name: "",
			title: "",
			ip: "",
			port: 1,
			type: 1,
			game: 1,
			version: ["3.6.0"],
			public: true,
			dispatchUrl: "",
			api: {
				url: "",
				type: 1,
				password: ""
			},
			gameDB: {
				host: "",
				port: 1,
				user: "",
				password: "",
				database: "gio",
				type: 2
			},
			ssh: {
				port: 1,
				username: "",
				password: ""
			},
			monitor: {
				name: "",
				service: "",
				type: 1,
				max: {
					autorestart: false,
					ram: 0,
					cpu: 0
				}
			}
		}
	],
	startup: {
		webserver: true,
		bot: true,
		datebase: true
	}
})
