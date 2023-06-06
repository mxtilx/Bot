/** @format */

import * as fs from "fs"
import getEvents, { findEvent } from "../events/eventHandler"

import Constants from "./constants"

export function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, 1000 * ms)
	})
}
export function timestr(time: number) {
	const currentTimeInSeconds = Math.floor(Date.now() / 1000)
	const timeDifferenceInSeconds = currentTimeInSeconds - time

	const days = Math.floor(timeDifferenceInSeconds / 86400)
	const hours = Math.floor((timeDifferenceInSeconds % 86400) / 3600)
	const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60)
	const seconds = timeDifferenceInSeconds % 60

	const formatTime = (value: number, unit: string) => {
		return value > 0 ? `${value} ${unit}${value === 1 ? "" : "s"}` : ""
	}

	const formattedTime = [
		formatTime(days, "day"),
		formatTime(hours, "hour"),
		formatTime(minutes, "minute"),
		formatTime(seconds, "second")
	]
		.filter((timeStr) => timeStr !== "")
		.join(" ")

	return `${formattedTime} ago`
}
export function isEmpty(str: string | any[]) {
	return str == undefined || !str || str.length === 0
}
export function contains(target: any, pattern: any[]) {
	var value = 0
	pattern.forEach(function (word: any) {
		value = value + target.includes(word)
	})
	return value === 1
}
export function contains2(target: any, pattern: any[]) {
	var value = 0
	pattern.forEach(function (word: any) {
		if (target == word) {
			value = 1
		}
	})
	return value === 1
}

export function clientTypeFromClientId(clientId: number): string {
	const clientType = Constants.ClientType

	if (clientId in clientType) {
		return clientType[clientId]
	}

	return "UNKNOWN: " + clientId
}

export function generateSEOTitle(slug: string) {
	const words = slug.split("-")
	const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
	const seoTitle = capitalizedWords.join(" ")
	return seoTitle
}

export function bitsToGigabytes(bits: number) {
	return (bits / (8 * 1024 * 1024 * 1024)).toFixed(3)
}

export function bytesToGigabytes(bytes: number) {
	return (bytes / (1024 * 1024 * 1024)).toFixed(3)
}

export function readFileAsync(filePath: string): Promise<any> {
	return new Promise<any>((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(JSON.parse(data))
			}
		})
	})
}

export async function registerEvent(event: string, ...args: any) {
	const events = await getEvents()
	const eventFunc = findEvent(events, event)
	//log.debug(`${event} was called`)
	if (eventFunc) await eventFunc(...args)
}