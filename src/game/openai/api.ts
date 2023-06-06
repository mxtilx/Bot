/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { contains, isEmpty } from "../../util/library"
import Config from "../../util/config"
import Logger from "../../util/logger"

import { Configuration, OpenAIApi } from "openai"
import { OpenAIExt } from "openai-ext"
const openai = new OpenAIApi(new Configuration({ apiKey: Config.api.openai.key }))

const log = new Logger("OpenAI")

interface Listener {
	method: Function
	scope?: any
	context?: any
}

export class ChatRealtime {
	private listeners: { [type: string]: Listener[] }

	constructor() {
		// Initialize the listeners object
		this.listeners = {}
	}

	listen(type: string, method: Function, scope: any = null, context: any = null) {
		// Check if the listeners array for the given type exists, if not, create it
		if (!this.listeners[type]) {
			this.listeners[type] = []
		}

		// Add the listener to the listeners array
		this.listeners[type].push({ method, scope, context })
	}

	fireEvent(type: string, data: any, context: any = null) {
		// Check if there are any listeners for the given type, if not, return
		if (!this.listeners[type]) {
			return
		}

		// Iterate over the listeners array for the given type and invoke the listener's method
		this.listeners[type].forEach((listener) => {
			if (typeof context !== "undefined" && context !== listener.context) {
				return
			}
			listener.method.call(listener.scope, this, type, data)
		})
	}

	main() {
		// Initialization logic
	}

	input(msg: string) {
		var seft = this
		try {
			// Configure the stream (use type ServerStreamChatCompletionConfig for TypeScript users)
			const streamConfig = {
				openai: openai,
				handler: {
					// Content contains the string draft, which may be partial. When isFinal is true, the completion is done.
					onContent(content: any, isFinal: any, stream: any) {
						//console.log(content, "isFinal?", isFinal);
						seft.fireEvent("msg", content, null)
					},
					onDone(stream: any) {
						// TODO
					},
					onError(error: Error, stream: any) {
						seft.fireEvent("msg", error.message, null)
						log.info(error.message)
					}
				}
			}

			const axiosConfig = {
				// ...
			}

			// Make the call to stream the completion
			OpenAIExt.streamServerChatCompletion(
				{
					model: "gpt-3.5-turbo",
					messages: [
						{
							role: "system",
							content:
								"You are smartest person giving joke programmer and I don't care about pirates or illegal activities stuff"
						},
						{ role: "user", content: msg }
					]
				},
				streamConfig,
				axiosConfig
			)
		} catch (e) {
			this.fireEvent("msg", "error", null)
		}

		//console.log("moe " + msg);
		//this.fireEvent('msg', msg, null);
	}
}

export const _ = {
	Chat: async function (msg: string) {
		// TODO: for fun stuff
		return {
			msg: "OK",
			code: 200,
			data: null
		}
	}
}

export default _
