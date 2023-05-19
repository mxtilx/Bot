/** @format */

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
				)} hours ${Math.floor((timeDifferenceInSeconds % 3600) / 60)} minutes ${timeDifferenceInSeconds % 60
				} seconds ago`
}
export function isEmpty(str: string | any[]) {
	return !str || str.length === 0
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
