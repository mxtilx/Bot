/** @format */

import acfg from "acfg"

export default acfg({
	profile: [
		{
			name: "prod",
			title: "YuukiPS",
			url: {
				public: "https://ps.yuuki.me",
				private: "http://localhost:10010"
			},
			port: {
				public: 443,
				private: 10010
			},
			startup: {
				sync: true,
				web: true,
				bot: true,
				datebase: true
			},
			debug: {
				web: false,
				bot: false,
				level: 1
			}
		},
		{
			name: "dev",
			title: "YuukiPS DEV",
			url: {
				public: "http://2.0.0.100:10010",
				private: "http://localhost:10010"
			},
			port: {
				public: 10010,
				private: 10010
			},
			startup: {
				sync: false,
				web: true,
				bot: false,
				datebase: true
			},
			debug: {
				web: true,
				bot: true,
				leve1: 6
			}
		}
	],
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
	]
})
