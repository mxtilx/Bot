/**
 * eslint-disable
 *
 * @format
 */

import Long from "long"
import * as _m0 from "protobufjs/minimal"

export const protobufPackage = ""

export interface MainTenis {
  retcode?: number
  msg?: string
  url?: string
}

export interface ServerDispatchDataCBT2 {
  retcode?: number
  msg?: string
  regionName?: string
  ip?: string
  port?: number
  stopBeginTime?: number
  stopEndTime?: number
  dataUseAssetBoundle?: boolean
  resUseAssetBoundle?: boolean
  assetBundleUrl?: string
  exResourceUrl?: string
  luaUrl?: string
  asbRelogin?: number
  asbMemo?: string
  designDataRelogin?: number
  designDataMemo?: string
  clientSecretKey?: string
  recordGameObjectUserData?: string
  useTcp?: boolean
  customServiceUrl?: string
  operationFeedbackUrl?: string
  privacyInGameUrl?: string
  clientRecordReplay?: boolean
  serverDescription?: string
}

export interface ServerDispatchData {
  onlineReplayUploadUrl?: string
  iINOPFNCDEN?: boolean
  AsbReloginDesc?: string
  eventTrackingOpen?: boolean
  privacyInGameUrl?: string
  enableUploadBattleLog?: boolean
  customServiceUrl?: string
  name?: string
  cECLAOALPJD?: string
  stopEndTime?: number
  mValue?: number
  iFixPatchRevision?: string
  port?: number
  luaPatchVersion?: string
  communityActivityUrl?: string
  kMJAFDLEPOH?: string
  iOSExam?: boolean
  loginWhiteMsg?: string
  fOIJNCKDHNK?: boolean
  LuaBundleVersionUpdateUrl?: string
  officialCommunityUrl?: string
  mTPSwitch?: boolean
  DesignDataBundleVersionUpdateUrl?: string
  host?: string
  onlineReplayDownloadUrl?: string
  redeemCodeUrl?: string
  temporaryMaintenanceUrl?: string
  DesignDataReloginType?: number
  stopDesc?: string
  useTcp?: boolean
  stopBeginTime?: number
  PredownloadUpdateUrl?: string
  forbidRecharge?: boolean
  enableAssetBundleVersionUpdate?: boolean
  serverDescription?: string
  enableSaveReplayFile?: boolean
  thirdPrivacyInGameUrl?: string
  teenagerPrivacyInGameUrl?: string
  AsbReloginType?: number
  DesignDataReloginDesc?: string
  personalInformationInGameUrl?: string
  AssetBundleVersionUpdateUrl?: string
  operationFeedbackUrl?: string
  IFixPatchVersionUpdateUrl?: string
  enableDesignDataBundleVersionUpdate?: boolean
}

export interface RegionSimpleInfo {
  dispatchUrl?: string
  envType?: string
  name?: string
  title?: string
}

export interface QueryRegionListHttpRsp {
  regionList?: RegionSimpleInfo[]
}

/** Name: OBNNLPMNKJK */
export interface ServerDispatchDataNEW {
  port?: number
  KKHJNPJMNIN?: boolean
  HLGCFGBPDIH?: string
  AGCOHMIBFPO?: string
  HFGEFGFEMCN?: boolean
  CNEIJFENGAG?: string
  LNNIPPHEPOA?: boolean
  loginWhiteMsg?: string
  DOAMFCDLJIL?: number
  BOPLAMMNLFK?: number
  retcode?: number
  AFBOJAGEPFB?: boolean
  assetBundleUrl?: string
  GPFNNIDOAOK?: string
  MAHIBOGOGOC?: string
  OKGBJBACNKG?: string
  stopEndTime?: number
  CINCKAOLOBK?: boolean
  IJPFDPNMGCL?: string
  ACNKLOFEOJA?: string
  luaVersion?: string
  GHOOCKECBNE?: boolean
  luaUrl?: string
  replayUrl?: string
  JEGDHPFJFPG?: boolean
  HGEDHANHIFN?: boolean
  exResourceUrl?: string
  DIGDNMMEGFB?: string
  ip?: string
  clientSecretKey?: string
  OBLCBPBNLCM?: boolean
  ifixUrl?: string
  NGLCAOKANHM?: boolean
  DOGIAANDIKF?: string
  uploadReplayUrl?: string
  OLHLDGOHFBN?: string
  msg?: string
  BBNCMGGKJAE?: boolean
  MAEBANOEDMP?: string
  regionName?: string
  HBDMGJEDABD?: string
  GDOGBBPAPJH?: string
  LFIAADINMBB?: string
  stopBeginTime?: number
  DGCIOFAFOFN?: string
  LCIDMKEDDCL?: boolean
}

function createBaseMainTenis(): MainTenis {
  return { retcode: 0, msg: "", url: "" }
}

export const MainTenis = {
  encode(message: MainTenis, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.retcode !== undefined && message.retcode !== 0) {
      writer.uint32(8).uint32(message.retcode)
    }
    if (message.msg !== undefined && message.msg !== "") {
      writer.uint32(18).string(message.msg)
    }
    if (message.url !== undefined && message.url !== "") {
      writer.uint32(26).string(message.url)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MainTenis {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseMainTenis()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.retcode = reader.uint32()
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

          message.url = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): MainTenis {
    return {
      retcode: isSet(object.retcode) ? Number(object.retcode) : 0,
      msg: isSet(object.msg) ? String(object.msg) : "",
      url: isSet(object.url) ? String(object.url) : ""
    }
  },

  toJSON(message: MainTenis): unknown {
    const obj: any = {}
    message.retcode !== undefined && (obj.retcode = Math.round(message.retcode))
    message.msg !== undefined && (obj.msg = message.msg)
    message.url !== undefined && (obj.url = message.url)
    return obj
  },

  create<I extends Exact<DeepPartial<MainTenis>, I>>(base?: I): MainTenis {
    return MainTenis.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<MainTenis>, I>>(object: I): MainTenis {
    const message = createBaseMainTenis()
    message.retcode = object.retcode ?? 0
    message.msg = object.msg ?? ""
    message.url = object.url ?? ""
    return message
  }
}

function createBaseServerDispatchDataCBT2(): ServerDispatchDataCBT2 {
  return {
    retcode: 0,
    msg: "",
    regionName: "",
    ip: "",
    port: 0,
    stopBeginTime: 0,
    stopEndTime: 0,
    dataUseAssetBoundle: false,
    resUseAssetBoundle: false,
    assetBundleUrl: "",
    exResourceUrl: "",
    luaUrl: "",
    asbRelogin: 0,
    asbMemo: "",
    designDataRelogin: 0,
    designDataMemo: "",
    clientSecretKey: "",
    recordGameObjectUserData: "",
    useTcp: false,
    customServiceUrl: "",
    operationFeedbackUrl: "",
    privacyInGameUrl: "",
    clientRecordReplay: false,
    serverDescription: ""
  }
}

export const ServerDispatchDataCBT2 = {
  encode(message: ServerDispatchDataCBT2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.retcode !== undefined && message.retcode !== 0) {
      writer.uint32(8).uint32(message.retcode)
    }
    if (message.msg !== undefined && message.msg !== "") {
      writer.uint32(18).string(message.msg)
    }
    if (message.regionName !== undefined && message.regionName !== "") {
      writer.uint32(26).string(message.regionName)
    }
    if (message.ip !== undefined && message.ip !== "") {
      writer.uint32(34).string(message.ip)
    }
    if (message.port !== undefined && message.port !== 0) {
      writer.uint32(40).uint32(message.port)
    }
    if (message.stopBeginTime !== undefined && message.stopBeginTime !== 0) {
      writer.uint32(48).uint32(message.stopBeginTime)
    }
    if (message.stopEndTime !== undefined && message.stopEndTime !== 0) {
      writer.uint32(56).uint32(message.stopEndTime)
    }
    if (message.dataUseAssetBoundle === true) {
      writer.uint32(64).bool(message.dataUseAssetBoundle)
    }
    if (message.resUseAssetBoundle === true) {
      writer.uint32(72).bool(message.resUseAssetBoundle)
    }
    if (message.assetBundleUrl !== undefined && message.assetBundleUrl !== "") {
      writer.uint32(82).string(message.assetBundleUrl)
    }
    if (message.exResourceUrl !== undefined && message.exResourceUrl !== "") {
      writer.uint32(90).string(message.exResourceUrl)
    }
    if (message.luaUrl !== undefined && message.luaUrl !== "") {
      writer.uint32(98).string(message.luaUrl)
    }
    if (message.asbRelogin !== undefined && message.asbRelogin !== 0) {
      writer.uint32(104).uint32(message.asbRelogin)
    }
    if (message.asbMemo !== undefined && message.asbMemo !== "") {
      writer.uint32(114).string(message.asbMemo)
    }
    if (message.designDataRelogin !== undefined && message.designDataRelogin !== 0) {
      writer.uint32(120).uint32(message.designDataRelogin)
    }
    if (message.designDataMemo !== undefined && message.designDataMemo !== "") {
      writer.uint32(130).string(message.designDataMemo)
    }
    if (message.clientSecretKey !== undefined && message.clientSecretKey !== "") {
      writer.uint32(138).string(message.clientSecretKey)
    }
    if (message.recordGameObjectUserData !== undefined && message.recordGameObjectUserData !== "") {
      writer.uint32(146).string(message.recordGameObjectUserData)
    }
    if (message.useTcp === true) {
      writer.uint32(152).bool(message.useTcp)
    }
    if (message.customServiceUrl !== undefined && message.customServiceUrl !== "") {
      writer.uint32(162).string(message.customServiceUrl)
    }
    if (message.operationFeedbackUrl !== undefined && message.operationFeedbackUrl !== "") {
      writer.uint32(170).string(message.operationFeedbackUrl)
    }
    if (message.privacyInGameUrl !== undefined && message.privacyInGameUrl !== "") {
      writer.uint32(178).string(message.privacyInGameUrl)
    }
    if (message.clientRecordReplay === true) {
      writer.uint32(184).bool(message.clientRecordReplay)
    }
    if (message.serverDescription !== undefined && message.serverDescription !== "") {
      writer.uint32(194).string(message.serverDescription)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerDispatchDataCBT2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseServerDispatchDataCBT2()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.retcode = reader.uint32()
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

          message.regionName = reader.string()
          continue
        case 4:
          if (tag !== 34) {
            break
          }

          message.ip = reader.string()
          continue
        case 5:
          if (tag !== 40) {
            break
          }

          message.port = reader.uint32()
          continue
        case 6:
          if (tag !== 48) {
            break
          }

          message.stopBeginTime = reader.uint32()
          continue
        case 7:
          if (tag !== 56) {
            break
          }

          message.stopEndTime = reader.uint32()
          continue
        case 8:
          if (tag !== 64) {
            break
          }

          message.dataUseAssetBoundle = reader.bool()
          continue
        case 9:
          if (tag !== 72) {
            break
          }

          message.resUseAssetBoundle = reader.bool()
          continue
        case 10:
          if (tag !== 82) {
            break
          }

          message.assetBundleUrl = reader.string()
          continue
        case 11:
          if (tag !== 90) {
            break
          }

          message.exResourceUrl = reader.string()
          continue
        case 12:
          if (tag !== 98) {
            break
          }

          message.luaUrl = reader.string()
          continue
        case 13:
          if (tag !== 104) {
            break
          }

          message.asbRelogin = reader.uint32()
          continue
        case 14:
          if (tag !== 114) {
            break
          }

          message.asbMemo = reader.string()
          continue
        case 15:
          if (tag !== 120) {
            break
          }

          message.designDataRelogin = reader.uint32()
          continue
        case 16:
          if (tag !== 130) {
            break
          }

          message.designDataMemo = reader.string()
          continue
        case 17:
          if (tag !== 138) {
            break
          }

          message.clientSecretKey = reader.string()
          continue
        case 18:
          if (tag !== 146) {
            break
          }

          message.recordGameObjectUserData = reader.string()
          continue
        case 19:
          if (tag !== 152) {
            break
          }

          message.useTcp = reader.bool()
          continue
        case 20:
          if (tag !== 162) {
            break
          }

          message.customServiceUrl = reader.string()
          continue
        case 21:
          if (tag !== 170) {
            break
          }

          message.operationFeedbackUrl = reader.string()
          continue
        case 22:
          if (tag !== 178) {
            break
          }

          message.privacyInGameUrl = reader.string()
          continue
        case 23:
          if (tag !== 184) {
            break
          }

          message.clientRecordReplay = reader.bool()
          continue
        case 24:
          if (tag !== 194) {
            break
          }

          message.serverDescription = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ServerDispatchDataCBT2 {
    return {
      retcode: isSet(object.retcode) ? Number(object.retcode) : 0,
      msg: isSet(object.msg) ? String(object.msg) : "",
      regionName: isSet(object.regionName) ? String(object.regionName) : "",
      ip: isSet(object.ip) ? String(object.ip) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
      stopBeginTime: isSet(object.stopBeginTime) ? Number(object.stopBeginTime) : 0,
      stopEndTime: isSet(object.stopEndTime) ? Number(object.stopEndTime) : 0,
      dataUseAssetBoundle: isSet(object.dataUseAssetBoundle) ? Boolean(object.dataUseAssetBoundle) : false,
      resUseAssetBoundle: isSet(object.resUseAssetBoundle) ? Boolean(object.resUseAssetBoundle) : false,
      assetBundleUrl: isSet(object.assetBundleUrl) ? String(object.assetBundleUrl) : "",
      exResourceUrl: isSet(object.exResourceUrl) ? String(object.exResourceUrl) : "",
      luaUrl: isSet(object.luaUrl) ? String(object.luaUrl) : "",
      asbRelogin: isSet(object.asbRelogin) ? Number(object.asbRelogin) : 0,
      asbMemo: isSet(object.asbMemo) ? String(object.asbMemo) : "",
      designDataRelogin: isSet(object.designDataRelogin) ? Number(object.designDataRelogin) : 0,
      designDataMemo: isSet(object.designDataMemo) ? String(object.designDataMemo) : "",
      clientSecretKey: isSet(object.clientSecretKey) ? String(object.clientSecretKey) : "",
      recordGameObjectUserData: isSet(object.recordGameObjectUserData)
        ? String(object.recordGameObjectUserData)
        : "",
      useTcp: isSet(object.useTcp) ? Boolean(object.useTcp) : false,
      customServiceUrl: isSet(object.customServiceUrl) ? String(object.customServiceUrl) : "",
      operationFeedbackUrl: isSet(object.operationFeedbackUrl) ? String(object.operationFeedbackUrl) : "",
      privacyInGameUrl: isSet(object.privacyInGameUrl) ? String(object.privacyInGameUrl) : "",
      clientRecordReplay: isSet(object.clientRecordReplay) ? Boolean(object.clientRecordReplay) : false,
      serverDescription: isSet(object.serverDescription) ? String(object.serverDescription) : ""
    }
  },

  toJSON(message: ServerDispatchDataCBT2): unknown {
    const obj: any = {}
    message.retcode !== undefined && (obj.retcode = Math.round(message.retcode))
    message.msg !== undefined && (obj.msg = message.msg)
    message.regionName !== undefined && (obj.regionName = message.regionName)
    message.ip !== undefined && (obj.ip = message.ip)
    message.port !== undefined && (obj.port = Math.round(message.port))
    message.stopBeginTime !== undefined && (obj.stopBeginTime = Math.round(message.stopBeginTime))
    message.stopEndTime !== undefined && (obj.stopEndTime = Math.round(message.stopEndTime))
    message.dataUseAssetBoundle !== undefined && (obj.dataUseAssetBoundle = message.dataUseAssetBoundle)
    message.resUseAssetBoundle !== undefined && (obj.resUseAssetBoundle = message.resUseAssetBoundle)
    message.assetBundleUrl !== undefined && (obj.assetBundleUrl = message.assetBundleUrl)
    message.exResourceUrl !== undefined && (obj.exResourceUrl = message.exResourceUrl)
    message.luaUrl !== undefined && (obj.luaUrl = message.luaUrl)
    message.asbRelogin !== undefined && (obj.asbRelogin = Math.round(message.asbRelogin))
    message.asbMemo !== undefined && (obj.asbMemo = message.asbMemo)
    message.designDataRelogin !== undefined && (obj.designDataRelogin = Math.round(message.designDataRelogin))
    message.designDataMemo !== undefined && (obj.designDataMemo = message.designDataMemo)
    message.clientSecretKey !== undefined && (obj.clientSecretKey = message.clientSecretKey)
    message.recordGameObjectUserData !== undefined &&
      (obj.recordGameObjectUserData = message.recordGameObjectUserData)
    message.useTcp !== undefined && (obj.useTcp = message.useTcp)
    message.customServiceUrl !== undefined && (obj.customServiceUrl = message.customServiceUrl)
    message.operationFeedbackUrl !== undefined && (obj.operationFeedbackUrl = message.operationFeedbackUrl)
    message.privacyInGameUrl !== undefined && (obj.privacyInGameUrl = message.privacyInGameUrl)
    message.clientRecordReplay !== undefined && (obj.clientRecordReplay = message.clientRecordReplay)
    message.serverDescription !== undefined && (obj.serverDescription = message.serverDescription)
    return obj
  },

  create<I extends Exact<DeepPartial<ServerDispatchDataCBT2>, I>>(base?: I): ServerDispatchDataCBT2 {
    return ServerDispatchDataCBT2.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<ServerDispatchDataCBT2>, I>>(object: I): ServerDispatchDataCBT2 {
    const message = createBaseServerDispatchDataCBT2()
    message.retcode = object.retcode ?? 0
    message.msg = object.msg ?? ""
    message.regionName = object.regionName ?? ""
    message.ip = object.ip ?? ""
    message.port = object.port ?? 0
    message.stopBeginTime = object.stopBeginTime ?? 0
    message.stopEndTime = object.stopEndTime ?? 0
    message.dataUseAssetBoundle = object.dataUseAssetBoundle ?? false
    message.resUseAssetBoundle = object.resUseAssetBoundle ?? false
    message.assetBundleUrl = object.assetBundleUrl ?? ""
    message.exResourceUrl = object.exResourceUrl ?? ""
    message.luaUrl = object.luaUrl ?? ""
    message.asbRelogin = object.asbRelogin ?? 0
    message.asbMemo = object.asbMemo ?? ""
    message.designDataRelogin = object.designDataRelogin ?? 0
    message.designDataMemo = object.designDataMemo ?? ""
    message.clientSecretKey = object.clientSecretKey ?? ""
    message.recordGameObjectUserData = object.recordGameObjectUserData ?? ""
    message.useTcp = object.useTcp ?? false
    message.customServiceUrl = object.customServiceUrl ?? ""
    message.operationFeedbackUrl = object.operationFeedbackUrl ?? ""
    message.privacyInGameUrl = object.privacyInGameUrl ?? ""
    message.clientRecordReplay = object.clientRecordReplay ?? false
    message.serverDescription = object.serverDescription ?? ""
    return message
  }
}

function createBaseServerDispatchData(): ServerDispatchData {
  return {
    onlineReplayUploadUrl: "",
    iINOPFNCDEN: false,
    AsbReloginDesc: "",
    eventTrackingOpen: false,
    privacyInGameUrl: "",
    enableUploadBattleLog: false,
    customServiceUrl: "",
    name: "",
    cECLAOALPJD: "",
    stopEndTime: 0,
    mValue: 0,
    iFixPatchRevision: "",
    port: 0,
    luaPatchVersion: "",
    communityActivityUrl: "",
    kMJAFDLEPOH: "",
    iOSExam: false,
    loginWhiteMsg: "",
    fOIJNCKDHNK: false,
    LuaBundleVersionUpdateUrl: "",
    officialCommunityUrl: "",
    mTPSwitch: false,
    DesignDataBundleVersionUpdateUrl: "",
    host: "",
    onlineReplayDownloadUrl: "",
    redeemCodeUrl: "",
    temporaryMaintenanceUrl: "",
    DesignDataReloginType: 0,
    stopDesc: "",
    useTcp: false,
    stopBeginTime: 0,
    PredownloadUpdateUrl: "",
    forbidRecharge: false,
    enableAssetBundleVersionUpdate: false,
    serverDescription: "",
    enableSaveReplayFile: false,
    thirdPrivacyInGameUrl: "",
    teenagerPrivacyInGameUrl: "",
    AsbReloginType: 0,
    DesignDataReloginDesc: "",
    personalInformationInGameUrl: "",
    AssetBundleVersionUpdateUrl: "",
    operationFeedbackUrl: "",
    IFixPatchVersionUpdateUrl: "",
    enableDesignDataBundleVersionUpdate: false
  }
}

export const ServerDispatchData = {
  encode(message: ServerDispatchData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.onlineReplayUploadUrl !== undefined && message.onlineReplayUploadUrl !== "") {
      writer.uint32(1506).string(message.onlineReplayUploadUrl)
    }
    if (message.iINOPFNCDEN === true) {
      writer.uint32(2672).bool(message.iINOPFNCDEN)
    }
    if (message.AsbReloginDesc !== undefined && message.AsbReloginDesc !== "") {
      writer.uint32(58).string(message.AsbReloginDesc)
    }
    if (message.eventTrackingOpen === true) {
      writer.uint32(4392).bool(message.eventTrackingOpen)
    }
    if (message.privacyInGameUrl !== undefined && message.privacyInGameUrl !== "") {
      writer.uint32(6314).string(message.privacyInGameUrl)
    }
    if (message.enableUploadBattleLog === true) {
      writer.uint32(10720).bool(message.enableUploadBattleLog)
    }
    if (message.customServiceUrl !== undefined && message.customServiceUrl !== "") {
      writer.uint32(12170).string(message.customServiceUrl)
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(74).string(message.name)
    }
    if (message.cECLAOALPJD !== undefined && message.cECLAOALPJD !== "") {
      writer.uint32(15962).string(message.cECLAOALPJD)
    }
    if (message.stopEndTime !== undefined && message.stopEndTime !== 0) {
      writer.uint32(64).int64(message.stopEndTime)
    }
    if (message.mValue !== undefined && message.mValue !== 0) {
      writer.uint32(120).uint32(message.mValue)
    }
    if (message.iFixPatchRevision !== undefined && message.iFixPatchRevision !== "") {
      writer.uint32(11386).string(message.iFixPatchRevision)
    }
    if (message.port !== undefined && message.port !== 0) {
      writer.uint32(88).uint32(message.port)
    }
    if (message.luaPatchVersion !== undefined && message.luaPatchVersion !== "") {
      writer.uint32(2162).string(message.luaPatchVersion)
    }
    if (message.communityActivityUrl !== undefined && message.communityActivityUrl !== "") {
      writer.uint32(14010).string(message.communityActivityUrl)
    }
    if (message.kMJAFDLEPOH !== undefined && message.kMJAFDLEPOH !== "") {
      writer.uint32(3778).string(message.kMJAFDLEPOH)
    }
    if (message.iOSExam === true) {
      writer.uint32(8920).bool(message.iOSExam)
    }
    if (message.loginWhiteMsg !== undefined && message.loginWhiteMsg !== "") {
      writer.uint32(3770).string(message.loginWhiteMsg)
    }
    if (message.fOIJNCKDHNK === true) {
      writer.uint32(3320).bool(message.fOIJNCKDHNK)
    }
    if (message.LuaBundleVersionUpdateUrl !== undefined && message.LuaBundleVersionUpdateUrl !== "") {
      writer.uint32(34).string(message.LuaBundleVersionUpdateUrl)
    }
    if (message.officialCommunityUrl !== undefined && message.officialCommunityUrl !== "") {
      writer.uint32(3082).string(message.officialCommunityUrl)
    }
    if (message.mTPSwitch === true) {
      writer.uint32(5472).bool(message.mTPSwitch)
    }
    if (message.DesignDataBundleVersionUpdateUrl !== undefined && message.DesignDataBundleVersionUpdateUrl !== "") {
      writer.uint32(50).string(message.DesignDataBundleVersionUpdateUrl)
    }
    if (message.host !== undefined && message.host !== "") {
      writer.uint32(106).string(message.host)
    }
    if (message.onlineReplayDownloadUrl !== undefined && message.onlineReplayDownloadUrl !== "") {
      writer.uint32(14170).string(message.onlineReplayDownloadUrl)
    }
    if (message.redeemCodeUrl !== undefined && message.redeemCodeUrl !== "") {
      writer.uint32(1930).string(message.redeemCodeUrl)
    }
    if (message.temporaryMaintenanceUrl !== undefined && message.temporaryMaintenanceUrl !== "") {
      writer.uint32(8674).string(message.temporaryMaintenanceUrl)
    }
    if (message.DesignDataReloginType !== undefined && message.DesignDataReloginType !== 0) {
      writer.uint32(24).uint32(message.DesignDataReloginType)
    }
    if (message.stopDesc !== undefined && message.stopDesc !== "") {
      writer.uint32(114).string(message.stopDesc)
    }
    if (message.useTcp === true) {
      writer.uint32(16352).bool(message.useTcp)
    }
    if (message.stopBeginTime !== undefined && message.stopBeginTime !== 0) {
      writer.uint32(16).int64(message.stopBeginTime)
    }
    if (message.PredownloadUpdateUrl !== undefined && message.PredownloadUpdateUrl !== "") {
      writer.uint32(10210).string(message.PredownloadUpdateUrl)
    }
    if (message.forbidRecharge === true) {
      writer.uint32(13272).bool(message.forbidRecharge)
    }
    if (message.enableAssetBundleVersionUpdate === true) {
      writer.uint32(96).bool(message.enableAssetBundleVersionUpdate)
    }
    if (message.serverDescription !== undefined && message.serverDescription !== "") {
      writer.uint32(1938).string(message.serverDescription)
    }
    if (message.enableSaveReplayFile === true) {
      writer.uint32(2448).bool(message.enableSaveReplayFile)
    }
    if (message.thirdPrivacyInGameUrl !== undefined && message.thirdPrivacyInGameUrl !== "") {
      writer.uint32(5274).string(message.thirdPrivacyInGameUrl)
    }
    if (message.teenagerPrivacyInGameUrl !== undefined && message.teenagerPrivacyInGameUrl !== "") {
      writer.uint32(698).string(message.teenagerPrivacyInGameUrl)
    }
    if (message.AsbReloginType !== undefined && message.AsbReloginType !== 0) {
      writer.uint32(80).uint32(message.AsbReloginType)
    }
    if (message.DesignDataReloginDesc !== undefined && message.DesignDataReloginDesc !== "") {
      writer.uint32(7410).string(message.DesignDataReloginDesc)
    }
    if (message.personalInformationInGameUrl !== undefined && message.personalInformationInGameUrl !== "") {
      writer.uint32(7770).string(message.personalInformationInGameUrl)
    }
    if (message.AssetBundleVersionUpdateUrl !== undefined && message.AssetBundleVersionUpdateUrl !== "") {
      writer.uint32(10).string(message.AssetBundleVersionUpdateUrl)
    }
    if (message.operationFeedbackUrl !== undefined && message.operationFeedbackUrl !== "") {
      writer.uint32(5634).string(message.operationFeedbackUrl)
    }
    if (message.IFixPatchVersionUpdateUrl !== undefined && message.IFixPatchVersionUpdateUrl !== "") {
      writer.uint32(11770).string(message.IFixPatchVersionUpdateUrl)
    }
    if (message.enableDesignDataBundleVersionUpdate === true) {
      writer.uint32(40).bool(message.enableDesignDataBundleVersionUpdate)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerDispatchData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseServerDispatchData()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 188:
          if (tag !== 1506) {
            break
          }

          message.onlineReplayUploadUrl = reader.string()
          continue
        case 334:
          if (tag !== 2672) {
            break
          }

          message.iINOPFNCDEN = reader.bool()
          continue
        case 7:
          if (tag !== 58) {
            break
          }

          message.AsbReloginDesc = reader.string()
          continue
        case 549:
          if (tag !== 4392) {
            break
          }

          message.eventTrackingOpen = reader.bool()
          continue
        case 789:
          if (tag !== 6314) {
            break
          }

          message.privacyInGameUrl = reader.string()
          continue
        case 1340:
          if (tag !== 10720) {
            break
          }

          message.enableUploadBattleLog = reader.bool()
          continue
        case 1521:
          if (tag !== 12170) {
            break
          }

          message.customServiceUrl = reader.string()
          continue
        case 9:
          if (tag !== 74) {
            break
          }

          message.name = reader.string()
          continue
        case 1995:
          if (tag !== 15962) {
            break
          }

          message.cECLAOALPJD = reader.string()
          continue
        case 8:
          if (tag !== 64) {
            break
          }

          message.stopEndTime = longToNumber(reader.int64() as Long)
          continue
        case 15:
          if (tag !== 120) {
            break
          }

          message.mValue = reader.uint32()
          continue
        case 1423:
          if (tag !== 11386) {
            break
          }

          message.iFixPatchRevision = reader.string()
          continue
        case 11:
          if (tag !== 88) {
            break
          }

          message.port = reader.uint32()
          continue
        case 270:
          if (tag !== 2162) {
            break
          }

          message.luaPatchVersion = reader.string()
          continue
        case 1751:
          if (tag !== 14010) {
            break
          }

          message.communityActivityUrl = reader.string()
          continue
        case 472:
          if (tag !== 3778) {
            break
          }

          message.kMJAFDLEPOH = reader.string()
          continue
        case 1115:
          if (tag !== 8920) {
            break
          }

          message.iOSExam = reader.bool()
          continue
        case 471:
          if (tag !== 3770) {
            break
          }

          message.loginWhiteMsg = reader.string()
          continue
        case 415:
          if (tag !== 3320) {
            break
          }

          message.fOIJNCKDHNK = reader.bool()
          continue
        case 4:
          if (tag !== 34) {
            break
          }

          message.LuaBundleVersionUpdateUrl = reader.string()
          continue
        case 385:
          if (tag !== 3082) {
            break
          }

          message.officialCommunityUrl = reader.string()
          continue
        case 684:
          if (tag !== 5472) {
            break
          }

          message.mTPSwitch = reader.bool()
          continue
        case 6:
          if (tag !== 50) {
            break
          }

          message.DesignDataBundleVersionUpdateUrl = reader.string()
          continue
        case 13:
          if (tag !== 106) {
            break
          }

          message.host = reader.string()
          continue
        case 1771:
          if (tag !== 14170) {
            break
          }

          message.onlineReplayDownloadUrl = reader.string()
          continue
        case 241:
          if (tag !== 1930) {
            break
          }

          message.redeemCodeUrl = reader.string()
          continue
        case 1084:
          if (tag !== 8674) {
            break
          }

          message.temporaryMaintenanceUrl = reader.string()
          continue
        case 3:
          if (tag !== 24) {
            break
          }

          message.DesignDataReloginType = reader.uint32()
          continue
        case 14:
          if (tag !== 114) {
            break
          }

          message.stopDesc = reader.string()
          continue
        case 2044:
          if (tag !== 16352) {
            break
          }

          message.useTcp = reader.bool()
          continue
        case 2:
          if (tag !== 16) {
            break
          }

          message.stopBeginTime = longToNumber(reader.int64() as Long)
          continue
        case 1276:
          if (tag !== 10210) {
            break
          }

          message.PredownloadUpdateUrl = reader.string()
          continue
        case 1659:
          if (tag !== 13272) {
            break
          }

          message.forbidRecharge = reader.bool()
          continue
        case 12:
          if (tag !== 96) {
            break
          }

          message.enableAssetBundleVersionUpdate = reader.bool()
          continue
        case 242:
          if (tag !== 1938) {
            break
          }

          message.serverDescription = reader.string()
          continue
        case 306:
          if (tag !== 2448) {
            break
          }

          message.enableSaveReplayFile = reader.bool()
          continue
        case 659:
          if (tag !== 5274) {
            break
          }

          message.thirdPrivacyInGameUrl = reader.string()
          continue
        case 87:
          if (tag !== 698) {
            break
          }

          message.teenagerPrivacyInGameUrl = reader.string()
          continue
        case 10:
          if (tag !== 80) {
            break
          }

          message.AsbReloginType = reader.uint32()
          continue
        case 926:
          if (tag !== 7410) {
            break
          }

          message.DesignDataReloginDesc = reader.string()
          continue
        case 971:
          if (tag !== 7770) {
            break
          }

          message.personalInformationInGameUrl = reader.string()
          continue
        case 1:
          if (tag !== 10) {
            break
          }

          message.AssetBundleVersionUpdateUrl = reader.string()
          continue
        case 704:
          if (tag !== 5634) {
            break
          }

          message.operationFeedbackUrl = reader.string()
          continue
        case 1471:
          if (tag !== 11770) {
            break
          }

          message.IFixPatchVersionUpdateUrl = reader.string()
          continue
        case 5:
          if (tag !== 40) {
            break
          }

          message.enableDesignDataBundleVersionUpdate = reader.bool()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ServerDispatchData {
    return {
      onlineReplayUploadUrl: isSet(object.onlineReplayUploadUrl) ? String(object.onlineReplayUploadUrl) : "",
      iINOPFNCDEN: isSet(object.iINOPFNCDEN) ? Boolean(object.iINOPFNCDEN) : false,
      AsbReloginDesc: isSet(object.AsbReloginDesc) ? String(object.AsbReloginDesc) : "",
      eventTrackingOpen: isSet(object.eventTrackingOpen) ? Boolean(object.eventTrackingOpen) : false,
      privacyInGameUrl: isSet(object.privacyInGameUrl) ? String(object.privacyInGameUrl) : "",
      enableUploadBattleLog: isSet(object.enableUploadBattleLog) ? Boolean(object.enableUploadBattleLog) : false,
      customServiceUrl: isSet(object.customServiceUrl) ? String(object.customServiceUrl) : "",
      name: isSet(object.name) ? String(object.name) : "",
      cECLAOALPJD: isSet(object.cECLAOALPJD) ? String(object.cECLAOALPJD) : "",
      stopEndTime: isSet(object.stopEndTime) ? Number(object.stopEndTime) : 0,
      mValue: isSet(object.mValue) ? Number(object.mValue) : 0,
      iFixPatchRevision: isSet(object.iFixPatchRevision) ? String(object.iFixPatchRevision) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
      luaPatchVersion: isSet(object.luaPatchVersion) ? String(object.luaPatchVersion) : "",
      communityActivityUrl: isSet(object.communityActivityUrl) ? String(object.communityActivityUrl) : "",
      kMJAFDLEPOH: isSet(object.kMJAFDLEPOH) ? String(object.kMJAFDLEPOH) : "",
      iOSExam: isSet(object.iOSExam) ? Boolean(object.iOSExam) : false,
      loginWhiteMsg: isSet(object.loginWhiteMsg) ? String(object.loginWhiteMsg) : "",
      fOIJNCKDHNK: isSet(object.fOIJNCKDHNK) ? Boolean(object.fOIJNCKDHNK) : false,
      LuaBundleVersionUpdateUrl: isSet(object.LuaBundleVersionUpdateUrl)
        ? String(object.LuaBundleVersionUpdateUrl)
        : "",
      officialCommunityUrl: isSet(object.officialCommunityUrl) ? String(object.officialCommunityUrl) : "",
      mTPSwitch: isSet(object.mTPSwitch) ? Boolean(object.mTPSwitch) : false,
      DesignDataBundleVersionUpdateUrl: isSet(object.DesignDataBundleVersionUpdateUrl)
        ? String(object.DesignDataBundleVersionUpdateUrl)
        : "",
      host: isSet(object.host) ? String(object.host) : "",
      onlineReplayDownloadUrl: isSet(object.onlineReplayDownloadUrl)
        ? String(object.onlineReplayDownloadUrl)
        : "",
      redeemCodeUrl: isSet(object.redeemCodeUrl) ? String(object.redeemCodeUrl) : "",
      temporaryMaintenanceUrl: isSet(object.temporaryMaintenanceUrl)
        ? String(object.temporaryMaintenanceUrl)
        : "",
      DesignDataReloginType: isSet(object.DesignDataReloginType) ? Number(object.DesignDataReloginType) : 0,
      stopDesc: isSet(object.stopDesc) ? String(object.stopDesc) : "",
      useTcp: isSet(object.useTcp) ? Boolean(object.useTcp) : false,
      stopBeginTime: isSet(object.stopBeginTime) ? Number(object.stopBeginTime) : 0,
      PredownloadUpdateUrl: isSet(object.PredownloadUpdateUrl) ? String(object.PredownloadUpdateUrl) : "",
      forbidRecharge: isSet(object.forbidRecharge) ? Boolean(object.forbidRecharge) : false,
      enableAssetBundleVersionUpdate: isSet(object.enableAssetBundleVersionUpdate)
        ? Boolean(object.enableAssetBundleVersionUpdate)
        : false,
      serverDescription: isSet(object.serverDescription) ? String(object.serverDescription) : "",
      enableSaveReplayFile: isSet(object.enableSaveReplayFile) ? Boolean(object.enableSaveReplayFile) : false,
      thirdPrivacyInGameUrl: isSet(object.thirdPrivacyInGameUrl) ? String(object.thirdPrivacyInGameUrl) : "",
      teenagerPrivacyInGameUrl: isSet(object.teenagerPrivacyInGameUrl)
        ? String(object.teenagerPrivacyInGameUrl)
        : "",
      AsbReloginType: isSet(object.AsbReloginType) ? Number(object.AsbReloginType) : 0,
      DesignDataReloginDesc: isSet(object.DesignDataReloginDesc) ? String(object.DesignDataReloginDesc) : "",
      personalInformationInGameUrl: isSet(object.personalInformationInGameUrl)
        ? String(object.personalInformationInGameUrl)
        : "",
      AssetBundleVersionUpdateUrl: isSet(object.AssetBundleVersionUpdateUrl)
        ? String(object.AssetBundleVersionUpdateUrl)
        : "",
      operationFeedbackUrl: isSet(object.operationFeedbackUrl) ? String(object.operationFeedbackUrl) : "",
      IFixPatchVersionUpdateUrl: isSet(object.IFixPatchVersionUpdateUrl)
        ? String(object.IFixPatchVersionUpdateUrl)
        : "",
      enableDesignDataBundleVersionUpdate: isSet(object.enableDesignDataBundleVersionUpdate)
        ? Boolean(object.enableDesignDataBundleVersionUpdate)
        : false
    }
  },

  toJSON(message: ServerDispatchData): unknown {
    const obj: any = {}
    message.onlineReplayUploadUrl !== undefined && (obj.onlineReplayUploadUrl = message.onlineReplayUploadUrl)
    message.iINOPFNCDEN !== undefined && (obj.iINOPFNCDEN = message.iINOPFNCDEN)
    message.AsbReloginDesc !== undefined && (obj.AsbReloginDesc = message.AsbReloginDesc)
    message.eventTrackingOpen !== undefined && (obj.eventTrackingOpen = message.eventTrackingOpen)
    message.privacyInGameUrl !== undefined && (obj.privacyInGameUrl = message.privacyInGameUrl)
    message.enableUploadBattleLog !== undefined && (obj.enableUploadBattleLog = message.enableUploadBattleLog)
    message.customServiceUrl !== undefined && (obj.customServiceUrl = message.customServiceUrl)
    message.name !== undefined && (obj.name = message.name)
    message.cECLAOALPJD !== undefined && (obj.cECLAOALPJD = message.cECLAOALPJD)
    message.stopEndTime !== undefined && (obj.stopEndTime = Math.round(message.stopEndTime))
    message.mValue !== undefined && (obj.mValue = Math.round(message.mValue))
    message.iFixPatchRevision !== undefined && (obj.iFixPatchRevision = message.iFixPatchRevision)
    message.port !== undefined && (obj.port = Math.round(message.port))
    message.luaPatchVersion !== undefined && (obj.luaPatchVersion = message.luaPatchVersion)
    message.communityActivityUrl !== undefined && (obj.communityActivityUrl = message.communityActivityUrl)
    message.kMJAFDLEPOH !== undefined && (obj.kMJAFDLEPOH = message.kMJAFDLEPOH)
    message.iOSExam !== undefined && (obj.iOSExam = message.iOSExam)
    message.loginWhiteMsg !== undefined && (obj.loginWhiteMsg = message.loginWhiteMsg)
    message.fOIJNCKDHNK !== undefined && (obj.fOIJNCKDHNK = message.fOIJNCKDHNK)
    message.LuaBundleVersionUpdateUrl !== undefined &&
      (obj.LuaBundleVersionUpdateUrl = message.LuaBundleVersionUpdateUrl)
    message.officialCommunityUrl !== undefined && (obj.officialCommunityUrl = message.officialCommunityUrl)
    message.mTPSwitch !== undefined && (obj.mTPSwitch = message.mTPSwitch)
    message.DesignDataBundleVersionUpdateUrl !== undefined &&
      (obj.DesignDataBundleVersionUpdateUrl = message.DesignDataBundleVersionUpdateUrl)
    message.host !== undefined && (obj.host = message.host)
    message.onlineReplayDownloadUrl !== undefined && (obj.onlineReplayDownloadUrl = message.onlineReplayDownloadUrl)
    message.redeemCodeUrl !== undefined && (obj.redeemCodeUrl = message.redeemCodeUrl)
    message.temporaryMaintenanceUrl !== undefined && (obj.temporaryMaintenanceUrl = message.temporaryMaintenanceUrl)
    message.DesignDataReloginType !== undefined &&
      (obj.DesignDataReloginType = Math.round(message.DesignDataReloginType))
    message.stopDesc !== undefined && (obj.stopDesc = message.stopDesc)
    message.useTcp !== undefined && (obj.useTcp = message.useTcp)
    message.stopBeginTime !== undefined && (obj.stopBeginTime = Math.round(message.stopBeginTime))
    message.PredownloadUpdateUrl !== undefined && (obj.PredownloadUpdateUrl = message.PredownloadUpdateUrl)
    message.forbidRecharge !== undefined && (obj.forbidRecharge = message.forbidRecharge)
    message.enableAssetBundleVersionUpdate !== undefined &&
      (obj.enableAssetBundleVersionUpdate = message.enableAssetBundleVersionUpdate)
    message.serverDescription !== undefined && (obj.serverDescription = message.serverDescription)
    message.enableSaveReplayFile !== undefined && (obj.enableSaveReplayFile = message.enableSaveReplayFile)
    message.thirdPrivacyInGameUrl !== undefined && (obj.thirdPrivacyInGameUrl = message.thirdPrivacyInGameUrl)
    message.teenagerPrivacyInGameUrl !== undefined &&
      (obj.teenagerPrivacyInGameUrl = message.teenagerPrivacyInGameUrl)
    message.AsbReloginType !== undefined && (obj.AsbReloginType = Math.round(message.AsbReloginType))
    message.DesignDataReloginDesc !== undefined && (obj.DesignDataReloginDesc = message.DesignDataReloginDesc)
    message.personalInformationInGameUrl !== undefined &&
      (obj.personalInformationInGameUrl = message.personalInformationInGameUrl)
    message.AssetBundleVersionUpdateUrl !== undefined &&
      (obj.AssetBundleVersionUpdateUrl = message.AssetBundleVersionUpdateUrl)
    message.operationFeedbackUrl !== undefined && (obj.operationFeedbackUrl = message.operationFeedbackUrl)
    message.IFixPatchVersionUpdateUrl !== undefined &&
      (obj.IFixPatchVersionUpdateUrl = message.IFixPatchVersionUpdateUrl)
    message.enableDesignDataBundleVersionUpdate !== undefined &&
      (obj.enableDesignDataBundleVersionUpdate = message.enableDesignDataBundleVersionUpdate)
    return obj
  },

  create<I extends Exact<DeepPartial<ServerDispatchData>, I>>(base?: I): ServerDispatchData {
    return ServerDispatchData.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<ServerDispatchData>, I>>(object: I): ServerDispatchData {
    const message = createBaseServerDispatchData()
    message.onlineReplayUploadUrl = object.onlineReplayUploadUrl ?? ""
    message.iINOPFNCDEN = object.iINOPFNCDEN ?? false
    message.AsbReloginDesc = object.AsbReloginDesc ?? ""
    message.eventTrackingOpen = object.eventTrackingOpen ?? false
    message.privacyInGameUrl = object.privacyInGameUrl ?? ""
    message.enableUploadBattleLog = object.enableUploadBattleLog ?? false
    message.customServiceUrl = object.customServiceUrl ?? ""
    message.name = object.name ?? ""
    message.cECLAOALPJD = object.cECLAOALPJD ?? ""
    message.stopEndTime = object.stopEndTime ?? 0
    message.mValue = object.mValue ?? 0
    message.iFixPatchRevision = object.iFixPatchRevision ?? ""
    message.port = object.port ?? 0
    message.luaPatchVersion = object.luaPatchVersion ?? ""
    message.communityActivityUrl = object.communityActivityUrl ?? ""
    message.kMJAFDLEPOH = object.kMJAFDLEPOH ?? ""
    message.iOSExam = object.iOSExam ?? false
    message.loginWhiteMsg = object.loginWhiteMsg ?? ""
    message.fOIJNCKDHNK = object.fOIJNCKDHNK ?? false
    message.LuaBundleVersionUpdateUrl = object.LuaBundleVersionUpdateUrl ?? ""
    message.officialCommunityUrl = object.officialCommunityUrl ?? ""
    message.mTPSwitch = object.mTPSwitch ?? false
    message.DesignDataBundleVersionUpdateUrl = object.DesignDataBundleVersionUpdateUrl ?? ""
    message.host = object.host ?? ""
    message.onlineReplayDownloadUrl = object.onlineReplayDownloadUrl ?? ""
    message.redeemCodeUrl = object.redeemCodeUrl ?? ""
    message.temporaryMaintenanceUrl = object.temporaryMaintenanceUrl ?? ""
    message.DesignDataReloginType = object.DesignDataReloginType ?? 0
    message.stopDesc = object.stopDesc ?? ""
    message.useTcp = object.useTcp ?? false
    message.stopBeginTime = object.stopBeginTime ?? 0
    message.PredownloadUpdateUrl = object.PredownloadUpdateUrl ?? ""
    message.forbidRecharge = object.forbidRecharge ?? false
    message.enableAssetBundleVersionUpdate = object.enableAssetBundleVersionUpdate ?? false
    message.serverDescription = object.serverDescription ?? ""
    message.enableSaveReplayFile = object.enableSaveReplayFile ?? false
    message.thirdPrivacyInGameUrl = object.thirdPrivacyInGameUrl ?? ""
    message.teenagerPrivacyInGameUrl = object.teenagerPrivacyInGameUrl ?? ""
    message.AsbReloginType = object.AsbReloginType ?? 0
    message.DesignDataReloginDesc = object.DesignDataReloginDesc ?? ""
    message.personalInformationInGameUrl = object.personalInformationInGameUrl ?? ""
    message.AssetBundleVersionUpdateUrl = object.AssetBundleVersionUpdateUrl ?? ""
    message.operationFeedbackUrl = object.operationFeedbackUrl ?? ""
    message.IFixPatchVersionUpdateUrl = object.IFixPatchVersionUpdateUrl ?? ""
    message.enableDesignDataBundleVersionUpdate = object.enableDesignDataBundleVersionUpdate ?? false
    return message
  }
}

function createBaseRegionSimpleInfo(): RegionSimpleInfo {
  return { dispatchUrl: "", envType: "", name: "", title: "" }
}

export const RegionSimpleInfo = {
  encode(message: RegionSimpleInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dispatchUrl !== undefined && message.dispatchUrl !== "") {
      writer.uint32(26).string(message.dispatchUrl)
    }
    if (message.envType !== undefined && message.envType !== "") {
      writer.uint32(34).string(message.envType)
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name)
    }
    if (message.title !== undefined && message.title !== "") {
      writer.uint32(42).string(message.title)
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
        case 3:
          if (tag !== 26) {
            break
          }

          message.dispatchUrl = reader.string()
          continue
        case 4:
          if (tag !== 34) {
            break
          }

          message.envType = reader.string()
          continue
        case 1:
          if (tag !== 10) {
            break
          }

          message.name = reader.string()
          continue
        case 5:
          if (tag !== 42) {
            break
          }

          message.title = reader.string()
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
      dispatchUrl: isSet(object.dispatchUrl) ? String(object.dispatchUrl) : "",
      envType: isSet(object.envType) ? String(object.envType) : "",
      name: isSet(object.name) ? String(object.name) : "",
      title: isSet(object.title) ? String(object.title) : ""
    }
  },

  toJSON(message: RegionSimpleInfo): unknown {
    const obj: any = {}
    message.dispatchUrl !== undefined && (obj.dispatchUrl = message.dispatchUrl)
    message.envType !== undefined && (obj.envType = message.envType)
    message.name !== undefined && (obj.name = message.name)
    message.title !== undefined && (obj.title = message.title)
    return obj
  },

  create<I extends Exact<DeepPartial<RegionSimpleInfo>, I>>(base?: I): RegionSimpleInfo {
    return RegionSimpleInfo.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<RegionSimpleInfo>, I>>(object: I): RegionSimpleInfo {
    const message = createBaseRegionSimpleInfo()
    message.dispatchUrl = object.dispatchUrl ?? ""
    message.envType = object.envType ?? ""
    message.name = object.name ?? ""
    message.title = object.title ?? ""
    return message
  }
}

function createBaseQueryRegionListHttpRsp(): QueryRegionListHttpRsp {
  return { regionList: [] }
}

export const QueryRegionListHttpRsp = {
  encode(message: QueryRegionListHttpRsp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.regionList !== undefined && message.regionList.length !== 0) {
      for (const v of message.regionList) {
        RegionSimpleInfo.encode(v!, writer.uint32(34).fork()).ldelim()
      }
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
        case 4:
          if (tag !== 34) {
            break
          }

          message.regionList!.push(RegionSimpleInfo.decode(reader, reader.uint32()))
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
      regionList: Array.isArray(object?.regionList)
        ? object.regionList.map((e: any) => RegionSimpleInfo.fromJSON(e))
        : []
    }
  },

  toJSON(message: QueryRegionListHttpRsp): unknown {
    const obj: any = {}
    if (message.regionList) {
      obj.regionList = message.regionList.map((e) => (e ? RegionSimpleInfo.toJSON(e) : undefined))
    } else {
      obj.regionList = []
    }
    return obj
  },

  create<I extends Exact<DeepPartial<QueryRegionListHttpRsp>, I>>(base?: I): QueryRegionListHttpRsp {
    return QueryRegionListHttpRsp.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<QueryRegionListHttpRsp>, I>>(object: I): QueryRegionListHttpRsp {
    const message = createBaseQueryRegionListHttpRsp()
    message.regionList = object.regionList?.map((e) => RegionSimpleInfo.fromPartial(e)) || []
    return message
  }
}

function createBaseServerDispatchDataNEW(): ServerDispatchDataNEW {
  return {
    port: 0,
    KKHJNPJMNIN: false,
    HLGCFGBPDIH: "",
    AGCOHMIBFPO: "",
    HFGEFGFEMCN: false,
    CNEIJFENGAG: "",
    LNNIPPHEPOA: false,
    loginWhiteMsg: "",
    DOAMFCDLJIL: 0,
    BOPLAMMNLFK: 0,
    retcode: 0,
    AFBOJAGEPFB: false,
    assetBundleUrl: "",
    GPFNNIDOAOK: "",
    MAHIBOGOGOC: "",
    OKGBJBACNKG: "",
    stopEndTime: 0,
    CINCKAOLOBK: false,
    IJPFDPNMGCL: "",
    ACNKLOFEOJA: "",
    luaVersion: "",
    GHOOCKECBNE: false,
    luaUrl: "",
    replayUrl: "",
    JEGDHPFJFPG: false,
    HGEDHANHIFN: false,
    exResourceUrl: "",
    DIGDNMMEGFB: "",
    ip: "",
    clientSecretKey: "",
    OBLCBPBNLCM: false,
    ifixUrl: "",
    NGLCAOKANHM: false,
    DOGIAANDIKF: "",
    uploadReplayUrl: "",
    OLHLDGOHFBN: "",
    msg: "",
    BBNCMGGKJAE: false,
    MAEBANOEDMP: "",
    regionName: "",
    HBDMGJEDABD: "",
    GDOGBBPAPJH: "",
    LFIAADINMBB: "",
    stopBeginTime: 0,
    DGCIOFAFOFN: "",
    LCIDMKEDDCL: false
  }
}

export const ServerDispatchDataNEW = {
  encode(message: ServerDispatchDataNEW, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port !== undefined && message.port !== 0) {
      writer.uint32(16).uint32(message.port)
    }
    if (message.KKHJNPJMNIN === true) {
      writer.uint32(9904).bool(message.KKHJNPJMNIN)
    }
    if (message.HLGCFGBPDIH !== undefined && message.HLGCFGBPDIH !== "") {
      writer.uint32(5794).string(message.HLGCFGBPDIH)
    }
    if (message.AGCOHMIBFPO !== undefined && message.AGCOHMIBFPO !== "") {
      writer.uint32(818).string(message.AGCOHMIBFPO)
    }
    if (message.HFGEFGFEMCN === true) {
      writer.uint32(1544).bool(message.HFGEFGFEMCN)
    }
    if (message.CNEIJFENGAG !== undefined && message.CNEIJFENGAG !== "") {
      writer.uint32(1858).string(message.CNEIJFENGAG)
    }
    if (message.LNNIPPHEPOA === true) {
      writer.uint32(80).bool(message.LNNIPPHEPOA)
    }
    if (message.loginWhiteMsg !== undefined && message.loginWhiteMsg !== "") {
      writer.uint32(5234).string(message.loginWhiteMsg)
    }
    if (message.DOAMFCDLJIL !== undefined && message.DOAMFCDLJIL !== 0) {
      writer.uint32(64).uint32(message.DOAMFCDLJIL)
    }
    if (message.BOPLAMMNLFK !== undefined && message.BOPLAMMNLFK !== 0) {
      writer.uint32(72).uint32(message.BOPLAMMNLFK)
    }
    if (message.retcode !== undefined && message.retcode !== 0) {
      writer.uint32(120).uint32(message.retcode)
    }
    if (message.AFBOJAGEPFB === true) {
      writer.uint32(6304).bool(message.AFBOJAGEPFB)
    }
    if (message.assetBundleUrl !== undefined && message.assetBundleUrl !== "") {
      writer.uint32(114).string(message.assetBundleUrl)
    }
    if (message.GPFNNIDOAOK !== undefined && message.GPFNNIDOAOK !== "") {
      writer.uint32(1778).string(message.GPFNNIDOAOK)
    }
    if (message.MAHIBOGOGOC !== undefined && message.MAHIBOGOGOC !== "") {
      writer.uint32(90).string(message.MAHIBOGOGOC)
    }
    if (message.OKGBJBACNKG !== undefined && message.OKGBJBACNKG !== "") {
      writer.uint32(8858).string(message.OKGBJBACNKG)
    }
    if (message.stopEndTime !== undefined && message.stopEndTime !== 0) {
      writer.uint32(40).int64(message.stopEndTime)
    }
    if (message.CINCKAOLOBK === true) {
      writer.uint32(10992).bool(message.CINCKAOLOBK)
    }
    if (message.IJPFDPNMGCL !== undefined && message.IJPFDPNMGCL !== "") {
      writer.uint32(13362).string(message.IJPFDPNMGCL)
    }
    if (message.ACNKLOFEOJA !== undefined && message.ACNKLOFEOJA !== "") {
      writer.uint32(12738).string(message.ACNKLOFEOJA)
    }
    if (message.luaVersion !== undefined && message.luaVersion !== "") {
      writer.uint32(2794).string(message.luaVersion)
    }
    if (message.GHOOCKECBNE === true) {
      writer.uint32(15888).bool(message.GHOOCKECBNE)
    }
    if (message.luaUrl !== undefined && message.luaUrl !== "") {
      writer.uint32(34).string(message.luaUrl)
    }
    if (message.replayUrl !== undefined && message.replayUrl !== "") {
      writer.uint32(11010).string(message.replayUrl)
    }
    if (message.JEGDHPFJFPG === true) {
      writer.uint32(24).bool(message.JEGDHPFJFPG)
    }
    if (message.HGEDHANHIFN === true) {
      writer.uint32(4976).bool(message.HGEDHANHIFN)
    }
    if (message.exResourceUrl !== undefined && message.exResourceUrl !== "") {
      writer.uint32(50).string(message.exResourceUrl)
    }
    if (message.DIGDNMMEGFB !== undefined && message.DIGDNMMEGFB !== "") {
      writer.uint32(12546).string(message.DIGDNMMEGFB)
    }
    if (message.ip !== undefined && message.ip !== "") {
      writer.uint32(10).string(message.ip)
    }
    if (message.clientSecretKey !== undefined && message.clientSecretKey !== "") {
      writer.uint32(1426).string(message.clientSecretKey)
    }
    if (message.OBLCBPBNLCM === true) {
      writer.uint32(9720).bool(message.OBLCBPBNLCM)
    }
    if (message.ifixUrl !== undefined && message.ifixUrl !== "") {
      writer.uint32(16322).string(message.ifixUrl)
    }
    if (message.NGLCAOKANHM === true) {
      writer.uint32(3456).bool(message.NGLCAOKANHM)
    }
    if (message.DOGIAANDIKF !== undefined && message.DOGIAANDIKF !== "") {
      writer.uint32(8090).string(message.DOGIAANDIKF)
    }
    if (message.uploadReplayUrl !== undefined && message.uploadReplayUrl !== "") {
      writer.uint32(4234).string(message.uploadReplayUrl)
    }
    if (message.OLHLDGOHFBN !== undefined && message.OLHLDGOHFBN !== "") {
      writer.uint32(8402).string(message.OLHLDGOHFBN)
    }
    if (message.msg !== undefined && message.msg !== "") {
      writer.uint32(58).string(message.msg)
    }
    if (message.BBNCMGGKJAE === true) {
      writer.uint32(11632).bool(message.BBNCMGGKJAE)
    }
    if (message.MAEBANOEDMP !== undefined && message.MAEBANOEDMP !== "") {
      writer.uint32(9258).string(message.MAEBANOEDMP)
    }
    if (message.regionName !== undefined && message.regionName !== "") {
      writer.uint32(106).string(message.regionName)
    }
    if (message.HBDMGJEDABD !== undefined && message.HBDMGJEDABD !== "") {
      writer.uint32(15362).string(message.HBDMGJEDABD)
    }
    if (message.GDOGBBPAPJH !== undefined && message.GDOGBBPAPJH !== "") {
      writer.uint32(6586).string(message.GDOGBBPAPJH)
    }
    if (message.LFIAADINMBB !== undefined && message.LFIAADINMBB !== "") {
      writer.uint32(4650).string(message.LFIAADINMBB)
    }
    if (message.stopBeginTime !== undefined && message.stopBeginTime !== 0) {
      writer.uint32(96).int64(message.stopBeginTime)
    }
    if (message.DGCIOFAFOFN !== undefined && message.DGCIOFAFOFN !== "") {
      writer.uint32(4770).string(message.DGCIOFAFOFN)
    }
    if (message.LCIDMKEDDCL === true) {
      writer.uint32(15384).bool(message.LCIDMKEDDCL)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerDispatchDataNEW {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseServerDispatchDataNEW()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break
          }

          message.port = reader.uint32()
          continue
        case 1238:
          if (tag !== 9904) {
            break
          }

          message.KKHJNPJMNIN = reader.bool()
          continue
        case 724:
          if (tag !== 5794) {
            break
          }

          message.HLGCFGBPDIH = reader.string()
          continue
        case 102:
          if (tag !== 818) {
            break
          }

          message.AGCOHMIBFPO = reader.string()
          continue
        case 193:
          if (tag !== 1544) {
            break
          }

          message.HFGEFGFEMCN = reader.bool()
          continue
        case 232:
          if (tag !== 1858) {
            break
          }

          message.CNEIJFENGAG = reader.string()
          continue
        case 10:
          if (tag !== 80) {
            break
          }

          message.LNNIPPHEPOA = reader.bool()
          continue
        case 654:
          if (tag !== 5234) {
            break
          }

          message.loginWhiteMsg = reader.string()
          continue
        case 8:
          if (tag !== 64) {
            break
          }

          message.DOAMFCDLJIL = reader.uint32()
          continue
        case 9:
          if (tag !== 72) {
            break
          }

          message.BOPLAMMNLFK = reader.uint32()
          continue
        case 15:
          if (tag !== 120) {
            break
          }

          message.retcode = reader.uint32()
          continue
        case 788:
          if (tag !== 6304) {
            break
          }

          message.AFBOJAGEPFB = reader.bool()
          continue
        case 14:
          if (tag !== 114) {
            break
          }

          message.assetBundleUrl = reader.string()
          continue
        case 222:
          if (tag !== 1778) {
            break
          }

          message.GPFNNIDOAOK = reader.string()
          continue
        case 11:
          if (tag !== 90) {
            break
          }

          message.MAHIBOGOGOC = reader.string()
          continue
        case 1107:
          if (tag !== 8858) {
            break
          }

          message.OKGBJBACNKG = reader.string()
          continue
        case 5:
          if (tag !== 40) {
            break
          }

          message.stopEndTime = longToNumber(reader.int64() as Long)
          continue
        case 1374:
          if (tag !== 10992) {
            break
          }

          message.CINCKAOLOBK = reader.bool()
          continue
        case 1670:
          if (tag !== 13362) {
            break
          }

          message.IJPFDPNMGCL = reader.string()
          continue
        case 1592:
          if (tag !== 12738) {
            break
          }

          message.ACNKLOFEOJA = reader.string()
          continue
        case 349:
          if (tag !== 2794) {
            break
          }

          message.luaVersion = reader.string()
          continue
        case 1986:
          if (tag !== 15888) {
            break
          }

          message.GHOOCKECBNE = reader.bool()
          continue
        case 4:
          if (tag !== 34) {
            break
          }

          message.luaUrl = reader.string()
          continue
        case 1376:
          if (tag !== 11010) {
            break
          }

          message.replayUrl = reader.string()
          continue
        case 3:
          if (tag !== 24) {
            break
          }

          message.JEGDHPFJFPG = reader.bool()
          continue
        case 622:
          if (tag !== 4976) {
            break
          }

          message.HGEDHANHIFN = reader.bool()
          continue
        case 6:
          if (tag !== 50) {
            break
          }

          message.exResourceUrl = reader.string()
          continue
        case 1568:
          if (tag !== 12546) {
            break
          }

          message.DIGDNMMEGFB = reader.string()
          continue
        case 1:
          if (tag !== 10) {
            break
          }

          message.ip = reader.string()
          continue
        case 178:
          if (tag !== 1426) {
            break
          }

          message.clientSecretKey = reader.string()
          continue
        case 1215:
          if (tag !== 9720) {
            break
          }

          message.OBLCBPBNLCM = reader.bool()
          continue
        case 2040:
          if (tag !== 16322) {
            break
          }

          message.ifixUrl = reader.string()
          continue
        case 432:
          if (tag !== 3456) {
            break
          }

          message.NGLCAOKANHM = reader.bool()
          continue
        case 1011:
          if (tag !== 8090) {
            break
          }

          message.DOGIAANDIKF = reader.string()
          continue
        case 529:
          if (tag !== 4234) {
            break
          }

          message.uploadReplayUrl = reader.string()
          continue
        case 1050:
          if (tag !== 8402) {
            break
          }

          message.OLHLDGOHFBN = reader.string()
          continue
        case 7:
          if (tag !== 58) {
            break
          }

          message.msg = reader.string()
          continue
        case 1454:
          if (tag !== 11632) {
            break
          }

          message.BBNCMGGKJAE = reader.bool()
          continue
        case 1157:
          if (tag !== 9258) {
            break
          }

          message.MAEBANOEDMP = reader.string()
          continue
        case 13:
          if (tag !== 106) {
            break
          }

          message.regionName = reader.string()
          continue
        case 1920:
          if (tag !== 15362) {
            break
          }

          message.HBDMGJEDABD = reader.string()
          continue
        case 823:
          if (tag !== 6586) {
            break
          }

          message.GDOGBBPAPJH = reader.string()
          continue
        case 581:
          if (tag !== 4650) {
            break
          }

          message.LFIAADINMBB = reader.string()
          continue
        case 12:
          if (tag !== 96) {
            break
          }

          message.stopBeginTime = longToNumber(reader.int64() as Long)
          continue
        case 596:
          if (tag !== 4770) {
            break
          }

          message.DGCIOFAFOFN = reader.string()
          continue
        case 1923:
          if (tag !== 15384) {
            break
          }

          message.LCIDMKEDDCL = reader.bool()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): ServerDispatchDataNEW {
    return {
      port: isSet(object.port) ? Number(object.port) : 0,
      KKHJNPJMNIN: isSet(object.KKHJNPJMNIN) ? Boolean(object.KKHJNPJMNIN) : false,
      HLGCFGBPDIH: isSet(object.HLGCFGBPDIH) ? String(object.HLGCFGBPDIH) : "",
      AGCOHMIBFPO: isSet(object.AGCOHMIBFPO) ? String(object.AGCOHMIBFPO) : "",
      HFGEFGFEMCN: isSet(object.HFGEFGFEMCN) ? Boolean(object.HFGEFGFEMCN) : false,
      CNEIJFENGAG: isSet(object.CNEIJFENGAG) ? String(object.CNEIJFENGAG) : "",
      LNNIPPHEPOA: isSet(object.LNNIPPHEPOA) ? Boolean(object.LNNIPPHEPOA) : false,
      loginWhiteMsg: isSet(object.loginWhiteMsg) ? String(object.loginWhiteMsg) : "",
      DOAMFCDLJIL: isSet(object.DOAMFCDLJIL) ? Number(object.DOAMFCDLJIL) : 0,
      BOPLAMMNLFK: isSet(object.BOPLAMMNLFK) ? Number(object.BOPLAMMNLFK) : 0,
      retcode: isSet(object.retcode) ? Number(object.retcode) : 0,
      AFBOJAGEPFB: isSet(object.AFBOJAGEPFB) ? Boolean(object.AFBOJAGEPFB) : false,
      assetBundleUrl: isSet(object.assetBundleUrl) ? String(object.assetBundleUrl) : "",
      GPFNNIDOAOK: isSet(object.GPFNNIDOAOK) ? String(object.GPFNNIDOAOK) : "",
      MAHIBOGOGOC: isSet(object.MAHIBOGOGOC) ? String(object.MAHIBOGOGOC) : "",
      OKGBJBACNKG: isSet(object.OKGBJBACNKG) ? String(object.OKGBJBACNKG) : "",
      stopEndTime: isSet(object.stopEndTime) ? Number(object.stopEndTime) : 0,
      CINCKAOLOBK: isSet(object.CINCKAOLOBK) ? Boolean(object.CINCKAOLOBK) : false,
      IJPFDPNMGCL: isSet(object.IJPFDPNMGCL) ? String(object.IJPFDPNMGCL) : "",
      ACNKLOFEOJA: isSet(object.ACNKLOFEOJA) ? String(object.ACNKLOFEOJA) : "",
      luaVersion: isSet(object.luaVersion) ? String(object.luaVersion) : "",
      GHOOCKECBNE: isSet(object.GHOOCKECBNE) ? Boolean(object.GHOOCKECBNE) : false,
      luaUrl: isSet(object.luaUrl) ? String(object.luaUrl) : "",
      replayUrl: isSet(object.replayUrl) ? String(object.replayUrl) : "",
      JEGDHPFJFPG: isSet(object.JEGDHPFJFPG) ? Boolean(object.JEGDHPFJFPG) : false,
      HGEDHANHIFN: isSet(object.HGEDHANHIFN) ? Boolean(object.HGEDHANHIFN) : false,
      exResourceUrl: isSet(object.exResourceUrl) ? String(object.exResourceUrl) : "",
      DIGDNMMEGFB: isSet(object.DIGDNMMEGFB) ? String(object.DIGDNMMEGFB) : "",
      ip: isSet(object.ip) ? String(object.ip) : "",
      clientSecretKey: isSet(object.clientSecretKey) ? String(object.clientSecretKey) : "",
      OBLCBPBNLCM: isSet(object.OBLCBPBNLCM) ? Boolean(object.OBLCBPBNLCM) : false,
      ifixUrl: isSet(object.ifixUrl) ? String(object.ifixUrl) : "",
      NGLCAOKANHM: isSet(object.NGLCAOKANHM) ? Boolean(object.NGLCAOKANHM) : false,
      DOGIAANDIKF: isSet(object.DOGIAANDIKF) ? String(object.DOGIAANDIKF) : "",
      uploadReplayUrl: isSet(object.uploadReplayUrl) ? String(object.uploadReplayUrl) : "",
      OLHLDGOHFBN: isSet(object.OLHLDGOHFBN) ? String(object.OLHLDGOHFBN) : "",
      msg: isSet(object.msg) ? String(object.msg) : "",
      BBNCMGGKJAE: isSet(object.BBNCMGGKJAE) ? Boolean(object.BBNCMGGKJAE) : false,
      MAEBANOEDMP: isSet(object.MAEBANOEDMP) ? String(object.MAEBANOEDMP) : "",
      regionName: isSet(object.regionName) ? String(object.regionName) : "",
      HBDMGJEDABD: isSet(object.HBDMGJEDABD) ? String(object.HBDMGJEDABD) : "",
      GDOGBBPAPJH: isSet(object.GDOGBBPAPJH) ? String(object.GDOGBBPAPJH) : "",
      LFIAADINMBB: isSet(object.LFIAADINMBB) ? String(object.LFIAADINMBB) : "",
      stopBeginTime: isSet(object.stopBeginTime) ? Number(object.stopBeginTime) : 0,
      DGCIOFAFOFN: isSet(object.DGCIOFAFOFN) ? String(object.DGCIOFAFOFN) : "",
      LCIDMKEDDCL: isSet(object.LCIDMKEDDCL) ? Boolean(object.LCIDMKEDDCL) : false
    }
  },

  toJSON(message: ServerDispatchDataNEW): unknown {
    const obj: any = {}
    message.port !== undefined && (obj.port = Math.round(message.port))
    message.KKHJNPJMNIN !== undefined && (obj.KKHJNPJMNIN = message.KKHJNPJMNIN)
    message.HLGCFGBPDIH !== undefined && (obj.HLGCFGBPDIH = message.HLGCFGBPDIH)
    message.AGCOHMIBFPO !== undefined && (obj.AGCOHMIBFPO = message.AGCOHMIBFPO)
    message.HFGEFGFEMCN !== undefined && (obj.HFGEFGFEMCN = message.HFGEFGFEMCN)
    message.CNEIJFENGAG !== undefined && (obj.CNEIJFENGAG = message.CNEIJFENGAG)
    message.LNNIPPHEPOA !== undefined && (obj.LNNIPPHEPOA = message.LNNIPPHEPOA)
    message.loginWhiteMsg !== undefined && (obj.loginWhiteMsg = message.loginWhiteMsg)
    message.DOAMFCDLJIL !== undefined && (obj.DOAMFCDLJIL = Math.round(message.DOAMFCDLJIL))
    message.BOPLAMMNLFK !== undefined && (obj.BOPLAMMNLFK = Math.round(message.BOPLAMMNLFK))
    message.retcode !== undefined && (obj.retcode = Math.round(message.retcode))
    message.AFBOJAGEPFB !== undefined && (obj.AFBOJAGEPFB = message.AFBOJAGEPFB)
    message.assetBundleUrl !== undefined && (obj.assetBundleUrl = message.assetBundleUrl)
    message.GPFNNIDOAOK !== undefined && (obj.GPFNNIDOAOK = message.GPFNNIDOAOK)
    message.MAHIBOGOGOC !== undefined && (obj.MAHIBOGOGOC = message.MAHIBOGOGOC)
    message.OKGBJBACNKG !== undefined && (obj.OKGBJBACNKG = message.OKGBJBACNKG)
    message.stopEndTime !== undefined && (obj.stopEndTime = Math.round(message.stopEndTime))
    message.CINCKAOLOBK !== undefined && (obj.CINCKAOLOBK = message.CINCKAOLOBK)
    message.IJPFDPNMGCL !== undefined && (obj.IJPFDPNMGCL = message.IJPFDPNMGCL)
    message.ACNKLOFEOJA !== undefined && (obj.ACNKLOFEOJA = message.ACNKLOFEOJA)
    message.luaVersion !== undefined && (obj.luaVersion = message.luaVersion)
    message.GHOOCKECBNE !== undefined && (obj.GHOOCKECBNE = message.GHOOCKECBNE)
    message.luaUrl !== undefined && (obj.luaUrl = message.luaUrl)
    message.replayUrl !== undefined && (obj.replayUrl = message.replayUrl)
    message.JEGDHPFJFPG !== undefined && (obj.JEGDHPFJFPG = message.JEGDHPFJFPG)
    message.HGEDHANHIFN !== undefined && (obj.HGEDHANHIFN = message.HGEDHANHIFN)
    message.exResourceUrl !== undefined && (obj.exResourceUrl = message.exResourceUrl)
    message.DIGDNMMEGFB !== undefined && (obj.DIGDNMMEGFB = message.DIGDNMMEGFB)
    message.ip !== undefined && (obj.ip = message.ip)
    message.clientSecretKey !== undefined && (obj.clientSecretKey = message.clientSecretKey)
    message.OBLCBPBNLCM !== undefined && (obj.OBLCBPBNLCM = message.OBLCBPBNLCM)
    message.ifixUrl !== undefined && (obj.ifixUrl = message.ifixUrl)
    message.NGLCAOKANHM !== undefined && (obj.NGLCAOKANHM = message.NGLCAOKANHM)
    message.DOGIAANDIKF !== undefined && (obj.DOGIAANDIKF = message.DOGIAANDIKF)
    message.uploadReplayUrl !== undefined && (obj.uploadReplayUrl = message.uploadReplayUrl)
    message.OLHLDGOHFBN !== undefined && (obj.OLHLDGOHFBN = message.OLHLDGOHFBN)
    message.msg !== undefined && (obj.msg = message.msg)
    message.BBNCMGGKJAE !== undefined && (obj.BBNCMGGKJAE = message.BBNCMGGKJAE)
    message.MAEBANOEDMP !== undefined && (obj.MAEBANOEDMP = message.MAEBANOEDMP)
    message.regionName !== undefined && (obj.regionName = message.regionName)
    message.HBDMGJEDABD !== undefined && (obj.HBDMGJEDABD = message.HBDMGJEDABD)
    message.GDOGBBPAPJH !== undefined && (obj.GDOGBBPAPJH = message.GDOGBBPAPJH)
    message.LFIAADINMBB !== undefined && (obj.LFIAADINMBB = message.LFIAADINMBB)
    message.stopBeginTime !== undefined && (obj.stopBeginTime = Math.round(message.stopBeginTime))
    message.DGCIOFAFOFN !== undefined && (obj.DGCIOFAFOFN = message.DGCIOFAFOFN)
    message.LCIDMKEDDCL !== undefined && (obj.LCIDMKEDDCL = message.LCIDMKEDDCL)
    return obj
  },

  create<I extends Exact<DeepPartial<ServerDispatchDataNEW>, I>>(base?: I): ServerDispatchDataNEW {
    return ServerDispatchDataNEW.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<ServerDispatchDataNEW>, I>>(object: I): ServerDispatchDataNEW {
    const message = createBaseServerDispatchDataNEW()
    message.port = object.port ?? 0
    message.KKHJNPJMNIN = object.KKHJNPJMNIN ?? false
    message.HLGCFGBPDIH = object.HLGCFGBPDIH ?? ""
    message.AGCOHMIBFPO = object.AGCOHMIBFPO ?? ""
    message.HFGEFGFEMCN = object.HFGEFGFEMCN ?? false
    message.CNEIJFENGAG = object.CNEIJFENGAG ?? ""
    message.LNNIPPHEPOA = object.LNNIPPHEPOA ?? false
    message.loginWhiteMsg = object.loginWhiteMsg ?? ""
    message.DOAMFCDLJIL = object.DOAMFCDLJIL ?? 0
    message.BOPLAMMNLFK = object.BOPLAMMNLFK ?? 0
    message.retcode = object.retcode ?? 0
    message.AFBOJAGEPFB = object.AFBOJAGEPFB ?? false
    message.assetBundleUrl = object.assetBundleUrl ?? ""
    message.GPFNNIDOAOK = object.GPFNNIDOAOK ?? ""
    message.MAHIBOGOGOC = object.MAHIBOGOGOC ?? ""
    message.OKGBJBACNKG = object.OKGBJBACNKG ?? ""
    message.stopEndTime = object.stopEndTime ?? 0
    message.CINCKAOLOBK = object.CINCKAOLOBK ?? false
    message.IJPFDPNMGCL = object.IJPFDPNMGCL ?? ""
    message.ACNKLOFEOJA = object.ACNKLOFEOJA ?? ""
    message.luaVersion = object.luaVersion ?? ""
    message.GHOOCKECBNE = object.GHOOCKECBNE ?? false
    message.luaUrl = object.luaUrl ?? ""
    message.replayUrl = object.replayUrl ?? ""
    message.JEGDHPFJFPG = object.JEGDHPFJFPG ?? false
    message.HGEDHANHIFN = object.HGEDHANHIFN ?? false
    message.exResourceUrl = object.exResourceUrl ?? ""
    message.DIGDNMMEGFB = object.DIGDNMMEGFB ?? ""
    message.ip = object.ip ?? ""
    message.clientSecretKey = object.clientSecretKey ?? ""
    message.OBLCBPBNLCM = object.OBLCBPBNLCM ?? false
    message.ifixUrl = object.ifixUrl ?? ""
    message.NGLCAOKANHM = object.NGLCAOKANHM ?? false
    message.DOGIAANDIKF = object.DOGIAANDIKF ?? ""
    message.uploadReplayUrl = object.uploadReplayUrl ?? ""
    message.OLHLDGOHFBN = object.OLHLDGOHFBN ?? ""
    message.msg = object.msg ?? ""
    message.BBNCMGGKJAE = object.BBNCMGGKJAE ?? false
    message.MAEBANOEDMP = object.MAEBANOEDMP ?? ""
    message.regionName = object.regionName ?? ""
    message.HBDMGJEDABD = object.HBDMGJEDABD ?? ""
    message.GDOGBBPAPJH = object.GDOGBBPAPJH ?? ""
    message.LFIAADINMBB = object.LFIAADINMBB ?? ""
    message.stopBeginTime = object.stopBeginTime ?? 0
    message.DGCIOFAFOFN = object.DGCIOFAFOFN ?? ""
    message.LCIDMKEDDCL = object.LCIDMKEDDCL ?? false
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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER")
  }
  return long.toNumber()
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
