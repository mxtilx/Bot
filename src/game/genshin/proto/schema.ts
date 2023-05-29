/**
 * eslint-disable
 *
 * @format
 */

import * as _m0 from "protobufjs/minimal"

export const protobufPackage = ""

export interface QueryCurrRegionHttpRsp {
	forceUdpate?: ForceUpdateInfo | undefined
	stopServer?: StopServerInfo | undefined
	retcode?: number
	msg?: string
	regionInfo?: RegionInfo
	clientSecretKey?: Uint8Array
	regionCustomConfigEncrypted?: Uint8Array
	clientRegionCustomConfigEncrypted?: Uint8Array
}

export interface QueryRegionListHttpRsp {
	retcode?: number
	regionList?: RegionSimpleInfo[]
	clientSecretKey?: Uint8Array
	clientCustomConfigEncrypted?: Uint8Array
	enableLoginPc?: boolean
}

export interface RegionSimpleInfo {
	name?: string
	title?: string
	type?: string
	dispatchUrl?: string
}

export interface ForceUpdateInfo {
	forceUpdateUrl?: string
}

export interface StopServerInfo {
	stopBeginTime?: number
	stopEndTime?: number
	url?: string
	contentMsg?: string
}

export interface RegionInfo {
	gateserverIp?: string
	gateserverPort?: number
	payCallbackUrl?: string
	areaType?: string
	resourceUrl?: string
	dataUrl?: string
	feedbackUrl?: string
	bulletinUrl?: string
	resourceUrlBak?: string
	dataUrlBak?: string
	clientDataVersion?: number
	handbookUrl?: string
	clientSilenceDataVersion?: number
	clientDataMd5?: string
	clientSilenceDataMd5?: string
	resVersionConfig?: ResVersionConfig
	secretKey?: Uint8Array
	officialCommunityUrl?: string
	clientVersionSuffix?: string
	clientSilenceVersionSuffix?: string
	useGateserverDomainName?: boolean
	gateserverDomainName?: string
	userCenterUrl?: string
	accountBindUrl?: string
	cdkeyUrl?: string
	privacyPolicyUrl?: string
	nextResourceUrl?: string
	nextResVersionConfig?: ResVersionConfig
}

export interface ResVersionConfig {
	version?: number
	relogin?: boolean
	md5?: string
	releaseTotalSize?: string
	versionSuffix?: string
	branch?: string
	nextScriptVersion?: string
}

function createBaseQueryCurrRegionHttpRsp(): QueryCurrRegionHttpRsp {
	return {
		forceUdpate: undefined,
		stopServer: undefined,
		retcode: 0,
		msg: "",
		regionInfo: undefined,
		clientSecretKey: new Uint8Array(),
		regionCustomConfigEncrypted: new Uint8Array(),
		clientRegionCustomConfigEncrypted: new Uint8Array()
	}
}

export const QueryCurrRegionHttpRsp = {
	encode(message: QueryCurrRegionHttpRsp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.forceUdpate !== undefined) {
			ForceUpdateInfo.encode(message.forceUdpate, writer.uint32(34).fork()).ldelim()
		}
		if (message.stopServer !== undefined) {
			StopServerInfo.encode(message.stopServer, writer.uint32(42).fork()).ldelim()
		}
		if (message.retcode !== undefined && message.retcode !== 0) {
			writer.uint32(8).int32(message.retcode)
		}
		if (message.msg !== undefined && message.msg !== "") {
			writer.uint32(18).string(message.msg)
		}
		if (message.regionInfo !== undefined) {
			RegionInfo.encode(message.regionInfo, writer.uint32(26).fork()).ldelim()
		}
		if (message.clientSecretKey !== undefined && message.clientSecretKey.length !== 0) {
			writer.uint32(90).bytes(message.clientSecretKey)
		}
		if (message.regionCustomConfigEncrypted !== undefined && message.regionCustomConfigEncrypted.length !== 0) {
			writer.uint32(98).bytes(message.regionCustomConfigEncrypted)
		}
		if (
			message.clientRegionCustomConfigEncrypted !== undefined &&
			message.clientRegionCustomConfigEncrypted.length !== 0
		) {
			writer.uint32(106).bytes(message.clientRegionCustomConfigEncrypted)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrRegionHttpRsp {
		const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseQueryCurrRegionHttpRsp()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 4:
					if (tag !== 34) {
						break
					}

					message.forceUdpate = ForceUpdateInfo.decode(reader, reader.uint32())
					continue
				case 5:
					if (tag !== 42) {
						break
					}

					message.stopServer = StopServerInfo.decode(reader, reader.uint32())
					continue
				case 1:
					if (tag !== 8) {
						break
					}

					message.retcode = reader.int32()
					continue
				case 2:
					if (tag !== 18) {
						break
					}

					message.msg = reader.string()
					continue
				case 3:
					if (tag !== 26) {
						break
					}

					message.regionInfo = RegionInfo.decode(reader, reader.uint32())
					continue
				case 11:
					if (tag !== 90) {
						break
					}

					message.clientSecretKey = reader.bytes()
					continue
				case 12:
					if (tag !== 98) {
						break
					}

					message.regionCustomConfigEncrypted = reader.bytes()
					continue
				case 13:
					if (tag !== 106) {
						break
					}

					message.clientRegionCustomConfigEncrypted = reader.bytes()
					continue
			}
			if ((tag & 7) === 4 || tag === 0) {
				break
			}
			reader.skipType(tag & 7)
		}
		return message
	},

	fromJSON(object: any): QueryCurrRegionHttpRsp {
		return {
			forceUdpate: isSet(object.forceUdpate) ? ForceUpdateInfo.fromJSON(object.forceUdpate) : undefined,
			stopServer: isSet(object.stopServer) ? StopServerInfo.fromJSON(object.stopServer) : undefined,
			retcode: isSet(object.retcode) ? Number(object.retcode) : 0,
			msg: isSet(object.msg) ? String(object.msg) : "",
			regionInfo: isSet(object.regionInfo) ? RegionInfo.fromJSON(object.regionInfo) : undefined,
			clientSecretKey: isSet(object.clientSecretKey) ? bytesFromBase64(object.clientSecretKey) : new Uint8Array(),
			regionCustomConfigEncrypted: isSet(object.regionCustomConfigEncrypted)
				? bytesFromBase64(object.regionCustomConfigEncrypted)
				: new Uint8Array(),
			clientRegionCustomConfigEncrypted: isSet(object.clientRegionCustomConfigEncrypted)
				? bytesFromBase64(object.clientRegionCustomConfigEncrypted)
				: new Uint8Array()
		}
	},

	toJSON(message: QueryCurrRegionHttpRsp): unknown {
		const obj: any = {}
		message.forceUdpate !== undefined &&
			(obj.forceUdpate = message.forceUdpate ? ForceUpdateInfo.toJSON(message.forceUdpate) : undefined)
		message.stopServer !== undefined &&
			(obj.stopServer = message.stopServer ? StopServerInfo.toJSON(message.stopServer) : undefined)
		message.retcode !== undefined && (obj.retcode = Math.round(message.retcode))
		message.msg !== undefined && (obj.msg = message.msg)
		message.regionInfo !== undefined &&
			(obj.regionInfo = message.regionInfo ? RegionInfo.toJSON(message.regionInfo) : undefined)
		message.clientSecretKey !== undefined &&
			(obj.clientSecretKey = base64FromBytes(
				message.clientSecretKey !== undefined ? message.clientSecretKey : new Uint8Array()
			))
		message.regionCustomConfigEncrypted !== undefined &&
			(obj.regionCustomConfigEncrypted = base64FromBytes(
				message.regionCustomConfigEncrypted !== undefined
					? message.regionCustomConfigEncrypted
					: new Uint8Array()
			))
		message.clientRegionCustomConfigEncrypted !== undefined &&
			(obj.clientRegionCustomConfigEncrypted = base64FromBytes(
				message.clientRegionCustomConfigEncrypted !== undefined
					? message.clientRegionCustomConfigEncrypted
					: new Uint8Array()
			))
		return obj
	},

	create<I extends Exact<DeepPartial<QueryCurrRegionHttpRsp>, I>>(base?: I): QueryCurrRegionHttpRsp {
		return QueryCurrRegionHttpRsp.fromPartial(base ?? {})
	},

	fromPartial<I extends Exact<DeepPartial<QueryCurrRegionHttpRsp>, I>>(object: I): QueryCurrRegionHttpRsp {
		const message = createBaseQueryCurrRegionHttpRsp()
		message.forceUdpate =
			object.forceUdpate !== undefined && object.forceUdpate !== null
				? ForceUpdateInfo.fromPartial(object.forceUdpate)
				: undefined
		message.stopServer =
			object.stopServer !== undefined && object.stopServer !== null
				? StopServerInfo.fromPartial(object.stopServer)
				: undefined
		message.retcode = object.retcode ?? 0
		message.msg = object.msg ?? ""
		message.regionInfo =
			object.regionInfo !== undefined && object.regionInfo !== null
				? RegionInfo.fromPartial(object.regionInfo)
				: undefined
		message.clientSecretKey = object.clientSecretKey ?? new Uint8Array()
		message.regionCustomConfigEncrypted = object.regionCustomConfigEncrypted ?? new Uint8Array()
		message.clientRegionCustomConfigEncrypted = object.clientRegionCustomConfigEncrypted ?? new Uint8Array()
		return message
	}
}

function createBaseQueryRegionListHttpRsp(): QueryRegionListHttpRsp {
	return {
		retcode: 0,
		regionList: [],
		clientSecretKey: new Uint8Array(),
		clientCustomConfigEncrypted: new Uint8Array(),
		enableLoginPc: false
	}
}

export const QueryRegionListHttpRsp = {
	encode(message: QueryRegionListHttpRsp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.retcode !== undefined && message.retcode !== 0) {
			writer.uint32(8).int32(message.retcode)
		}
		if (message.regionList !== undefined && message.regionList.length !== 0) {
			for (const v of message.regionList) {
				RegionSimpleInfo.encode(v!, writer.uint32(18).fork()).ldelim()
			}
		}
		if (message.clientSecretKey !== undefined && message.clientSecretKey.length !== 0) {
			writer.uint32(42).bytes(message.clientSecretKey)
		}
		if (message.clientCustomConfigEncrypted !== undefined && message.clientCustomConfigEncrypted.length !== 0) {
			writer.uint32(50).bytes(message.clientCustomConfigEncrypted)
		}
		if (message.enableLoginPc === true) {
			writer.uint32(56).bool(message.enableLoginPc)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): QueryRegionListHttpRsp {
		const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseQueryRegionListHttpRsp()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) {
						break
					}

					message.retcode = reader.int32()
					continue
				case 2:
					if (tag !== 18) {
						break
					}

					message.regionList!.push(RegionSimpleInfo.decode(reader, reader.uint32()))
					continue
				case 5:
					if (tag !== 42) {
						break
					}

					message.clientSecretKey = reader.bytes()
					continue
				case 6:
					if (tag !== 50) {
						break
					}

					message.clientCustomConfigEncrypted = reader.bytes()
					continue
				case 7:
					if (tag !== 56) {
						break
					}

					message.enableLoginPc = reader.bool()
					continue
			}
			if ((tag & 7) === 4 || tag === 0) {
				break
			}
			reader.skipType(tag & 7)
		}
		return message
	},

	fromJSON(object: any): QueryRegionListHttpRsp {
		return {
			retcode: isSet(object.retcode) ? Number(object.retcode) : 0,
			regionList: Array.isArray(object?.regionList)
				? object.regionList.map((e: any) => RegionSimpleInfo.fromJSON(e))
				: [],
			clientSecretKey: isSet(object.clientSecretKey) ? bytesFromBase64(object.clientSecretKey) : new Uint8Array(),
			clientCustomConfigEncrypted: isSet(object.clientCustomConfigEncrypted)
				? bytesFromBase64(object.clientCustomConfigEncrypted)
				: new Uint8Array(),
			enableLoginPc: isSet(object.enableLoginPc) ? Boolean(object.enableLoginPc) : false
		}
	},

	toJSON(message: QueryRegionListHttpRsp): unknown {
		const obj: any = {}
		message.retcode !== undefined && (obj.retcode = Math.round(message.retcode))
		if (message.regionList) {
			obj.regionList = message.regionList.map((e) => (e ? RegionSimpleInfo.toJSON(e) : undefined))
		} else {
			obj.regionList = []
		}
		message.clientSecretKey !== undefined &&
			(obj.clientSecretKey = base64FromBytes(
				message.clientSecretKey !== undefined ? message.clientSecretKey : new Uint8Array()
			))
		message.clientCustomConfigEncrypted !== undefined &&
			(obj.clientCustomConfigEncrypted = base64FromBytes(
				message.clientCustomConfigEncrypted !== undefined
					? message.clientCustomConfigEncrypted
					: new Uint8Array()
			))
		message.enableLoginPc !== undefined && (obj.enableLoginPc = message.enableLoginPc)
		return obj
	},

	create<I extends Exact<DeepPartial<QueryRegionListHttpRsp>, I>>(base?: I): QueryRegionListHttpRsp {
		return QueryRegionListHttpRsp.fromPartial(base ?? {})
	},

	fromPartial<I extends Exact<DeepPartial<QueryRegionListHttpRsp>, I>>(object: I): QueryRegionListHttpRsp {
		const message = createBaseQueryRegionListHttpRsp()
		message.retcode = object.retcode ?? 0
		message.regionList = object.regionList?.map((e) => RegionSimpleInfo.fromPartial(e)) || []
		message.clientSecretKey = object.clientSecretKey ?? new Uint8Array()
		message.clientCustomConfigEncrypted = object.clientCustomConfigEncrypted ?? new Uint8Array()
		message.enableLoginPc = object.enableLoginPc ?? false
		return message
	}
}

function createBaseRegionSimpleInfo(): RegionSimpleInfo {
	return { name: "", title: "", type: "", dispatchUrl: "" }
}

export const RegionSimpleInfo = {
	encode(message: RegionSimpleInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.name !== undefined && message.name !== "") {
			writer.uint32(10).string(message.name)
		}
		if (message.title !== undefined && message.title !== "") {
			writer.uint32(18).string(message.title)
		}
		if (message.type !== undefined && message.type !== "") {
			writer.uint32(26).string(message.type)
		}
		if (message.dispatchUrl !== undefined && message.dispatchUrl !== "") {
			writer.uint32(34).string(message.dispatchUrl)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): RegionSimpleInfo {
		const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseRegionSimpleInfo()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) {
						break
					}

					message.name = reader.string()
					continue
				case 2:
					if (tag !== 18) {
						break
					}

					message.title = reader.string()
					continue
				case 3:
					if (tag !== 26) {
						break
					}

					message.type = reader.string()
					continue
				case 4:
					if (tag !== 34) {
						break
					}

					message.dispatchUrl = reader.string()
					continue
			}
			if ((tag & 7) === 4 || tag === 0) {
				break
			}
			reader.skipType(tag & 7)
		}
		return message
	},

	fromJSON(object: any): RegionSimpleInfo {
		return {
			name: isSet(object.name) ? String(object.name) : "",
			title: isSet(object.title) ? String(object.title) : "",
			type: isSet(object.type) ? String(object.type) : "",
			dispatchUrl: isSet(object.dispatchUrl) ? String(object.dispatchUrl) : ""
		}
	},

	toJSON(message: RegionSimpleInfo): unknown {
		const obj: any = {}
		message.name !== undefined && (obj.name = message.name)
		message.title !== undefined && (obj.title = message.title)
		message.type !== undefined && (obj.type = message.type)
		message.dispatchUrl !== undefined && (obj.dispatchUrl = message.dispatchUrl)
		return obj
	},

	create<I extends Exact<DeepPartial<RegionSimpleInfo>, I>>(base?: I): RegionSimpleInfo {
		return RegionSimpleInfo.fromPartial(base ?? {})
	},

	fromPartial<I extends Exact<DeepPartial<RegionSimpleInfo>, I>>(object: I): RegionSimpleInfo {
		const message = createBaseRegionSimpleInfo()
		message.name = object.name ?? ""
		message.title = object.title ?? ""
		message.type = object.type ?? ""
		message.dispatchUrl = object.dispatchUrl ?? ""
		return message
	}
}

function createBaseForceUpdateInfo(): ForceUpdateInfo {
	return { forceUpdateUrl: "" }
}

export const ForceUpdateInfo = {
	encode(message: ForceUpdateInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.forceUpdateUrl !== undefined && message.forceUpdateUrl !== "") {
			writer.uint32(10).string(message.forceUpdateUrl)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ForceUpdateInfo {
		const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseForceUpdateInfo()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) {
						break
					}

					message.forceUpdateUrl = reader.string()
					continue
			}
			if ((tag & 7) === 4 || tag === 0) {
				break
			}
			reader.skipType(tag & 7)
		}
		return message
	},

	fromJSON(object: any): ForceUpdateInfo {
		return { forceUpdateUrl: isSet(object.forceUpdateUrl) ? String(object.forceUpdateUrl) : "" }
	},

	toJSON(message: ForceUpdateInfo): unknown {
		const obj: any = {}
		message.forceUpdateUrl !== undefined && (obj.forceUpdateUrl = message.forceUpdateUrl)
		return obj
	},

	create<I extends Exact<DeepPartial<ForceUpdateInfo>, I>>(base?: I): ForceUpdateInfo {
		return ForceUpdateInfo.fromPartial(base ?? {})
	},

	fromPartial<I extends Exact<DeepPartial<ForceUpdateInfo>, I>>(object: I): ForceUpdateInfo {
		const message = createBaseForceUpdateInfo()
		message.forceUpdateUrl = object.forceUpdateUrl ?? ""
		return message
	}
}

function createBaseStopServerInfo(): StopServerInfo {
	return { stopBeginTime: 0, stopEndTime: 0, url: "", contentMsg: "" }
}

export const StopServerInfo = {
	encode(message: StopServerInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.stopBeginTime !== undefined && message.stopBeginTime !== 0) {
			writer.uint32(8).uint32(message.stopBeginTime)
		}
		if (message.stopEndTime !== undefined && message.stopEndTime !== 0) {
			writer.uint32(16).uint32(message.stopEndTime)
		}
		if (message.url !== undefined && message.url !== "") {
			writer.uint32(26).string(message.url)
		}
		if (message.contentMsg !== undefined && message.contentMsg !== "") {
			writer.uint32(34).string(message.contentMsg)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): StopServerInfo {
		const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseStopServerInfo()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) {
						break
					}

					message.stopBeginTime = reader.uint32()
					continue
				case 2:
					if (tag !== 16) {
						break
					}

					message.stopEndTime = reader.uint32()
					continue
				case 3:
					if (tag !== 26) {
						break
					}

					message.url = reader.string()
					continue
				case 4:
					if (tag !== 34) {
						break
					}

					message.contentMsg = reader.string()
					continue
			}
			if ((tag & 7) === 4 || tag === 0) {
				break
			}
			reader.skipType(tag & 7)
		}
		return message
	},

	fromJSON(object: any): StopServerInfo {
		return {
			stopBeginTime: isSet(object.stopBeginTime) ? Number(object.stopBeginTime) : 0,
			stopEndTime: isSet(object.stopEndTime) ? Number(object.stopEndTime) : 0,
			url: isSet(object.url) ? String(object.url) : "",
			contentMsg: isSet(object.contentMsg) ? String(object.contentMsg) : ""
		}
	},

	toJSON(message: StopServerInfo): unknown {
		const obj: any = {}
		message.stopBeginTime !== undefined && (obj.stopBeginTime = Math.round(message.stopBeginTime))
		message.stopEndTime !== undefined && (obj.stopEndTime = Math.round(message.stopEndTime))
		message.url !== undefined && (obj.url = message.url)
		message.contentMsg !== undefined && (obj.contentMsg = message.contentMsg)
		return obj
	},

	create<I extends Exact<DeepPartial<StopServerInfo>, I>>(base?: I): StopServerInfo {
		return StopServerInfo.fromPartial(base ?? {})
	},

	fromPartial<I extends Exact<DeepPartial<StopServerInfo>, I>>(object: I): StopServerInfo {
		const message = createBaseStopServerInfo()
		message.stopBeginTime = object.stopBeginTime ?? 0
		message.stopEndTime = object.stopEndTime ?? 0
		message.url = object.url ?? ""
		message.contentMsg = object.contentMsg ?? ""
		return message
	}
}

function createBaseRegionInfo(): RegionInfo {
	return {
		gateserverIp: "",
		gateserverPort: 0,
		payCallbackUrl: "",
		areaType: "",
		resourceUrl: "",
		dataUrl: "",
		feedbackUrl: "",
		bulletinUrl: "",
		resourceUrlBak: "",
		dataUrlBak: "",
		clientDataVersion: 0,
		handbookUrl: "",
		clientSilenceDataVersion: 0,
		clientDataMd5: "",
		clientSilenceDataMd5: "",
		resVersionConfig: undefined,
		secretKey: new Uint8Array(),
		officialCommunityUrl: "",
		clientVersionSuffix: "",
		clientSilenceVersionSuffix: "",
		useGateserverDomainName: false,
		gateserverDomainName: "",
		userCenterUrl: "",
		accountBindUrl: "",
		cdkeyUrl: "",
		privacyPolicyUrl: "",
		nextResourceUrl: "",
		nextResVersionConfig: undefined
	}
}

export const RegionInfo = {
	encode(message: RegionInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.gateserverIp !== undefined && message.gateserverIp !== "") {
			writer.uint32(10).string(message.gateserverIp)
		}
		if (message.gateserverPort !== undefined && message.gateserverPort !== 0) {
			writer.uint32(16).uint32(message.gateserverPort)
		}
		if (message.payCallbackUrl !== undefined && message.payCallbackUrl !== "") {
			writer.uint32(26).string(message.payCallbackUrl)
		}
		if (message.areaType !== undefined && message.areaType !== "") {
			writer.uint32(58).string(message.areaType)
		}
		if (message.resourceUrl !== undefined && message.resourceUrl !== "") {
			writer.uint32(66).string(message.resourceUrl)
		}
		if (message.dataUrl !== undefined && message.dataUrl !== "") {
			writer.uint32(74).string(message.dataUrl)
		}
		if (message.feedbackUrl !== undefined && message.feedbackUrl !== "") {
			writer.uint32(82).string(message.feedbackUrl)
		}
		if (message.bulletinUrl !== undefined && message.bulletinUrl !== "") {
			writer.uint32(90).string(message.bulletinUrl)
		}
		if (message.resourceUrlBak !== undefined && message.resourceUrlBak !== "") {
			writer.uint32(98).string(message.resourceUrlBak)
		}
		if (message.dataUrlBak !== undefined && message.dataUrlBak !== "") {
			writer.uint32(106).string(message.dataUrlBak)
		}
		if (message.clientDataVersion !== undefined && message.clientDataVersion !== 0) {
			writer.uint32(112).uint32(message.clientDataVersion)
		}
		if (message.handbookUrl !== undefined && message.handbookUrl !== "") {
			writer.uint32(130).string(message.handbookUrl)
		}
		if (message.clientSilenceDataVersion !== undefined && message.clientSilenceDataVersion !== 0) {
			writer.uint32(144).uint32(message.clientSilenceDataVersion)
		}
		if (message.clientDataMd5 !== undefined && message.clientDataMd5 !== "") {
			writer.uint32(154).string(message.clientDataMd5)
		}
		if (message.clientSilenceDataMd5 !== undefined && message.clientSilenceDataMd5 !== "") {
			writer.uint32(162).string(message.clientSilenceDataMd5)
		}
		if (message.resVersionConfig !== undefined) {
			ResVersionConfig.encode(message.resVersionConfig, writer.uint32(178).fork()).ldelim()
		}
		if (message.secretKey !== undefined && message.secretKey.length !== 0) {
			writer.uint32(186).bytes(message.secretKey)
		}
		if (message.officialCommunityUrl !== undefined && message.officialCommunityUrl !== "") {
			writer.uint32(194).string(message.officialCommunityUrl)
		}
		if (message.clientVersionSuffix !== undefined && message.clientVersionSuffix !== "") {
			writer.uint32(210).string(message.clientVersionSuffix)
		}
		if (message.clientSilenceVersionSuffix !== undefined && message.clientSilenceVersionSuffix !== "") {
			writer.uint32(218).string(message.clientSilenceVersionSuffix)
		}
		if (message.useGateserverDomainName === true) {
			writer.uint32(224).bool(message.useGateserverDomainName)
		}
		if (message.gateserverDomainName !== undefined && message.gateserverDomainName !== "") {
			writer.uint32(234).string(message.gateserverDomainName)
		}
		if (message.userCenterUrl !== undefined && message.userCenterUrl !== "") {
			writer.uint32(242).string(message.userCenterUrl)
		}
		if (message.accountBindUrl !== undefined && message.accountBindUrl !== "") {
			writer.uint32(250).string(message.accountBindUrl)
		}
		if (message.cdkeyUrl !== undefined && message.cdkeyUrl !== "") {
			writer.uint32(258).string(message.cdkeyUrl)
		}
		if (message.privacyPolicyUrl !== undefined && message.privacyPolicyUrl !== "") {
			writer.uint32(266).string(message.privacyPolicyUrl)
		}
		if (message.nextResourceUrl !== undefined && message.nextResourceUrl !== "") {
			writer.uint32(274).string(message.nextResourceUrl)
		}
		if (message.nextResVersionConfig !== undefined) {
			ResVersionConfig.encode(message.nextResVersionConfig, writer.uint32(282).fork()).ldelim()
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): RegionInfo {
		const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseRegionInfo()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) {
						break
					}

					message.gateserverIp = reader.string()
					continue
				case 2:
					if (tag !== 16) {
						break
					}

					message.gateserverPort = reader.uint32()
					continue
				case 3:
					if (tag !== 26) {
						break
					}

					message.payCallbackUrl = reader.string()
					continue
				case 7:
					if (tag !== 58) {
						break
					}

					message.areaType = reader.string()
					continue
				case 8:
					if (tag !== 66) {
						break
					}

					message.resourceUrl = reader.string()
					continue
				case 9:
					if (tag !== 74) {
						break
					}

					message.dataUrl = reader.string()
					continue
				case 10:
					if (tag !== 82) {
						break
					}

					message.feedbackUrl = reader.string()
					continue
				case 11:
					if (tag !== 90) {
						break
					}

					message.bulletinUrl = reader.string()
					continue
				case 12:
					if (tag !== 98) {
						break
					}

					message.resourceUrlBak = reader.string()
					continue
				case 13:
					if (tag !== 106) {
						break
					}

					message.dataUrlBak = reader.string()
					continue
				case 14:
					if (tag !== 112) {
						break
					}

					message.clientDataVersion = reader.uint32()
					continue
				case 16:
					if (tag !== 130) {
						break
					}

					message.handbookUrl = reader.string()
					continue
				case 18:
					if (tag !== 144) {
						break
					}

					message.clientSilenceDataVersion = reader.uint32()
					continue
				case 19:
					if (tag !== 154) {
						break
					}

					message.clientDataMd5 = reader.string()
					continue
				case 20:
					if (tag !== 162) {
						break
					}

					message.clientSilenceDataMd5 = reader.string()
					continue
				case 22:
					if (tag !== 178) {
						break
					}

					message.resVersionConfig = ResVersionConfig.decode(reader, reader.uint32())
					continue
				case 23:
					if (tag !== 186) {
						break
					}

					message.secretKey = reader.bytes()
					continue
				case 24:
					if (tag !== 194) {
						break
					}

					message.officialCommunityUrl = reader.string()
					continue
				case 26:
					if (tag !== 210) {
						break
					}

					message.clientVersionSuffix = reader.string()
					continue
				case 27:
					if (tag !== 218) {
						break
					}

					message.clientSilenceVersionSuffix = reader.string()
					continue
				case 28:
					if (tag !== 224) {
						break
					}

					message.useGateserverDomainName = reader.bool()
					continue
				case 29:
					if (tag !== 234) {
						break
					}

					message.gateserverDomainName = reader.string()
					continue
				case 30:
					if (tag !== 242) {
						break
					}

					message.userCenterUrl = reader.string()
					continue
				case 31:
					if (tag !== 250) {
						break
					}

					message.accountBindUrl = reader.string()
					continue
				case 32:
					if (tag !== 258) {
						break
					}

					message.cdkeyUrl = reader.string()
					continue
				case 33:
					if (tag !== 266) {
						break
					}

					message.privacyPolicyUrl = reader.string()
					continue
				case 34:
					if (tag !== 274) {
						break
					}

					message.nextResourceUrl = reader.string()
					continue
				case 35:
					if (tag !== 282) {
						break
					}

					message.nextResVersionConfig = ResVersionConfig.decode(reader, reader.uint32())
					continue
			}
			if ((tag & 7) === 4 || tag === 0) {
				break
			}
			reader.skipType(tag & 7)
		}
		return message
	},

	fromJSON(object: any): RegionInfo {
		return {
			gateserverIp: isSet(object.gateserverIp) ? String(object.gateserverIp) : "",
			gateserverPort: isSet(object.gateserverPort) ? Number(object.gateserverPort) : 0,
			payCallbackUrl: isSet(object.payCallbackUrl) ? String(object.payCallbackUrl) : "",
			areaType: isSet(object.areaType) ? String(object.areaType) : "",
			resourceUrl: isSet(object.resourceUrl) ? String(object.resourceUrl) : "",
			dataUrl: isSet(object.dataUrl) ? String(object.dataUrl) : "",
			feedbackUrl: isSet(object.feedbackUrl) ? String(object.feedbackUrl) : "",
			bulletinUrl: isSet(object.bulletinUrl) ? String(object.bulletinUrl) : "",
			resourceUrlBak: isSet(object.resourceUrlBak) ? String(object.resourceUrlBak) : "",
			dataUrlBak: isSet(object.dataUrlBak) ? String(object.dataUrlBak) : "",
			clientDataVersion: isSet(object.clientDataVersion) ? Number(object.clientDataVersion) : 0,
			handbookUrl: isSet(object.handbookUrl) ? String(object.handbookUrl) : "",
			clientSilenceDataVersion: isSet(object.clientSilenceDataVersion)
				? Number(object.clientSilenceDataVersion)
				: 0,
			clientDataMd5: isSet(object.clientDataMd5) ? String(object.clientDataMd5) : "",
			clientSilenceDataMd5: isSet(object.clientSilenceDataMd5) ? String(object.clientSilenceDataMd5) : "",
			resVersionConfig: isSet(object.resVersionConfig)
				? ResVersionConfig.fromJSON(object.resVersionConfig)
				: undefined,
			secretKey: isSet(object.secretKey) ? bytesFromBase64(object.secretKey) : new Uint8Array(),
			officialCommunityUrl: isSet(object.officialCommunityUrl) ? String(object.officialCommunityUrl) : "",
			clientVersionSuffix: isSet(object.clientVersionSuffix) ? String(object.clientVersionSuffix) : "",
			clientSilenceVersionSuffix: isSet(object.clientSilenceVersionSuffix)
				? String(object.clientSilenceVersionSuffix)
				: "",
			useGateserverDomainName: isSet(object.useGateserverDomainName)
				? Boolean(object.useGateserverDomainName)
				: false,
			gateserverDomainName: isSet(object.gateserverDomainName) ? String(object.gateserverDomainName) : "",
			userCenterUrl: isSet(object.userCenterUrl) ? String(object.userCenterUrl) : "",
			accountBindUrl: isSet(object.accountBindUrl) ? String(object.accountBindUrl) : "",
			cdkeyUrl: isSet(object.cdkeyUrl) ? String(object.cdkeyUrl) : "",
			privacyPolicyUrl: isSet(object.privacyPolicyUrl) ? String(object.privacyPolicyUrl) : "",
			nextResourceUrl: isSet(object.nextResourceUrl) ? String(object.nextResourceUrl) : "",
			nextResVersionConfig: isSet(object.nextResVersionConfig)
				? ResVersionConfig.fromJSON(object.nextResVersionConfig)
				: undefined
		}
	},

	toJSON(message: RegionInfo): unknown {
		const obj: any = {}
		message.gateserverIp !== undefined && (obj.gateserverIp = message.gateserverIp)
		message.gateserverPort !== undefined && (obj.gateserverPort = Math.round(message.gateserverPort))
		message.payCallbackUrl !== undefined && (obj.payCallbackUrl = message.payCallbackUrl)
		message.areaType !== undefined && (obj.areaType = message.areaType)
		message.resourceUrl !== undefined && (obj.resourceUrl = message.resourceUrl)
		message.dataUrl !== undefined && (obj.dataUrl = message.dataUrl)
		message.feedbackUrl !== undefined && (obj.feedbackUrl = message.feedbackUrl)
		message.bulletinUrl !== undefined && (obj.bulletinUrl = message.bulletinUrl)
		message.resourceUrlBak !== undefined && (obj.resourceUrlBak = message.resourceUrlBak)
		message.dataUrlBak !== undefined && (obj.dataUrlBak = message.dataUrlBak)
		message.clientDataVersion !== undefined && (obj.clientDataVersion = Math.round(message.clientDataVersion))
		message.handbookUrl !== undefined && (obj.handbookUrl = message.handbookUrl)
		message.clientSilenceDataVersion !== undefined &&
			(obj.clientSilenceDataVersion = Math.round(message.clientSilenceDataVersion))
		message.clientDataMd5 !== undefined && (obj.clientDataMd5 = message.clientDataMd5)
		message.clientSilenceDataMd5 !== undefined && (obj.clientSilenceDataMd5 = message.clientSilenceDataMd5)
		message.resVersionConfig !== undefined &&
			(obj.resVersionConfig = message.resVersionConfig
				? ResVersionConfig.toJSON(message.resVersionConfig)
				: undefined)
		message.secretKey !== undefined &&
			(obj.secretKey = base64FromBytes(message.secretKey !== undefined ? message.secretKey : new Uint8Array()))
		message.officialCommunityUrl !== undefined && (obj.officialCommunityUrl = message.officialCommunityUrl)
		message.clientVersionSuffix !== undefined && (obj.clientVersionSuffix = message.clientVersionSuffix)
		message.clientSilenceVersionSuffix !== undefined &&
			(obj.clientSilenceVersionSuffix = message.clientSilenceVersionSuffix)
		message.useGateserverDomainName !== undefined && (obj.useGateserverDomainName = message.useGateserverDomainName)
		message.gateserverDomainName !== undefined && (obj.gateserverDomainName = message.gateserverDomainName)
		message.userCenterUrl !== undefined && (obj.userCenterUrl = message.userCenterUrl)
		message.accountBindUrl !== undefined && (obj.accountBindUrl = message.accountBindUrl)
		message.cdkeyUrl !== undefined && (obj.cdkeyUrl = message.cdkeyUrl)
		message.privacyPolicyUrl !== undefined && (obj.privacyPolicyUrl = message.privacyPolicyUrl)
		message.nextResourceUrl !== undefined && (obj.nextResourceUrl = message.nextResourceUrl)
		message.nextResVersionConfig !== undefined &&
			(obj.nextResVersionConfig = message.nextResVersionConfig
				? ResVersionConfig.toJSON(message.nextResVersionConfig)
				: undefined)
		return obj
	},

	create<I extends Exact<DeepPartial<RegionInfo>, I>>(base?: I): RegionInfo {
		return RegionInfo.fromPartial(base ?? {})
	},

	fromPartial<I extends Exact<DeepPartial<RegionInfo>, I>>(object: I): RegionInfo {
		const message = createBaseRegionInfo()
		message.gateserverIp = object.gateserverIp ?? ""
		message.gateserverPort = object.gateserverPort ?? 0
		message.payCallbackUrl = object.payCallbackUrl ?? ""
		message.areaType = object.areaType ?? ""
		message.resourceUrl = object.resourceUrl ?? ""
		message.dataUrl = object.dataUrl ?? ""
		message.feedbackUrl = object.feedbackUrl ?? ""
		message.bulletinUrl = object.bulletinUrl ?? ""
		message.resourceUrlBak = object.resourceUrlBak ?? ""
		message.dataUrlBak = object.dataUrlBak ?? ""
		message.clientDataVersion = object.clientDataVersion ?? 0
		message.handbookUrl = object.handbookUrl ?? ""
		message.clientSilenceDataVersion = object.clientSilenceDataVersion ?? 0
		message.clientDataMd5 = object.clientDataMd5 ?? ""
		message.clientSilenceDataMd5 = object.clientSilenceDataMd5 ?? ""
		message.resVersionConfig =
			object.resVersionConfig !== undefined && object.resVersionConfig !== null
				? ResVersionConfig.fromPartial(object.resVersionConfig)
				: undefined
		message.secretKey = object.secretKey ?? new Uint8Array()
		message.officialCommunityUrl = object.officialCommunityUrl ?? ""
		message.clientVersionSuffix = object.clientVersionSuffix ?? ""
		message.clientSilenceVersionSuffix = object.clientSilenceVersionSuffix ?? ""
		message.useGateserverDomainName = object.useGateserverDomainName ?? false
		message.gateserverDomainName = object.gateserverDomainName ?? ""
		message.userCenterUrl = object.userCenterUrl ?? ""
		message.accountBindUrl = object.accountBindUrl ?? ""
		message.cdkeyUrl = object.cdkeyUrl ?? ""
		message.privacyPolicyUrl = object.privacyPolicyUrl ?? ""
		message.nextResourceUrl = object.nextResourceUrl ?? ""
		message.nextResVersionConfig =
			object.nextResVersionConfig !== undefined && object.nextResVersionConfig !== null
				? ResVersionConfig.fromPartial(object.nextResVersionConfig)
				: undefined
		return message
	}
}

function createBaseResVersionConfig(): ResVersionConfig {
	return {
		version: 0,
		relogin: false,
		md5: "",
		releaseTotalSize: "",
		versionSuffix: "",
		branch: "",
		nextScriptVersion: ""
	}
}

export const ResVersionConfig = {
	encode(message: ResVersionConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.version !== undefined && message.version !== 0) {
			writer.uint32(8).uint32(message.version)
		}
		if (message.relogin === true) {
			writer.uint32(16).bool(message.relogin)
		}
		if (message.md5 !== undefined && message.md5 !== "") {
			writer.uint32(26).string(message.md5)
		}
		if (message.releaseTotalSize !== undefined && message.releaseTotalSize !== "") {
			writer.uint32(34).string(message.releaseTotalSize)
		}
		if (message.versionSuffix !== undefined && message.versionSuffix !== "") {
			writer.uint32(42).string(message.versionSuffix)
		}
		if (message.branch !== undefined && message.branch !== "") {
			writer.uint32(50).string(message.branch)
		}
		if (message.nextScriptVersion !== undefined && message.nextScriptVersion !== "") {
			writer.uint32(58).string(message.nextScriptVersion)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ResVersionConfig {
		const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseResVersionConfig()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) {
						break
					}

					message.version = reader.uint32()
					continue
				case 2:
					if (tag !== 16) {
						break
					}

					message.relogin = reader.bool()
					continue
				case 3:
					if (tag !== 26) {
						break
					}

					message.md5 = reader.string()
					continue
				case 4:
					if (tag !== 34) {
						break
					}

					message.releaseTotalSize = reader.string()
					continue
				case 5:
					if (tag !== 42) {
						break
					}

					message.versionSuffix = reader.string()
					continue
				case 6:
					if (tag !== 50) {
						break
					}

					message.branch = reader.string()
					continue
				case 7:
					if (tag !== 58) {
						break
					}

					message.nextScriptVersion = reader.string()
					continue
			}
			if ((tag & 7) === 4 || tag === 0) {
				break
			}
			reader.skipType(tag & 7)
		}
		return message
	},

	fromJSON(object: any): ResVersionConfig {
		return {
			version: isSet(object.version) ? Number(object.version) : 0,
			relogin: isSet(object.relogin) ? Boolean(object.relogin) : false,
			md5: isSet(object.md5) ? String(object.md5) : "",
			releaseTotalSize: isSet(object.releaseTotalSize) ? String(object.releaseTotalSize) : "",
			versionSuffix: isSet(object.versionSuffix) ? String(object.versionSuffix) : "",
			branch: isSet(object.branch) ? String(object.branch) : "",
			nextScriptVersion: isSet(object.nextScriptVersion) ? String(object.nextScriptVersion) : ""
		}
	},

	toJSON(message: ResVersionConfig): unknown {
		const obj: any = {}
		message.version !== undefined && (obj.version = Math.round(message.version))
		message.relogin !== undefined && (obj.relogin = message.relogin)
		message.md5 !== undefined && (obj.md5 = message.md5)
		message.releaseTotalSize !== undefined && (obj.releaseTotalSize = message.releaseTotalSize)
		message.versionSuffix !== undefined && (obj.versionSuffix = message.versionSuffix)
		message.branch !== undefined && (obj.branch = message.branch)
		message.nextScriptVersion !== undefined && (obj.nextScriptVersion = message.nextScriptVersion)
		return obj
	},

	create<I extends Exact<DeepPartial<ResVersionConfig>, I>>(base?: I): ResVersionConfig {
		return ResVersionConfig.fromPartial(base ?? {})
	},

	fromPartial<I extends Exact<DeepPartial<ResVersionConfig>, I>>(object: I): ResVersionConfig {
		const message = createBaseResVersionConfig()
		message.version = object.version ?? 0
		message.relogin = object.relogin ?? false
		message.md5 = object.md5 ?? ""
		message.releaseTotalSize = object.releaseTotalSize ?? ""
		message.versionSuffix = object.versionSuffix ?? ""
		message.branch = object.branch ?? ""
		message.nextScriptVersion = object.nextScriptVersion ?? ""
		return message
	}
}

declare var self: any | undefined
declare var window: any | undefined
declare var global: any | undefined
var tsProtoGlobalThis: any = (() => {
	if (typeof globalThis !== "undefined") {
		return globalThis
	}
	if (typeof self !== "undefined") {
		return self
	}
	if (typeof window !== "undefined") {
		return window
	}
	if (typeof global !== "undefined") {
		return global
	}
	throw "Unable to locate global object"
})()

function bytesFromBase64(b64: string): Uint8Array {
	if (tsProtoGlobalThis.Buffer) {
		return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"))
	} else {
		const bin = tsProtoGlobalThis.atob(b64)
		const arr = new Uint8Array(bin.length)
		for (let i = 0; i < bin.length; ++i) {
			arr[i] = bin.charCodeAt(i)
		}
		return arr
	}
}

function base64FromBytes(arr: Uint8Array): string {
	if (tsProtoGlobalThis.Buffer) {
		return tsProtoGlobalThis.Buffer.from(arr).toString("base64")
	} else {
		const bin: string[] = []
		arr.forEach((byte) => {
			bin.push(String.fromCharCode(byte))
		})
		return tsProtoGlobalThis.btoa(bin.join(""))
	}
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
	? T
	: T extends Array<infer U>
	? Array<DeepPartial<U>>
	: T extends ReadonlyArray<infer U>
	? ReadonlyArray<DeepPartial<U>>
	: T extends {}
	? { [K in keyof T]?: DeepPartial<T[K]> }
	: Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
	? P
	: P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never }

function isSet(value: any): boolean {
	return value !== null && value !== undefined
}
