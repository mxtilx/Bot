/** @format */

export enum ClientType {
	Editor = 0,
	IOS = 1,
	Android = 2,
	PC = 3,
	PS4 = 4,
	Server = 5,
	CloudAndroid = 6,
	CloudIOS = 7,
	PS5 = 8,
	CloudWeb = 9,
	CloudTV = 10,
	CloudMAC = 11,
	CloudPC = 12,
	Cloud3rdPartyMobile = 13,
	Cloud3rdPartyPC = 14
}

export enum ErrorCodes {
	FAIL = -1,
	CANCEL = -2,
	NO_SUCH_METHOD = -10,
	LOGIN_BASE = -100,
	LOGIN_FAILED = -101,
	LOGIN_CANCEL = -102,
	LOGIN_ERROR = -103,
	LOGOUT_FAILED = -104,
	LOGOUT_CANCEL = -105,
	LOGOUT_ERROR = 106,
	PAY_FAILED = -107,
	PAY_CANCEL = -108,
	PAY_ERROR = -109,
	PAY_UNKNOWN = -116,
	EXIT_FAILED = -110,
	EXIT_NO_DIALOG = -111,
	EXIT_CANCEL = -112,
	EXIT_ERROR = -113,
	INIT_FAILED = -114,
	INIT_ERROR = -115,
	LOGIN_FORBIDDED = -117,
	NEED_REALNAME = -118,
	NEED_GUARDIAN = -119,
	EOS_DLL_ERROR = -1001,
	EOS_TOKEN_ERROR = -1002,
	GOOGLE_PC_TOKEN_ERROR = -1003
}

export enum SuccessCodes {
	WEB_STANDARD = 200,
	RETCODE = 0,
	REGISTER = 1,
	PAY_LAUNCH = -120
}

export const statusCodes = {
	error: ErrorCodes,
	success: SuccessCodes
}

export const Constants = {
	ClientType,
	statusCodes
}

export default Constants
