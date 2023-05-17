import { readFileSync, readdirSync, writeFileSync } from "fs";
import { resolve } from 'path';
import { VerboseLevel } from './logger';

const DEFAULT_CONFIG = {
    token: "",
    clientId: "",
    guildId: "",
    password: [""],
    id_admin: "",
    id_mod: [""],
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
    webhook: {
        stats: {
            id: "",
            token: ""
        }
    },
    server: [
        {
            name: "",
            title: "",
            ip: "",
            port: "1",
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
                port: "",
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
        }],
    startup: {
        webserver: true,
        bot: true,
        datebase: true
    }
}

type DefaultConfig = typeof DEFAULT_CONFIG;

function r(...args: string[]) {
    return readFileSync(resolve(__dirname, ...args)).toString();
}

function rd(...args: string[]) {
    return readdirSync(resolve(__dirname, ...args)).toString();
}

function readConfig(): any {
    let config: DefaultConfig;
    try {
        config = JSON.parse(r('../config.json'));
        //console.log(config)
        // Check if config object.keys is the same as DEFAULT_CONFIG.keys
        const missing = Object.keys(DEFAULT_CONFIG).filter(key => !config.hasOwnProperty(key));

        if (missing.length > 0) {
            missing.forEach(key => {
                // @ts-ignore
                config[key] = DEFAULT_CONFIG[key];
            });
            updateConfig(config);
            console.log(`Added missing config keys: ${missing.join(', ')}`);
        }
    } catch {
        console.error("Could not read config file. Creating one for you...");
        config = DEFAULT_CONFIG;
        //updateConfig(config);
    }
    return config;
}

function updateConfig(config: any) {
    writeFileSync('./config.json', JSON.stringify(config, null, 2));
}

export default class Config {
    public static config = readConfig();

    public static token: string = Config.config.token;
    public static clientId: string = Config.config.clientId;
    public static guildId: string = Config.config.guildId;
    public static password: string[] = Config.config.password;
    public static id_admin: string = Config.config.id_admin;
    public static id_mod: string = Config.config.id_mod;

    public static accountDB: {
        host: string
        port: number
        user: string
        password: string
        database: string
        type: number
    } = Config.config.accountDB;
    public static AccountDbold: {
        host: string
        port: number
        user: string
        password: string
        database: string
        type: number
    } = Config.config.accountDBOld;

    public static webhook: {
        stats: {
            id: string
            token: string
        }[]
    } = Config.config.webhook;


    public static server: {
        name: string
        title: string
        ip: string
        port: string
        type: number
        game: number
        version: string[]
        public: boolean
        dispatchUrl: string
        api: {
            url: string
            type: number
            password: string
        }
        gameDB: {
            host: string
            port: number
            user: string
            password: string
            database: string
            type: number
        }
        ssh: {
            port: number
            username: string
            password: string
        }
        monitor: {
            name: string
            service: string
            type: number
            max: {
                autorestart: boolean
                ram: number
                cpu: number
            }
        }
    }[] = Config.config.server;

    public static Startup: {
        webserver: boolean
        bot: boolean
        datebase: boolean
    } = Config.config.startup;

    private constructor() { }
    /*
    token: string
    clientId: string
    guildId: string
    password: string[]
    id_admin: string
    id_mod: string[]
    accountDB: AccountDb
    accountDBOld: AccountDbold
    webhook: Webhook
    server: Server[]
    startup: Startup
    */
}