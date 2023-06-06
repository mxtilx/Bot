/** @format */

import "colorts/lib/string"

export enum VerboseLevel {
	NONE = 0, // No logging except for errors
	INFO = 1, // No logging except for errors
	WARNS = 2, // Log warns
	ALL = 3, // Warns and (useless) debug
	VERBL = 4, // Warns, debug and verbose
	VERBH = 5 // Warns, debug, verbose and very verbose (thanks copilot this is so funny)
}

type Color =
	| "red"
	| "green"
	| "yellow"
	| "blue"
	| "magenta"
	| "cyan"
	| "white"
	| "gray"
	| "black"
	| "italic"
	| "bold"
	| "underline"
	| "strikethrough"
	| "inverse"
	| "bgRed"
	| "bgGreen"
	| "bgYellow"
	| "bgBlue"
	| "bgMagenta"
	| "bgCyan"
	| "bgWhite"
	| "bgBlack"
	| "bgGray"
	| "bgItalic"

export default class Logger {
	public static VERBOSE_LEVEL: VerboseLevel = 3

	constructor(public name: string, public color: Color = "blue") {
		this.name = name
		this.color = color
	}

	private getDate(): string {
		return new Date().toLocaleTimeString()
	}

	private raw(...args: string[]) {
		// @ts-ignore - Element implicitly has an 'any' type because index expression is not of type 'number'
		console.log(`[${this.getDate().white.bold}] <${this.name[this.color].bold}>`, ...args)
	}

	public log(...args: string[]) {
		this.raw(...args)
	}

	public trail(...args: any[]) {
		console.log(`\t↳ ${args.join(" ").gray}`)
	}

	public info(e: any, stack: boolean = true) {
		//console.log(typeof e);
		if (typeof e === "string")
			return console.log(`[${this.getDate().white.bold}] ${`INFO<${this.name}>`.green.bold}`, e)
		if (typeof e === "object")
			return console.log(`[${this.getDate().white.bold}] ${`INFO<${this.name}>`.green.bold}`, e)
		//console.log(`[${this.getDate().white.bold}] ${`INFO<${this.name}>`.bgRed.bold}`, e.message);
		//if (e.stack && stack) this.trail(e.stack);
	}

	public error(e: any, stack: boolean = true) {
		if (typeof e === "string") {
			e = new Error(e)
		} else {
			// tmp for testing
			console.log(typeof e)
		}
		console.log(`[${this.getDate().white.bold}] ${`ERROR<${this.name}>`.bgRed.bold}`, e.message || e)
		if (e.stack && stack) {
			this.trail(e.stack)
		}
	}

	public warn(...args: string[]) {
		if (Logger.VERBOSE_LEVEL < VerboseLevel.WARNS) return
		console.log(`[${this.getDate().white.bold}] ${`WARN<${this.name}>`.bgYellow.bold}`, ...args)
	}

	public debug(...args: any) {
		if (Logger.VERBOSE_LEVEL < VerboseLevel.ALL) return
		//console.log(`[${this.getDate().white.bold}] ${`DEBUG<${this.name}>`.bgBlue.bold}`, ...args);
		if (typeof args === "string")
			return console.log(`[${this.getDate().white.bold}] ${`DEBUG<${this.name}>`.bgBlue.bold}`, args)
		if (typeof args === "object")
			return console.log(`[${this.getDate().white.bold}] ${`DEBUG<${this.name}>`.bgBlue.bold}`, args)
		//this.trail(new Error().stack!.split('\n').slice(2).join('\n'));
	}

	public verbL(...args: any) {
		if (Logger.VERBOSE_LEVEL < VerboseLevel.VERBL) return
		console.log(`[${this.getDate().white.bold}] ${`VERBL<${this.name}>`.bgCyan.bold}`, ...args)
		this.trail(new Error().stack!.split("\n").slice(2).join("\n"))
	}

	public verbH(...args: any) {
		if (Logger.VERBOSE_LEVEL < VerboseLevel.VERBH) return
		console.log(`[${this.getDate().white.bold}] ${`VERBH<${this.name}>`.bgCyan.bold}`, ...args)
		this.trail(new Error().stack!.split("\n").slice(2).join("\n"))
	}
}
