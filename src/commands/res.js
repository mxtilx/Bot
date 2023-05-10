/** @format */

const { SlashCommandBuilder, CommandInteraction } = require("discord.js")

const log = require("../util/logger")

const api_genshin = require("../game/genshin/api")
const api_starrails = require("../game/starrails/api")

const lib = require("../lib")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("res")
		.setDescription("Get debug res")
		.addStringOption((option) => option.setName("seed").setDescription("Seed ID").setRequired(true))
		.addStringOption((option) => option.setName("version").setDescription("Game Version").setRequired(true))
		.addStringOption((option) => option.setName("game").setDescription("Game ID, 1=GS 2=SR").setRequired(true)),
	/**
	 * @param {CommandInteraction} interaction
	 * @returns {void}
	 */
	async execute(interaction) {
		try {
			let set_seed_id = interaction.options.getString("seed")
			let set_version = interaction.options.getString("version")
			let set_game = interaction.options.getString("game")

			let id_user = interaction.user.id

			interaction.reply({ content: "Please wait...", ephemeral: true })

			await lib.sleep(2)

			let d = ""
			if (set_game == "1") {
				d = await api_genshin.RES(set_version, set_seed_id)
			} else if (set_game == "2") {
				d = await api_starrails.RES(set_version, set_seed_id)
			} else {
				return interaction.editReply({
					content: `No found game`,
					ephemeral: true
				})
			}

			var raw = JSON.stringify(d)
			console.log(raw)

			if (d.code != 200) {
				await interaction.editReply({
					content: d.msg,
					ephemeral: true
				})
				return
			}

			if (set_game == "1") {
				var da = `			
			cfResource.add(
				new Resource(
					"${set_version}",
					"${d.data.regionInfo.resourceUrl}",
					"${d.data.regionInfo.dataUrl}",
					"${d.data.regionInfo.resourceUrlBak}",
					${JSON.stringify(d.data.regionInfo.clientDataVersion)},
					${JSON.stringify(d.data.regionInfo.clientSilenceDataVersion)},
					"${d.data.regionInfo.clientDataMd5}",
					"${d.data.regionInfo.clientSilenceDataMd5}",
					"${d.data.regionInfo.clientVersionSuffix}",
					"${d.data.regionInfo.clientSilenceVersionSuffix}",
					new ResVersionConfig(
						${d.data.regionInfo.resVersionConfig.version},
						${JSON.stringify(d.data.regionInfo.resVersionConfig.md5)},
						"${d.data.regionInfo.resVersionConfig.releaseTotalSize}",
						"${d.data.regionInfo.resVersionConfig.versionSuffix}",
						"${d.data.regionInfo.resVersionConfig.branch}"
					),
					new ResVersionConfig(0, " ", " ", " ", " "),
					""
				)
			);			
			`
				return await interaction.editReply({
					content: `\`\`\`\n${da}\n\`\`\``,
					ephemeral: true
				})
			} else if (set_game == "2") {
				return await interaction.editReply({
					content: `Found asset file: ${d.data._AssetBundleVersionUpdateUrl} ,for complete file check dump folder.`,
					ephemeral: true
				})
			} else {
				return await interaction.editReply({
					content: `idk`,
					ephemeral: true
				})
			}
		} catch (err) {
			log.error(err)
			return await interaction.editReply({ content: "Unknown error", ephemeral: true })
		}
	}
}
