/** @format */

import * as fs from "fs"

import Constants from "./constants"

export function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, 1000 * ms)
	})
}
export function timestr(time: number) {
	const currentTimeInSeconds = Math.floor(Date.now() / 1000)
	const timeDifferenceInSeconds = currentTimeInSeconds - time
	return timeDifferenceInSeconds < 60
		? `${timeDifferenceInSeconds} seconds ago`
		: timeDifferenceInSeconds < 3600
		? `${Math.floor(timeDifferenceInSeconds / 60)} minutes ${timeDifferenceInSeconds % 60} seconds ago`
		: timeDifferenceInSeconds < 86400
		? `${Math.floor(timeDifferenceInSeconds / 3600)} hours ${Math.floor(
				(timeDifferenceInSeconds % 3600) / 60
		  )} minutes ${timeDifferenceInSeconds % 60} seconds ago`
		: `${Math.floor(timeDifferenceInSeconds / 86400)} days ${Math.floor(
				(timeDifferenceInSeconds % 86400) / 3600
		  )} hours ${Math.floor((timeDifferenceInSeconds % 3600) / 60)} minutes ${
				timeDifferenceInSeconds % 60
		  } seconds ago`
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
