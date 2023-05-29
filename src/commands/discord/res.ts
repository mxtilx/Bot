/**
 * @format
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty } from "../../util/library"
import Config from "../../util/config"
import Logger from "../../util/logger"

// API Discord
import { CommandInteraction, SlashCommandBuilder, InteractionReplyOptions } from "discord.js"

// API Yuuki
import Control from "../gm/control"
import API_HOYO from "../../game/hoyolab/api"
import API_GS from "../../game/genshin/api"
import API_SR from "../../game/starrails/api"

const log = new Logger("RES-CMD")

const cmd = new SlashCommandBuilder()
	.setName("res")
	.setDescription("Get debug res")
	.addStringOption((option) => option.setName("seed").setDescription("Seed ID").setRequired(true))
	.addStringOption((option) => option.setName("version").setDescription("Game Version").setRequired(true))
	.addStringOption((option) => option.setName("game").setDescription("Game ID, 1=GS 2=SR").setRequired(true))

async function run(interaction: CommandInteraction) {
	const baseReply: InteractionReplyOptions = { ephemeral: true } // shit

	try {
		let set_seed_id = interaction.options.get("seed")?.value?.toString() ?? ""
		let set_version = interaction.options.get("version")?.value?.toString() ?? ""
		let set_game = interaction.options.get("game")?.value?.toString() ?? ""

		let id_user = interaction.user.id

		await interaction.deferReply(baseReply)
		await sleep(2)

		if (set_game == "1") {
			var d_gs = await API_GS.RES(set_version, set_seed_id)

			if (
				d_gs.data == undefined ||
				d_gs.data.regionInfo == undefined ||
				d_gs.data.regionInfo.resVersionConfig == undefined
			) {
				return await interaction.editReply({
					content: d_gs.msg,
					...baseReply
				})
			}

			var da = `			
			cfResource.add(
				new Resource(
					"${set_version}",
					"${d_gs.data.regionInfo.resourceUrl}",
					"${d_gs.data.regionInfo.dataUrl}",
					"${d_gs.data.regionInfo.resourceUrlBak}",
					${JSON.stringify(d_gs.data.regionInfo.clientDataVersion)},
					${JSON.stringify(d_gs.data.regionInfo.clientSilenceDataVersion)},
					"${d_gs.data.regionInfo.clientDataMd5}",
					"${d_gs.data.regionInfo.clientSilenceDataMd5}",
					"${d_gs.data.regionInfo.clientVersionSuffix}",
					"${d_gs.data.regionInfo.clientSilenceVersionSuffix}",
					new ResVersionConfig(
						${d_gs.data.regionInfo.resVersionConfig.version},
						${JSON.stringify(d_gs.data.regionInfo.resVersionConfig.md5)},
						"${d_gs.data.regionInfo.resVersionConfig.releaseTotalSize}",
						"${d_gs.data.regionInfo.resVersionConfig.versionSuffix}",
						"${d_gs.data.regionInfo.resVersionConfig.branch}"
					),
					new ResVersionConfig(0, " ", " ", " ", " "),
					""
				)
			);			
			`
			return await interaction.editReply({
				content: `\`\`\`\n${da}\n\`\`\``,
				...baseReply
			})
		} else if (set_game == "2") {
			var d_sr = await API_SR.RES(set_version, set_seed_id)

			if (d_sr.code != 200) {
				await interaction.editReply({
					content: d_sr.msg,
					...baseReply
				})
				return
			}

			if (d_sr.data == undefined) {
				return await interaction.editReply({
					content: d_sr.msg,
					...baseReply
				})
			}

			return await interaction.editReply({
				content: `Found asset file: ${d_sr.data.AssetBundleVersionUpdateUrl} ,for complete file check dump folder.`,
				...baseReply
			})
		} else {
			return interaction.editReply({
				content: `No found game`,
				...baseReply
			})
		}
	} catch (err) {
		log.error(err as Error)
		return await interaction.editReply({
			content: "Unknown error",
			...baseReply
		})
	}
}

let _
export default _ = {
	process: run,
	command: cmd
}
