/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { contains, isEmpty } from "../../util/library";
import ConfigR from '../../util/config';
import Logger from "../../util/logger";
import axios from "axios";

const log = new Logger("Ayaka");

export const _ = {
	Chat: async function (msg: string = "") {
		// TODO: for fun stuff
		try {
			const characterId = "BELYJ-unxtO41wk4IYdmMnLfVVmyP8IxMZVrIWQQEk0";

			// if 403 just update cookie, TODO: update cookie by AI?

			const headers = {
				'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42`,
				'Authorization': `Token 7e550183d44422466b1f43a1376d86ee73c7a890`,
				'Content-Type': 'application/json',
				'Cookie': '__cf_bm=Emwh4RfoxPKYe2wnR0eDHg8jMEzL2qkcsDa1ugtKbIM-1684586907-0-AXxsnoKFgPAjqaH0t4WjcmIiJiCR1GAq8hWpuncCh9N+WvHk8cER95eERH4zmqk56qFpQH/2dxAYD7eXTB8PLxHlXhh1CSkBuKHFmW/wMFuq9UusBHHvfO78W8ZdJj9cU8uEhP2BE6lWqENuF5wsYhU=; messages=.eJyLjlaKj88qzs-Lz00tLk5MT1XSMdAxMtVRCi5NTgaKpJXm5FQqFGem56WmKGTmKSQWK1SWlmZnVukp6SgpxeqMah_VPqp9VPtQ0B4LAIPsqUw:1q0M0Z:ze03vmxS7cVf1QZH1Q7XgaYfD1c9q2gbdhKlImjOsbU; sessionid=u3p7hrh0vvdm7gqo4d3zsl691ks40ivs; csrftoken=T6J0GDrdzbyNNlrIvayGQ2XXMRc5jQup; __cfwaitingroom=ChhsUGNNT1BTa0k5eHlONWxqQnkvZmZ3PT0SrAJFWFJ6bHZCLzk5WjRGN0lGWDNoRzFoR0J0QUwwL1F3cURmbnE0eVg2QmdPVTF1a2g0NEQ5ekFMTktnUjdmeUFXajhyUFFzU3U4bG1Ba2V5aExoVjlxV2g5QSt4em9QcHNVams0UkZ2Skt6dDBoMmx5enJUTkxnczhBQXhNdi9Zdy9PT1NsR212VFBxTU1qa1ErbnUyREVSL1NhaDBMQmpyekhiekhCb2pZU2dFMCtYZlhEODJYc0hMYkJ1RFl4bkFjdXljS3ord084M05YN2JJbUFDc0lYNDh0US9pU3VtbjhxRTQxcElMSXVXaTNOcFVVamwxbFRpVm45M0RkSWp2MS94VlhydXhzY2hCV2VQRzJsbHUxOTZHZHJaQkdvbldRUlplSHZYazhNRT0%3D',
				'authority': `beta.character.ai`,
				'content-type': `application/json`,
				'origin': `https://beta.character.ai`,
				'referer': `https://beta.character.ai/chat?char=${characterId}`,
				'sec-ch-ua': '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
				'sec-ch-ua-mobile': `?0`,
				'sec-ch-ua-platform': "Windows",
				'sec-fetch-dest': `empty`,
				'sec-fetch-mode': `cors`,
				'sec-fetch-site': `same-origin`
			};

			const da = { "history_external_id": "UKRnnVyxa9OLANEp-gNTGEauxlv8JeMVA3ErOjhtZLM", "character_external_id": characterId, "text": msg, "tgt": "internal_id:133674:beff5766-3658-40b2-9493-ec59dc69cd4c", "ranking_method": "random", "staging": false, "model_server_address": null, "model_server_address_exp_chars": null, "override_prefix": null, "override_rank": null, "rank_candidates": null, "filter_candidates": null, "unsanitized_characters": null, "prefix_limit": null, "prefix_token_limit": null, "stream_params": null, "model_properties_version_keys": "", "enable_tti": null, "initial_timeout": null, "insert_beginning": null, "stream_every_n_steps": 16, "chunks_to_pad": 8, "is_proactive": false, "image_rel_path": "", "image_description": "", "image_description_type": "", "image_origin_type": "", "voice_enabled": false, "parent_msg_uuid": null, "seen_msg_uuids": [], "retry_last_user_msg_uuid": null, "num_candidates": 1, "give_room_introductions": true, "mock_response": false };

			var c = await axios.post(`https://beta.character.ai/chat/streaming/`, da, { headers: headers });

			//var x = JSON.stringify(c.data)

			const replies: any[] = [];

			for (const line of c.data.toString().split('\n')) {
				if (line.startsWith('{')) {
					replies.push(JSON.parse(line));
					continue;
				}

				const start = line.indexOf(' {');
				if (start < 0) continue;
				replies.push(JSON.parse(line.slice(start - 1)));
			}

			let last = replies.pop().replies.shift().text;

			log.debug(replies)

			log.log(`Chat: ${last}`);

			return {
				msg: last,
				code: 200,
			}

		} catch (error) {
			let e = error as Error;
			log.error(e);
			return {
				msg: `Error: ${e.message}`,
				code: 301,
			}
		}

	}
}

export default _;