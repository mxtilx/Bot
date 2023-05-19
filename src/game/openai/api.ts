/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { contains, isEmpty } from "../../util/library";
import ConfigR from '../../util/config';
import Logger from "../../util/logger";
import { NodeSSH } from 'node-ssh';

const log = new Logger("OpenAI");

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

export default _;