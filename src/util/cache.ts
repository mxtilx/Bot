/** @format */

import fs from "fs"

class JSONCache {
	private filePath: string
	private data: any

	constructor(filePath: string) {
		this.filePath = filePath
		this.loadData()
	}

	private loadData() {
		try {
			const rawData = fs.readFileSync(this.filePath)
			this.data = JSON.parse(rawData.toString())
		} catch (error) {
			this.data = {}
		}
	}

	public get(key: string): any {
		const item = this.data[key]
		if (item && !this.isExpired(item.expires)) {
			return item.value
		}
		return undefined
	}

	public set(key: string, value: any, expiresInMinutes: number = 30) {
		const expires = Date.now() + expiresInMinutes * 60 * 1000
		const item = {
			value,
			expires
		}
		this.data[key] = item
		this.saveData()
	}

	public delete(key: string) {
		delete this.data[key]
		this.saveData()
	}

	private isExpired(expires: number): boolean {
		return expires < Date.now()
	}

	private saveData() {
		fs.writeFileSync(this.filePath, JSON.stringify(this.data))
	}
}

export default JSONCache
