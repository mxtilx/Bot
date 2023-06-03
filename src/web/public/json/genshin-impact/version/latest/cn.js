/** @format */

export default function handler(req, res) {
	res.status(200).json({
		retcode: 0,
		message: "OK",
		data: {
			game: {
				latest: {
					name: "",
					version: "3.3.0",
					path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/YuanShen_3.3.0.zip",
					size: "91278540800",
					md5: "244a119fd0397c40524f70e447706532",
					entry: "YuanShen.exe",
					voice_packs: [
						{
							language: "zh-cn",
							name: "",
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/Audio_Chinese_3.3.0.zip",
							size: "16095138282",
							md5: "17d574f54295ed263c9ed1d5c190cecf",
							package_size: "8042326261"
						},
						{
							language: "en-us",
							name: "",
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/Audio_English(US)_3.3.0.zip",
							size: "18371470950",
							md5: "1b08c6054423efae926838863f15f81c",
							package_size: "9180492595"
						},
						{
							language: "ja-jp",
							name: "",
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/Audio_Japanese_3.3.0.zip",
							size: "20518954598",
							md5: "2983486d1e88cac565cee8a7b99f25aa",
							package_size: "10254234419"
						},
						{
							language: "ko-kr",
							name: "",
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/Audio_Korean_3.3.0.zip",
							size: "15794490572",
							md5: "afee889cfbd1fe15722780f8ceaebc8d",
							package_size: "7892002406"
						}
					],
					decompressed_path:
						"https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/ScatteredFiles",
					segments: [
						{
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/YuanShen_3.3.0.zip.001",
							md5: "235541bd647a7521860a46632f59f124"
						},
						{
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/YuanShen_3.3.0.zip.002",
							md5: "389ced30adb1eee12eae57886027a2e0"
						},
						{
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/YuanShen_3.3.0.zip.003",
							md5: "4c105530cbb40c27862c62a73e475dc7"
						},
						{
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/YuanShen_3.3.0.zip.004",
							md5: "d09df0bf4f8a139c8ea51b35e27ab2ca"
						},
						{
							path: "https://autopatchcn.yuanshen.com/client_app/download/pc_zip/20221128113626_LSJsjaUDgixXmWnd/YuanShen_3.3.0.zip.005",
							md5: "1f5611aebbd6e7151a10680e9ef92959"
						}
					],
					package_size: "45634027520"
				},
				diffs: [
					{
						name: "game_3.2.0_3.3.0_hdiff_06STMj1gxyYbPCR5.zip",
						version: "3.2.0",
						path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/game_3.2.0_3.3.0_hdiff_06STMj1gxyYbPCR5.zip",
						size: "12903556292",
						md5: "1F01DB3917981A34A910C023A196049F",
						is_recommended_update: false,
						voice_packs: [
							{
								language: "zh-cn",
								name: "zh-cn_3.2.0_3.3.0_hdiff_bHVueyUkPpghlWmM.zip",
								path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/zh-cn_3.2.0_3.3.0_hdiff_bHVueyUkPpghlWmM.zip",
								size: "906774920",
								md5: "DF3E25BF5A7B8ECC02A6CDE24E181984",
								package_size: "419723913"
							},
							{
								language: "en-us",
								name: "en-us_3.2.0_3.3.0_hdiff_e8mlB7CHZADjzfNT.zip",
								path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/en-us_3.2.0_3.3.0_hdiff_e8mlB7CHZADjzfNT.zip",
								size: "1148029021",
								md5: "32918BB4020E07E772FEC9E3CC627789",
								package_size: "545625848"
							},
							{
								language: "ja-jp",
								name: "ja-jp_3.2.0_3.3.0_hdiff_ic3tp260L1nXKJoZ.zip",
								path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/ja-jp_3.2.0_3.3.0_hdiff_ic3tp260L1nXKJoZ.zip",
								size: "1093657108",
								md5: "102C9EF1C6700DC9C6105A387A3AB8E7",
								package_size: "493574191"
							},
							{
								language: "ko-kr",
								name: "ko-kr_3.2.0_3.3.0_hdiff_NAc1uE0oY8hwOgpM.zip",
								path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/ko-kr_3.2.0_3.3.0_hdiff_NAc1uE0oY8hwOgpM.zip",
								size: "870054132",
								md5: "F714095422369914CAE96ED43F0B0503",
								package_size: "406657011"
							}
						],
						package_size: "6277221755"
					},
					{
						name: "game_3.1.0_3.3.0_hdiff_4SRgOFaXu2sYxLTM.zip",
						version: "3.1.0",
						path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/game_3.1.0_3.3.0_hdiff_4SRgOFaXu2sYxLTM.zip",
						size: "19192369968",
						md5: "A56F9436F7C216E228E59729B0840EFA",
						is_recommended_update: false,
						voice_packs: [
							{
								language: "zh-cn",
								name: "zh-cn_3.1.0_3.3.0_hdiff_iytSdmXrepwgIuz5.zip",
								path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/zh-cn_3.1.0_3.3.0_hdiff_iytSdmXrepwgIuz5.zip",
								size: "2115146690",
								md5: "7DBD02F4BA56A2621D368448EDB3CE39",
								package_size: "982144330"
							},
							{
								language: "en-us",
								name: "en-us_3.1.0_3.3.0_hdiff_XMIzAtnefHDUwyQ7.zip",
								path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/en-us_3.1.0_3.3.0_hdiff_XMIzAtnefHDUwyQ7.zip",
								size: "2578172678",
								md5: "48C27A5F994BD997C25C604947681F6D",
								package_size: "1231669782"
							},
							{
								language: "ja-jp",
								name: "ja-jp_3.1.0_3.3.0_hdiff_EBRyrLujMcwXnA93.zip",
								path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/ja-jp_3.1.0_3.3.0_hdiff_EBRyrLujMcwXnA93.zip",
								size: "2622489444",
								md5: "6A5D95357110A90DEDE9567C655622C1",
								package_size: "1176846924"
							},
							{
								language: "ko-kr",
								name: "ko-kr_3.1.0_3.3.0_hdiff_reO3YkWcUEd0VKGR.zip",
								path: "https://autopatchcn.yuanshen.com/client_app/update/hk4e_cn/18/ko-kr_3.1.0_3.3.0_hdiff_reO3YkWcUEd0VKGR.zip",
								size: "2035290617",
								md5: "4E70A89B2C34CE9A1DB662F04F3D87EB",
								package_size: "953160302"
							}
						],
						package_size: "9406913817"
					}
				]
			},
			plugin: {
				plugins: [
					{
						name: "DXSETUP.zip",
						version: "",
						path: "https://autopatchcn.yuanshen.com/client_app/plugins/DXSETUP.zip",
						size: "100647892",
						md5: "CA2AC3835D7D7DA6CB8624FEFB177083",
						entry: ""
					}
				],
				version: "1"
			},
			web_url: "https://ys.mihoyo.com/launcher",
			force_update: null,
			pre_download_game: null,
			deprecated_packages: [
				{ name: "game_3.0.0_3.2.0_hdiff_VTro0ZXq4dKa6phJ.zip", md5: "2E3F33112FE95D194CA11F6F50C30FD0" },
				{ name: "zh-cn_3.0.0_3.2.0_hdiff_BOTxLFcUIoQVgtG0.zip", md5: "856050A962B238BC7222780D1FC72717" },
				{ name: "en-us_3.0.0_3.2.0_hdiff_txH1bUAnoR5MpI3L.zip", md5: "846099FC45716618ED6E295AB2F9E587" },
				{ name: "ja-jp_3.0.0_3.2.0_hdiff_XnH8s3zGxZYVg9LJ.zip", md5: "46F2EA749966C393EF7718D344A70217" },
				{ name: "ko-kr_3.0.0_3.2.0_hdiff_FCaKwoLkWQpsPjUh.zip", md5: "13D1401CA38DDF2843869B3EF39AC09C" },
				{ name: "game_3.1.0_3.2.0_hdiff_jXM0eDiqdLA8oTf3.zip", md5: "B9A1B0F33CA3EDDEA563149D72A242DC" },
				{ name: "zh-cn_3.1.0_3.2.0_hdiff_5D4J7cwHRpSbVWsC.zip", md5: "EB9F59B424CD71EEDC7328D298B65364" },
				{ name: "en-us_3.1.0_3.2.0_hdiff_GFskoYScLp96dgXn.zip", md5: "9467EF4B259927013F0C944E4CD42DBD" },
				{ name: "ja-jp_3.1.0_3.2.0_hdiff_rR6sEOPDk70Wwfgq.zip", md5: "CCF9B8BC090DF6F3D3DA7AC0963BE228" },
				{ name: "ko-kr_3.1.0_3.2.0_hdiff_irZevnPJlQc82bNw.zip", md5: "49F1F7D398BA3F881A39A6A88DD23718" },
				{ name: "YuanShen_3.2.0.zip", md5: "f171639eddec395bba7b3c92c4db7860" },
				{ name: "YuanShen_3.2.0.zip.001", md5: "4e2053d30b7d69c1a7c87f6aac223213" },
				{ name: "YuanShen_3.2.0.zip.002", md5: "93492b227feda1537bc133f4cae64fe0" },
				{ name: "YuanShen_3.2.0.zip.003", md5: "e1122a02dcdc389d9743055af6d93adc" },
				{ name: "YuanShen_3.2.0.zip.004", md5: "1d35c4375d1819db992e6759938d427e" },
				{ name: "Audio_Chinese_3.2.0.zip", md5: "d55b4bdcef7fb27c2cad0c0f25051538" },
				{ name: "Audio_English(US)_3.2.0.zip", md5: "62dab9e438070b3c7f2188d2074e3139" },
				{ name: "Audio_Japanese_3.2.0.zip", md5: "038cdeb6506584f7f30a92bb66e36fda" },
				{ name: "Audio_Korean_3.2.0.zip", md5: "34ec7f390cefe961cc7d24f03de7a169" },
				{ name: "game_2.8.0_3.1.0_hdiff_oPrDhBNzkmqt1WnV.zip", md5: "B003BD8C864C4D0170EE2B1B53CD5B8D" },
				{ name: "zh-cn_2.8.0_3.1.0_hdiff_xCRdgPaZJ5oMw4fA.zip", md5: "A3EC1665ECADC7345345F5C1F424992B" },
				{ name: "en-us_2.8.0_3.1.0_hdiff_gyKJUEuLpQGStYmO.zip", md5: "EFCA4EAB77F8A3169E71D1BE10B3F76A" },
				{ name: "ja-jp_2.8.0_3.1.0_hdiff_FmbRHyYslrU80GVW.zip", md5: "CE565D26AA09E6F5C6A0FFFC02326C69" },
				{ name: "ko-kr_2.8.0_3.1.0_hdiff_3glVNyU1Jck5QGip.zip", md5: "6D89CBD3232A5F286F76FC3860464AE1" },
				{ name: "game_3.0.0_3.1.0_hdiff_3dlivNRan0Dq7ykP.zip", md5: "5E644B932C6A2651A52C537DACE82C89" },
				{ name: "zh-cn_3.0.0_3.1.0_hdiff_pkNHKFGT9oVOc7IX.zip", md5: "8CEE35511C4690ECC19C666D3176C3EA" },
				{ name: "en-us_3.0.0_3.1.0_hdiff_oPK43vBzGi0lRncy.zip", md5: "168D74D5E009A23BC69D73F4A3244AA4" },
				{ name: "ja-jp_3.0.0_3.1.0_hdiff_CsobdD1igS0T6jmR.zip", md5: "99AEB44051E41EC19346BBBA608251D5" },
				{ name: "ko-kr_3.0.0_3.1.0_hdiff_BTGW6aCo8HVUcsm0.zip", md5: "EAD9F42998C08BACB27C6105260C44A4" },
				{ name: "YuanShen_3.1.0.zip", md5: "acfa83a37b0884f6b3c767f19691043c" },
				{ name: "Audio_Chinese_3.1.0.zip", md5: "74251ac421d52fcc22ba30c03c05c2ac" },
				{ name: "Audio_English(US)_3.1.0.zip", md5: "f55a9306932867e3b6161064e45490d9" },
				{ name: "Audio_Japanese_3.1.0.zip", md5: "29a1dfee7fcc730be7b391ff7c1720a4" },
				{ name: "Audio_Korean_3.1.0.zip", md5: "57b2ca7132fd5dc67aeb5858a38bbf5e" },
				{ name: "game_2.7.0_3.0.0_hdiff_jWBmFtXMu3v17cg8.zip", md5: "4F5BACA67FF47A629D53D149D54E6EE8" },
				{ name: "zh-cn_2.7.0_3.0.0_hdiff_U5s7ShiHnT8M0JPq.zip", md5: "3B962D44621B6B1849FA6E561EA7F38D" },
				{ name: "en-us_2.7.0_3.0.0_hdiff_1Bevc4h5Js9U0aNy.zip", md5: "3C5C0734111530478E080A6482E70031" },
				{ name: "ja-jp_2.7.0_3.0.0_hdiff_sQ3Snd7JCObwVkpK.zip", md5: "89814FBB8BE048AA9A25DB49EBCD3D2B" },
				{ name: "ko-kr_2.7.0_3.0.0_hdiff_OEeh67CLowc25ijF.zip", md5: "5193DD9C0CD169BAAC274CBF8C5F03B6" },
				{ name: "game_2.8.0_3.0.0_hdiff_6azJoC5lYS1EUycW.zip", md5: "B0D8407E9EC545FEFC9855ACB467893F" },
				{ name: "zh-cn_2.8.0_3.0.0_hdiff_0osJAObthKPmDc3r.zip", md5: "7B534E5F6087E0B237027F48E3B95D63" },
				{ name: "en-us_2.8.0_3.0.0_hdiff_qHeyaTLsu6IcEb5J.zip", md5: "4B0275D694C20EFE5F87F1EAF5E646E1" },
				{ name: "ja-jp_2.8.0_3.0.0_hdiff_15hvOf7Fbrslt3W9.zip", md5: "872FC08C821961DC6B09A056F452CC1D" },
				{ name: "ko-kr_2.8.0_3.0.0_hdiff_iNx3dcsKA81TtRUH.zip", md5: "CD970BCE6D415FCFBBF3D12713F27CBF" },
				{ name: "YuanShen_3.0.0.zip", md5: "cd1437c10a30127c61dc25da5d6e1d6b" },
				{ name: "Audio_Chinese_3.0.0.zip", md5: "c4decdaa35fe28db2e3377d731b61509" },
				{ name: "Audio_English(US)_3.0.0.zip", md5: "9301e3ef3d4bd2f9578e9a7c3231044f" },
				{ name: "Audio_Japanese_3.0.0.zip", md5: "eec13fe0b7d510e8b2e387ab3b0d1ce9" },
				{ name: "Audio_Korean_3.0.0.zip", md5: "df75295aace0ce387f4016873a374b99" }
			],
			sdk: null,
			deprecated_files: [
				{ name: "mhyprot2.Sys", md5: "" },
				{ name: "YuanShen_Data/Plugins/sqlite3.dll", md5: "" },
				{ name: "YuanShen_Data/Plugins/PCGameSDK.dll", md5: "" },
				{ name: "YuanShen_Data/Plugins/metakeeper.dll", md5: "" },
				{ name: "YuanShen_Data/Plugins/d3dcompiler_43.dll", md5: "" },
				{ name: "YuanShen_Data/Plugins/widevinecdmadapter.dll", md5: "" },
				{ name: "YuanShen_Data/Plugins/InControlNative.dll", md5: "" },
				{ name: "YuanShen_Data/Plugins/XInputInterface64.dll", md5: "" }
			]
		}
	})
}
