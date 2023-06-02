/**
 * ! Copyright © 2011 - 2023 YuukiPS. All Rights Reserved
 *
 * @format
 */

!(function (t, n) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = n())
		: "function" == typeof define && define.amd
		? define([], n)
		: "object" == typeof exports
		? (exports.miHoYoAnalysis = n())
		: (t.miHoYoAnalysis = n())
})(window, function () {
	return (function (t) {
		var n = {}
		function e(r) {
			if (n[r]) return n[r].exports
			var i = (n[r] = { i: r, l: !1, exports: {} })
			return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports
		}
		return (
			(e.m = t),
			(e.c = n),
			(e.d = function (t, n, r) {
				e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r })
			}),
			(e.r = function (t) {
				"undefined" != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
					Object.defineProperty(t, "__esModule", { value: !0 })
			}),
			(e.t = function (t, n) {
				if ((1 & n && (t = e(t)), 8 & n)) return t
				if (4 & n && "object" == typeof t && t && t.__esModule) return t
				var r = Object.create(null)
				if (
					(e.r(r),
					Object.defineProperty(r, "default", { enumerable: !0, value: t }),
					2 & n && "string" != typeof t)
				)
					for (var i in t)
						e.d(
							r,
							i,
							function (n) {
								return t[n]
							}.bind(null, i)
						)
				return r
			}),
			(e.n = function (t) {
				var n =
					t && t.__esModule
						? function () {
								return t.default
						  }
						: function () {
								return t
						  }
				return e.d(n, "a", n), n
			}),
			(e.o = function (t, n) {
				return Object.prototype.hasOwnProperty.call(t, n)
			}),
			(e.p = ""),
			e((e.s = 3))
		)
	})([
		function (t, n) {
			var e = {
				utf8: {
					stringToBytes: function (t) {
						return e.bin.stringToBytes(unescape(encodeURIComponent(t)))
					},
					bytesToString: function (t) {
						return decodeURIComponent(escape(e.bin.bytesToString(t)))
					}
				},
				bin: {
					stringToBytes: function (t) {
						for (var n = [], e = 0; e < t.length; e++) n.push(255 & t.charCodeAt(e))
						return n
					},
					bytesToString: function (t) {
						for (var n = [], e = 0; e < t.length; e++) n.push(String.fromCharCode(t[e]))
						return n.join("")
					}
				}
			}
			t.exports = e
		},
		function (t, n, e) {
			var r, i
			/*!
			 * JavaScript Cookie v2.2.1
			 * https://github.com/js-cookie/js-cookie
			 *
			 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
			 * Released under the MIT license
			 */ !(function (o) {
				if (
					(void 0 === (i = "function" == typeof (r = o) ? r.call(n, e, n, t) : r) || (t.exports = i),
					!0,
					(t.exports = o()),
					!!0)
				) {
					var u = window.Cookies,
						a = (window.Cookies = o())
					a.noConflict = function () {
						return (window.Cookies = u), a
					}
				}
			})(function () {
				function t() {
					for (var t = 0, n = {}; t < arguments.length; t++) {
						var e = arguments[t]
						for (var r in e) n[r] = e[r]
					}
					return n
				}
				function n(t) {
					return t.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
				}
				return (function e(r) {
					function i() {}
					function o(n, e, o) {
						if ("undefined" != typeof document) {
							"number" == typeof (o = t({ path: "/" }, i.defaults, o)).expires &&
								(o.expires = new Date(1 * new Date() + 864e5 * o.expires)),
								(o.expires = o.expires ? o.expires.toUTCString() : "")
							try {
								var u = JSON.stringify(e)
								;/^[\{\[]/.test(u) && (e = u)
							} catch (t) {}
							;(e = r.write
								? r.write(e, n)
								: encodeURIComponent(String(e)).replace(
										/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
										decodeURIComponent
								  )),
								(n = encodeURIComponent(String(n))
									.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
									.replace(/[\(\)]/g, escape))
							var a = ""
							for (var f in o) o[f] && ((a += "; " + f), !0 !== o[f] && (a += "=" + o[f].split(";")[0]))
							return (document.cookie = n + "=" + e + a)
						}
					}
					function u(t, e) {
						if ("undefined" != typeof document) {
							for (
								var i = {}, o = document.cookie ? document.cookie.split("; ") : [], u = 0;
								u < o.length;
								u++
							) {
								var a = o[u].split("="),
									f = a.slice(1).join("=")
								e || '"' !== f.charAt(0) || (f = f.slice(1, -1))
								try {
									var s = n(a[0])
									if (((f = (r.read || r)(f, s) || n(f)), e))
										try {
											f = JSON.parse(f)
										} catch (t) {}
									if (((i[s] = f), t === s)) break
								} catch (t) {}
							}
							return t ? i[t] : i
						}
					}
					return (
						(i.set = o),
						(i.get = function (t) {
							return u(t, !1)
						}),
						(i.getJSON = function (t) {
							return u(t, !0)
						}),
						(i.remove = function (n, e) {
							o(n, "", t(e, { expires: -1 }))
						}),
						(i.defaults = {}),
						(i.withConverter = e),
						i
					)
				})(function () {})
			})
		},
		function (t, n) {
			var e, r
			;(e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
				(r = {
					rotl: function (t, n) {
						return (t << n) | (t >>> (32 - n))
					},
					rotr: function (t, n) {
						return (t << (32 - n)) | (t >>> n)
					},
					endian: function (t) {
						if (t.constructor == Number) return (16711935 & r.rotl(t, 8)) | (4278255360 & r.rotl(t, 24))
						for (var n = 0; n < t.length; n++) t[n] = r.endian(t[n])
						return t
					},
					randomBytes: function (t) {
						for (var n = []; t > 0; t--) n.push(Math.floor(256 * Math.random()))
						return n
					},
					bytesToWords: function (t) {
						for (var n = [], e = 0, r = 0; e < t.length; e++, r += 8) n[r >>> 5] |= t[e] << (24 - (r % 32))
						return n
					},
					wordsToBytes: function (t) {
						for (var n = [], e = 0; e < 32 * t.length; e += 8)
							n.push((t[e >>> 5] >>> (24 - (e % 32))) & 255)
						return n
					},
					bytesToHex: function (t) {
						for (var n = [], e = 0; e < t.length; e++)
							n.push((t[e] >>> 4).toString(16)), n.push((15 & t[e]).toString(16))
						return n.join("")
					},
					hexToBytes: function (t) {
						for (var n = [], e = 0; e < t.length; e += 2) n.push(parseInt(t.substr(e, 2), 16))
						return n
					},
					bytesToBase64: function (t) {
						for (var n = [], r = 0; r < t.length; r += 3)
							for (var i = (t[r] << 16) | (t[r + 1] << 8) | t[r + 2], o = 0; o < 4; o++)
								8 * r + 6 * o <= 8 * t.length
									? n.push(e.charAt((i >>> (6 * (3 - o))) & 63))
									: n.push("=")
						return n.join("")
					},
					base64ToBytes: function (t) {
						t = t.replace(/[^A-Z0-9+\/]/gi, "")
						for (var n = [], r = 0, i = 0; r < t.length; i = ++r % 4)
							0 != i &&
								n.push(
									((e.indexOf(t.charAt(r - 1)) & (Math.pow(2, -2 * i + 8) - 1)) << (2 * i)) |
										(e.indexOf(t.charAt(r)) >>> (6 - 2 * i))
								)
						return n
					}
				}),
				(t.exports = r)
		},
		function (t, n, e) {
			"use strict"
			function r(t, n) {
				var e = h()
				return (r = function (n, i) {
					var o = e[(n -= 444)]
					if (void 0 === r.yzERdh) {
						var u = function (t) {
							for (
								var n, e, r = "", i = "", o = 0, u = 0;
								(e = t.charAt(u++));
								~e && ((n = o % 4 ? 64 * n + e : e), o++ % 4)
									? (r += String.fromCharCode(255 & (n >> ((-2 * o) & 6))))
									: 0
							)
								e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(e)
							for (var a = 0, f = r.length; a < f; a++)
								i += "%" + ("00" + r.charCodeAt(a).toString(16)).slice(-2)
							return decodeURIComponent(i)
						}
						;(r.TMhsAo = u), (t = arguments), (r.yzERdh = !0)
					}
					var a = e[0],
						f = n + a,
						s = t[f]
					return s ? (o = s) : ((o = r.TMhsAo(o)), (t[f] = o)), o
				})(t, n)
			}
			!(function (t, n) {
				function e(t, n, e, i) {
					return r(t - 942, i)
				}
				function i(t, n, e, i) {
					return r(e - 758, t)
				}
				for (var o = t(); ; )
					try {
						if (
							626746 ===
							parseInt(e(1684, 0, 0, 1662)) / 1 +
								-parseInt(e(1662, 0, 0, 1584)) / 2 +
								(parseInt(e(1556, 0, 0, 1680)) / 3) * (parseInt(i(1437, 0, 1512)) / 4) +
								(-parseInt(i(1354, 0, 1486)) / 5) * (-parseInt(i(1262, 0, 1244)) / 6) +
								(parseInt(e(1621, 0, 0, 1478)) / 7) * (parseInt(i(1373, 0, 1453)) / 8) +
								(parseInt(e(1482, 0, 0, 1405)) / 9) * (parseInt(e(1608, 0, 0, 1605)) / 10) +
								(parseInt(e(1721, 0, 0, 1864)) / 11) * (-parseInt(e(1398, 0, 0, 1269)) / 12)
						)
							break
						o.push(o.shift())
					} catch (t) {
						o.push(o.shift())
					}
			})(h)
			var i = {}
			;(i[v(-200, -311, -100, -338)] = !0),
				Object[c(1340, 1277, 1197, 1367) + c(1117, 1106, 1075, 1003)](n, c(1302, 1321, 1378, 1228), i)
			var o =
					Object[v(1, -127, -69, 46)] ||
					function (t) {
						var n = {}
						function e(t, n, e, r) {
							return c(r - -200, n - 58, e - 178, e)
						}
						function r(t, n, e, r) {
							return c(n - -1273, n - 101, e - 159, r)
						}
						;(n[r(-16, -174, -143, -228)] = function (t, n) {
							return t < n
						}),
							(n[r(96, 136, 44, 152)] = function (t, n) {
								return t !== n
							}),
							(n[r(85, 150, 81, 97)] = "nrFBB"),
							(n[r(0, 139, 93, 55)] = r(0, 157, 88, 212))
						for (var i = n, o = 1; i.QPKHI(o, arguments.length); o++) {
							if (!i[r(0, 136, 271, -5)](i[r(0, 150, 58, 133)], i.DUghW)) return
							var u = arguments[o]
							for (var a in u)
								Object[e(0, 1328, 1110, 1186)]["hasOwnProp" + e(0, 932, 845, 917)].call(u, a) &&
									(t[a] = u[a])
						}
						return t
					},
				u = (function () {
					var t = {
						cSwFJ: r(180, -29, 130, 34),
						wCmfC: "authkey_ver",
						bXfGs: function (t, n) {
							return t !== n
						},
						LzoUQ: r(35, -59, 181, 59),
						ldBIH: function (t, n) {
							return t < n
						},
						OCJet: n(1452, 1428, 1555, 1480),
						IsTqP: r(60, -206, -164, -44),
						MIBQR: function (t, n, e) {
							return t(n, e)
						}
					}
					function n(t, n, e, r) {
						return c(t - 205, n - 307, e - 114, r)
					}
					function e(e, i) {
						function o(t, n, e, i) {
							return r(t - 307, n - 477, i, e - 814)
						}
						function u(t, e, r, i) {
							return n(t - -995, e - 395, r - 171, i)
						}
						if (!t[o(878, 814, 891, 1015)](t.LzoUQ, "cdomS"))
							return {
								auth_key: (0, _0x709c8[u(511, 453, 450, 385) + "Name"])(t[o(988, 773, 837, 723)]) || "",
								authkey_ver: (0, _0x558de3["getParamBy" + o(676, 678, 807, 906)])(
									t[u(375, 479, 518, 500)]
								),
								game_biz:
									(0, _0x37dae8[u(511, 648, 480, 519) + u(477, 589, 489, 522)])(
										o(837, 842, 783, 653)
									) || "",
								account_id: this[o(539, 541, 648, 499) + "id"]() || "",
								bh3_sea_account_id: this[o(852, 992, 905, 822) + u(407, 562, 390, 507)](),
								game_uid: this[u(420, 334, 558, 284)],
								game_region: this[u(505, 356, 422, 346) + "n"],
								uuid: this.uuid,
								device_id: this.device_id,
								extra_info: this[u(377, 325, 368, 213) + o(915, 764, 919, 960)]
							}
						for (var a = 0; t.ldBIH(a, i[o(911, 766, 922, 1024)]); a++)
							for (var f = t[o(826, 780, 814, 829)][u(612, 676, 545, 722)]("|"), s = 0; ; ) {
								switch (f[s++]) {
									case "0":
										c[o(708, 845, 691, 579) + "le"] = !0
										continue
									case "1":
										Object[u(550, 666, 484, 699) + "erty"](e, c[o(911, 1020, 945, 1033)], c)
										continue
									case "2":
										t[u(450, 413, 480, 490)] in c && (c[u(304, 414, 377, 236)] = !0)
										continue
									case "3":
										var c = i[a]
										continue
									case "4":
										c[o(810, 938, 878, 751)] = c.enumerable || !1
										continue
								}
								break
							}
					}
					function r(t, n, e, r) {
						return c(r - -1274, n - 234, e - 137, e)
					}
					return function (r, i, o) {
						var u, a, f
						return (
							i && t.MIBQR(e, r.prototype, i),
							o && t[((u = 881), (a = 1067), (f = 958), n(f - -354, u - 24, a - 12, a))](e, r, o),
							r
						)
					}
				})(),
				a = d(e(4)),
				f = d(e(1)),
				s = d(e(5))
			function c(t, n, e, i) {
				return r(t - 649, i)
			}
			function h() {
				var t = [
					"AxniyxnO",
					"m3W0Fdb8mNWX",
					"sgrgzhK",
					"zxjYB3i",
					"DwvZDeHLywrLCG",
					"ChjVzhvJDgLVBG",
					"EKHPuwy",
					"mJn8mxWYmNWXmW",
					"q29UDgvUDc1nra",
					"t0HKAfy",
					"vwXtsNO",
					"thHmqMu",
					"zs5JB20VAduVDq",
					"zKzpuva",
					"zxzLBNrwywX1zq",
					"yMGZtg9NAw5vAq",
					"sNLSz0i",
					"mZK1mJm4zLn3B3fT",
					"A3j4Ag8",
					"DhLWzq",
					"tvn5Deu",
					"tMfTzq",
					"jNzLCMLMAwnHDa",
					"zM9YrwfJAa",
					"zxzLBNrmAxn0",
					"B0v4CgLYzxm",
					"AvnqugG",
					"zxzLBNrfEhrYyq",
					"t0nkzxq",
					"v3D2r08",
					"ww9hrgG",
					"C2vZC2LVBKLUzG",
					"BMvLzfnLC3nPBW",
					"z2v0sfruufjLCq",
					"AhjLzG",
					"Ew1Hu0K",
					"q29UDgvUDc1uEq",
					"Cgf0Ag5HBwu",
					"sw5MBW",
					"zY11CgXVywqTBW",
					"zc5TAwHVEw8UyW",
					"s0niCvy",
					"AerNsLa",
					"A2v5CW",
					"C2vH",
					"sergDKy",
					"s2LkuNe",
					"DhjHy2TqywDLDG",
					"B20VAduVDxbSBW",
					"z2fTzv9YzwDPBW",
					"DxbKyxrLvwLK",
					"y1n3rKO",
					"z2v0qwXSugfYyq",
					"z291A1y",
					"AvftueW",
					"z2v0ugfYyw1cEq",
					"x19LC01VzhvSzq",
					"ChzqyxjHBxm",
					"Ag95B2XHyI4",
					"D1D6EgK",
					"uxvrAMK",
					"CvviwLy",
					"yxv0AgTLEq",
					"B29RAwvlzxK",
					"Ag9ZDa",
					"z2v0u2vZC2LVBG",
					"C2P4AKm",
					"AvvHDw4",
					"w29IAMvJDcbpyG",
					"mZbozefeq2i",
					"zY11CgXVywqUBq",
					"rgXgAKS",
					"Bg9JyxrPB24",
					"rfjjCum",
					"y0r5C2e",
					"z0rzs0O",
					"ww1wAvi",
					"DuTnEKu",
					"B3bituK",
					"wNPmAwC",
					"C2v0",
					"sgvHzgvYCW",
					"mtr4s2XuweO",
					"Aw5PDa",
					"vfbUEMW",
					"t05Fu1rfua",
					"y2vFAwq",
					"uuPMBvC",
					"qKLWrwS",
					"qw5XBvi",
					"yuTRwxe",
					"DhDpz1G",
					"zw51BwvYywjSzq",
					"BhjPEMG",
					"zgvMAw5LuhjVCa",
					"vfnyA1q",
					"D2vIC3rHDgLJlG",
					"sgvHzgvY",
					"mZCWmZeZnKL2DuHyyq",
					"tgvNANa",
					"nhWZFde1FdeWFa",
					"vMvYAwzPy2f0Aq",
					"CgfNzxvYBa",
					"t1nkB0i",
					"su5stMy",
					"yLHMr3m",
					"zxzLBNrmywjLBa",
					"C1Pjz2y",
					"vgLTzxn0yw1W",
					"yxbWx2LK",
					"D0jfwg4",
					"C2vUza",
					"BMfTzq",
					"yw5HBhLZAxnwzq",
					"DgvZDa",
					"vvjgz0i",
					"BfLbCuK",
					"BM93",
					"t05Fsuq",
					"z2v0qMGZu2vHqq",
					"nNW1FdiWFdiXFa",
					"rMjJqM8",
					"zK9tDee",
					"mJeYndaXmhrxqxflAG",
					"shvkvMO",
					"BfvKEMm",
					"lxrLC3qU",
					"AduVDxbSB2fK",
					"z2v0sxntzwe",
					"y29OuLq",
					"z2v0vxnLCKLUzG",
					"mtvlD09rrvi",
					"z2v0",
					"BMzV",
					"DxrTx21LzgL1Bq",
					"ANb1A0i",
					"BgvUz3rO",
					"CMvWBgfJzq",
					"CMvMzxjYzxi",
					"Eerkwei",
					"ChjVDg90ExbL",
					"CgfNzw5HBwu",
					"C3rHCNrtDgfZAa",
					"ChvZAfn0yxnO",
					"Cw5xvhu",
					"nZm2nJq5sMjqu0r5",
					"z2v0uMvXDwvZDa",
					"tgD6rva",
					"tvvNzfa",
					"vLfovxm",
					"Aw9Upq",
					"rMDAt3u",
					"r0DJAvO",
					"mte0ztLMntzMyG",
					"tu1sr1O",
					"DKXkAgK",
					"C3bSAxq",
					"mJbWre9svvC",
					"B3j5",
					"A2v5",
					"CgvhzxK",
					"yxmGysbMDw5JDa",
					"CgfNzuv4DhjHAq",
					"rhLtDxC",
					"CNnPB24",
					"DxvPza",
					"rfvNAfC",
					"uxzqrwC",
					"FdD8mNW0FdeYFa",
					"Aw5KzxHpzG",
					"D2vIC3rHDgLJlq",
					"tNbIv1K",
					"DMXVzY11CgXVyq",
					"suPRtvu",
					"qwDyzwC",
					"mhWXohWXnG",
					"CY5OB3LVDMvYCW",
					"v1zhzgq",
					"AxntDgfZAa",
					"mtr8ohWYnxWXnW",
					"BcbHignSyxnZia",
					"qxnwsNq",
					"mZuYoti0zgTXqMDU",
					"vLDmB1a",
					"zNHSBuS",
					"yxnZAwDU",
					"BwPwt3C",
					"yMjZqxbW",
					"s3jbzge",
					"D3jPDgfIBgu",
					"q1HyqNu",
					"ChvZAa",
					"zw52AxjVBM1LBG",
					"y2fSBa",
					"uvblseK",
					"CMvNAw9U",
					"Ag95B3zLCNnLlG",
					"DxnLqMvHy29U",
					"zvH4Exi",
					"Ec1YCgmTzgv2Aq",
					"nZu2se1SyMHd",
					"wwnyqNe",
					"tuLcuvi",
					"z2v0qwnJB3vUDa",
					"DxrTx3nVDxjJzq",
					"vNrqwfu",
					"A1LnuwO",
					"A2zSDuu",
					"sK9nrhe",
					"DMvUDhm",
					"tM56sKy",
					"rM5uyMy",
					"zxj0Eq",
					"Dw9Ot0y",
					"z2v0vxvPza",
					"otbIyZm4zMrKnW",
					"tgfJuwm",
					"uujXyMu",
					"Ahr0Chm6lY9Kzq",
					"Bhr1Awq",
					"EurRqNa",
					"r0XXEKW",
					"Eg5XB1a",
					"C2L6zq",
					"zfDOvgq",
					"DxnLCL9PBMzV",
					"yxbWBgLJyxrPBW",
					"EKXVC1i",
					"CfDOuMe",
					"AM9PBG",
					"nZaWmtiYuvbgEgvh",
					"nNWZFdD8ohW0Fa",
					"z3fItMS",
					"z2v0rw52",
					"zxHPEey",
					"y2XLyxjtDgfZAa",
					"AfjPquC",
					"wu5SsuW",
					"C2vUzejLywnVBG",
					"Dg9VBa",
					"Aw5PDeLUC3rHBG",
					"AMvJDf0",
					"z0nXrwi",
					"zgv2AwnLx2LK",
					"lxnLys10zxn0lG",
					"C2vZC2LVBKLKqW",
					"y29UzMLNDxjHyG",
					"Dg9tDhjPBMC",
					"Cg9ZDfn0yxnOrq",
					"CgfNzq",
					"CgzpvwG",
					"r0TArva",
					"tufID28",
					"zgv2zwXVCg1LBG",
					"sMHWvLq",
					"q0fVC1e",
					"BfPsrM4",
					"AgfZt3DUuhjVCa",
					"uhHSCxm",
					"Cg9ZDa",
					"D0nTzKm",
					"uhbusMO",
					"DxnLCKv4DhjHAq",
					"zgf0yq",
					"AgfZvxbKyxrLvq",
					"CenVB2TPzuTLEq",
					"DgvZDc5Zzwe",
					"rvHpvgW",
					"Aw5MBW",
					"m3WWFdr8mNWX",
					"sezYCvG",
					"z2v0ugfNzuLUzG",
					"qKvSsfq",
					"zgvMyxvSDa",
					"DgHLBG",
					"t0fnuLy",
					"A0ztAu8",
					"yKHmCxa",
					"quPJugG",
					"CMX6wK0",
					"Cgf0Aa",
					"zxzLBNrby3rPBW",
					"AMrRDLu",
					"zxH0CMfjBMzV",
					"mZeXnJq1n0zSt1n4Dq",
					"D2L0AenYzwrLBG",
					"Fde5FdeXFdL8mG",
					"u2LLAwG",
					"mJa1ntmWowm5yG",
					"AfLeCLe",
					"uhPqBhG",
					"EfnOAMi",
					"y2nVDw50Awq",
					"yxbPCW",
					"B2rVEgW",
					"BMvLzfvPza",
					"z2v0rxzLBNrjBG",
					"C2vZC2LVBLn0zq",
					"zKXtAeu",
					"vxDhzMu",
					"ywnJB3vUDf9Pza",
					"rePdt2q",
					"v2P0Cg8",
					"vfbqueC",
					"Awv3",
					"z2fTzv91Awq",
					"CgXVywq",
					"zwP3Ave",
					"Bhr1AwrFDJi",
					"C3rYAw5NAwz5",
					"yuLOD24",
					"vg9AwMG",
					"vNvL",
					"Bg9N",
					"zgf0yv9IzwXVBG",
					"DhjHy2TfDMvUDa",
					"AgfZAa",
					"Chnlvhi",
					"q1DMrvu",
					"Be5tt3u",
					"Aw9U",
					"zxzLBNrdyxrLzW",
					"q2fUBM90ignHBa",
					"BwLOB3LVlMnVBq",
					"B1bZD0G",
					"DMfSDwu",
					"Bef6rfO",
					"yxv0AgTLEv92zq",
					"Be1HBuG",
					"EfrSsKi",
					"vujMBuC",
					"x3yY",
					"z2LWzM4",
					"wuP4v3a",
					"wMP4C3G",
					"sxnuCva",
					"lNnLyq",
					"q3Lxrvm",
					"z2fTzv9IAxO",
					"DxrTx2nHBxbHAq",
					"r3fntuK"
				]
				return (h = function () {
					return t
				})()
			}
			function v(t, n, e, i) {
				return r(t - -781, n)
			}
			var l = d(e(7)),
				p = e(13)
			function d(t) {
				return t && t[((n = 1216), (e = 1134), v(n - 1344, e))] ? t : { default: t }
				var n, e
			}
			function g(t, n) {
				var e,
					r,
					i = {}
				function o(t, n, e, r) {
					return c(t - -507, 0, 0, e)
				}
				if (
					((i[((e = -303), (r = -470), c(e - -1484, 0, 0, r))] = function (t, n) {
						return t instanceof n
					}),
					!i[o(674, 0, 759)](t, n))
				)
					throw new TypeError("Cannot cal" + o(919, 0, 846) + "as a funct" + o(718, 0, 673))
			}
			var y = (function () {
				var t = {
					Legjp:
						i(931, 1094, 817, 962) +
						n(1623, 1574, 1628, 1691) +
						n(1597, 1563, 1459, 1645) +
						i(738, 999, 819, 849) +
						i(695, 720, 715, 787) +
						n(1610, 1495, 1351, 1509) +
						i(994, 904, 1012, 1017),
					BQRyg: "_MIA_SESSI" + i(1007, 962, 1130, 960),
					jdkvU: function (t, n, e) {
						return t(n, e)
					},
					YNlIL: i(832, 656, 708, 750),
					wBEXn: "view",
					DURMA: "https://lo" + i(1021, 1082, 888, 912) + "ihoyo.com/" + n(1464, 1522, 1448, 1687),
					BIpEk:
						"https://lo" +
						n(1444, 1434, 1457, 1494) +
						i(1174, 855, 1176, 1018) +
						n(1517, 1407, 1421, 1525) +
						i(723, 972, 902, 807),
					EXOTl: "https://de" + n(1458, 1567, 1447, 1705) + "d-os.hoyoverse.com/h5/upload",
					UBfmG: n(1384, 1293, 1313, 1244),
					gCqEb: "_MIA_SESSI" + i(937, 887, 940, 927),
					iUaun: function (t, n) {
						return t + n
					},
					yDkBp: function (t, n) {
						return t + n
					},
					VQNUs: function (t, n) {
						return t + n
					},
					DJCOd: "?timestamp=",
					xShjb: i(744, 745, 897, 864) + i(1140, 1124, 1100, 992),
					eXxyr: n(1683, 1565, 1639, 1467) + "sea",
					HDFvF: n(1273, 1250, 1181, 1176),
					xnqoP: function (t, n) {
						return t < n
					},
					KrAda: i(662, 865, 632, 714),
					PpTJj: function (t, n) {
						return t > n
					},
					BElHT: n(1428, 1491, 1519, 1612) + n(1213, 1377, 1489, 1408),
					kfluE: n(1438, 1400, 1311, 1318),
					emIyQ: "production" + n(1391, 1390, 1412, 1286),
					xDJXB: function (t, n) {
						return t > n
					},
					ebAgd: i(855, 592, 867, 745),
					bHLqp: function (t, n) {
						return t !== n
					},
					twOgX: i(762, 841, 984, 916),
					AgXeg: n(1612, 1511, 1679, 1465),
					cohRT: function (t, n) {
						return t > n
					},
					AsVJt: i(977, 1030, 1039, 968),
					MAbwo: n(1430, 1509, 1617, 1573),
					krxho: i(820, 641, 799, 801),
					LxrWm: n(1196, 1273, 1184, 1183),
					goukV: function (t, n) {
						return t === n
					},
					iyWJh: "EPukv",
					kYMQj: "iCCPK",
					EAGhQ: n(1548, 1410, 1526, 1486) + "d",
					psKTr: n(1160, 1253, 1342, 1085) + n(1404, 1481, 1336, 1324),
					XxYHu: i(891, 1170, 1134, 1002),
					mXNqG: i(762, 941, 633, 791),
					lAzDZ: function (t, n) {
						return t === n
					},
					omYVW: i(1089, 926, 982, 919),
					hmJez: i(784, 731, 857, 799),
					ToZZh: function (t, n) {
						return t(n)
					},
					Zjxsx: i(859, 871, 631, 705),
					FnTbf: i(951, 871, 777, 920),
					oPswH: i(991, 1064, 812, 904),
					VWLoP: n(1223, 1381, 1389, 1364) + "r",
					INRNf: function (t, n) {
						return t !== n
					},
					UlSJz: n(1381, 1364, 1529, 1509),
					mjVOw: function (t, n) {
						return t !== n
					},
					oBgvt: function (t, n) {
						return t === n
					},
					exixF: function (t, n, e, r) {
						return t(n, e, r)
					},
					YmViR: "vulCi",
					CXXBu: n(1434, 1382, 1227, 1453),
					odoxl: "wrmBf",
					Wjtpo: function (t, n) {
						return t > n
					},
					Fkrnk: n(1494, 1453, 1433, 1300),
					qUHZV: function (t, n) {
						return t > n
					},
					CWfEU: function (t, n) {
						return t !== n
					},
					fFOQP: function (t, n) {
						return t !== n
					},
					zHiQf: function (t, n) {
						return t !== n
					},
					YZjlY: n(1600, 1479, 1564, 1420),
					VtPXU: function (t, n) {
						return t === n
					},
					nhnjB: "WNMWB",
					gqbNk: function (t, n, e) {
						return t(n, e)
					},
					IaWVz: function (t, n) {
						return t * n
					},
					MSytE: function (t, n) {
						return t !== n
					},
					Pxlqs: i(648, 761, 851, 729),
					FgZOu: function (t, n) {
						return t !== n
					},
					QvPEg: i(804, 1027, 939, 913),
					YoGDh: "SnJKb",
					KiJRq: i(702, 902, 822, 770),
					iDQnT: n(1226, 1285, 1124, 1448) + "0|2|1|5",
					QBqbe: function (t, n) {
						return t / n
					},
					URFgB: i(1012, 856, 1010, 995) + n(1245, 1342, 1437, 1406) + n(1186, 1269, 1346, 1256) + "c5",
					xTlJB: i(807, 710, 870, 727) + "n/json",
					pfOUh: "POST",
					OHdhV: n(1289, 1354, 1460, 1424) + i(826, 971, 694, 832),
					LacQc: function (t, n) {
						return t === n
					},
					jVZbG: "asOiM",
					lNSOu: function (t, n) {
						return t > n
					},
					TSXkT: i(743, 984, 716, 823) + "l a class " + n(1586, 1556, 1496, 1577) + n(1240, 1374, 1400, 1367),
					NpbWY: i(865, 765, 1029, 932),
					OSJoB: function (t, n) {
						return t !== n
					},
					ejwiQ: function (t, n) {
						return t === n
					},
					sZIgf: "nrnUL",
					gfbIx: function (t, n) {
						return t + n
					},
					UnfOR: function (t, n) {
						return t !== n
					},
					YJxWp: n(1358, 1516, 1629, 1585),
					YcXBq: function (t, n) {
						return t === n
					},
					fOStA: i(947, 982, 1031, 986),
					TKgfJ: function (t, n) {
						return t === n
					},
					JylgB: n(1319, 1461, 1495, 1558),
					TPPPG: function (t, n) {
						return t > n
					},
					WwvGO: function (t, n) {
						return t === n
					},
					AJcPh: "ecuSd",
					LgzEP: i(859, 980, 1100, 967),
					jpukB: n(1259, 1333, 1365, 1387),
					JhpVT: function (t, n) {
						return t > n
					},
					ymaSI: function (t, n) {
						return t !== n
					},
					afwle: "getIsSea",
					KCHqV: n(1172, 1257, 1258, 1113) + "id",
					DRIqC: n(1403, 1460, 1439, 1403) + n(1517, 1433, 1354, 1462),
					wOofZ: i(836, 842, 912, 772) + "o",
					iSPPh: i(1045, 853, 856, 972) + "o",
					GKZEP: "getEventInfo",
					gDYKJ: n(1437, 1442, 1488, 1324) + n(1197, 1358, 1383, 1288),
					UwGfe: n(1465, 1445, 1384, 1526),
					SfLQR: i(1101, 1047, 1082, 988) + i(986, 1051, 1074, 923),
					ceRrW: n(1464, 1313, 1253, 1326),
					GsrUL: n(1205, 1302, 1236, 1180) + i(561, 698, 846, 710),
					bhMwe: i(833, 1053, 942, 984),
					hRiAG: i(759, 604, 612, 736),
					GGciZ: "install",
					MUgdP: i(1088, 987, 980, 925)
				}
				function n(t, n, e, r) {
					return c(n - 149, 0, 0, r)
				}
				function e() {
					function r(t, n, e, r) {
						return i(t - 87, n - 472, t, n - -705)
					}
					var o = t[u(742, 919, 652, 815)][r(323, 293)]("|")
					function u(t, e, r, i) {
						return n(0, i - -679, 0, e)
					}
					for (var f = 0; ; ) {
						switch (o[f++]) {
							case "0":
								this[u(0, 622, 0, 620) + u(0, 750, 0, 779)] = t.BQRyg
								continue
							case "1":
								this[r(-40, 39)] = ""
								continue
							case "2":
								this[r(267, 278)] = void 0
								continue
							case "3":
								this[u(0, 937, 0, 894)] = !1
								continue
							case "4":
								this[r(139, 239)] = void 0
								continue
							case "5":
								this[u(0, 805, 0, 825)] = ""
								continue
							case "6":
								t[u(0, 747, 0, 657)](g, this, e)
								continue
							case "7":
								var s = {}
								;(s.eventCategory = t[r(34, 33)]),
									(s[r(28, 77) + "n"] = t[r(163, 247)]),
									(s[r(402, 243)] = ""),
									(s[u(0, 684, 0, 730)] = ""),
									(this[r(217, 194)] = s)
								continue
							case "8":
								this[u(0, 539, 0, 670)] = !1
								continue
							case "9":
								var c = {}
								;(c[r(44, 142)] = t.DURMA),
									(c[r(-23, 142) + r(153, 132)] = t[r(58, 225)]),
									(c[r(252, 251)] =
										u(0, 510, 0, 593) + "vlog-uploa" + r(344, 177) + u(0, 683, 0, 764) + "ad"),
									(c["test.sea"] = t[u(0, 693, 0, 642)]),
									(c[u(0, 656, 0, 628) + "t"] =
										r(23, 14) + r(225, 309) + "d.yuuki.c" + r(255, 185) + "ad"),
									(this[r(-23, 89)] = c)
								continue
							case "10":
								this.isHostSea = this[r(111, 265)]()
								continue
							case "11":
								this[u(0, 581, 0, 572)] = !1
								continue
							case "12":
								this.type = t[r(195, 126)]
								continue
							case "13":
								this[u(0, 497, 0, 637) + r(318, 270)] = void 0
								continue
							case "14":
								this[r(214, 186) + "n"] = ""
								continue
							case "15":
								this[u(0, 619, 0, 567) + "t"] = this.getEnv()
								continue
							case "16":
								this[u(0, 670, 0, 829) + r(355, 301)] = "v2"
								continue
							case "17":
								this[u(0, 828, 0, 881)] = a[r(231, 69)][u(0, 615, 0, 589)]() || ""
								continue
							case "18":
								this["sessionSte" + u(0, 554, 0, 640)] = t[u(0, 734, 0, 617)]
								continue
							case "19":
								this[r(200, 164) + r(164, 64)] = void 0
								continue
							case "20":
								this[u(0, 771, 0, 689) + "g"] = ""
								continue
							case "21":
								this.game_uid = ""
								continue
							case "22":
								this[r(218, 299) + "nfo"] = void 0
								continue
							case "23":
								this[u(0, 1069, 0, 903)] = void 0
								continue
							case "24":
								this[u(0, 840, 0, 740)] = []
								continue
							case "25":
								this.hasUpdateUid = !1
								continue
						}
						break
					}
				}
				function i(t, n, e, r) {
					return c(r - -404, 0, 0, e)
				}
				return (
					u(
						e,
						[
							{
								key: t.afwle,
								value: function () {
									function e(t, e, r, i) {
										return n(0, t - -1631, 0, e)
									}
									function r(t, e, r, i) {
										return n(0, r - -1736, 0, i)
									}
									for (
										var i = window[r(0, 0, -269, -309)][r(0, 0, -277, -306)],
											o = [t[r(0, 0, -484, -405)], t[r(0, 0, -296, -282)], r(0, 0, -283, -373)],
											u = 0;
										t[r(0, 0, -460, -519)](u, o[e(-100, -233)]);
										u++
									)
										if (t[r(0, 0, -494, -534)] === e(-147, -11)) {
											var a = _0x7f50c9.Timestamp,
												f = _0x5d9c2f.Verification,
												s = t.iUaun(
													t[r(0, 0, -462, -488)](
														t[r(0, 0, -192, -84)](_0x457f3a, t[r(0, 0, -381, -236)]),
														a
													) + t[e(-286, -372)],
													f
												)
											_0x4710d2.sendBeacon(s, _0x1a2343)
										} else if (t[e(-316, -280)](i.indexOf(o[u]), -1)) return !0
									return !1
								}
							},
							{
								key: n(0, 1287, 0, 1187),
								value: function () {
									var e = window[r(201, 85, 182, 207)][r(61, 77, 34, -55)]
									if (t[i(79, 99, 90, 118)](e[r(302, 182, 126, 91)](t[r(-120, -56, 86, -14)]), -1))
										return t[i(131, 45, 18, 167)]
									if (e[i(469, 348, 372, 211)](r(66, 183, 55, 334) + "sea.") > -1) return t.emIyQ
									if (t[r(66, 152, 88, 300)](e.indexOf(t.ebAgd), -1)) {
										if (t[r(-201, -51, -190, 112)](t[r(90, 104, 3, 178)], t[r(121, 187, 328, 207)]))
											return r(-29, -62, -63, 68)
										if (_0x1dba35[i(426, 357, 236, 363)])
											return void _0x513830[r(71, 156, 318, 296)](_0x287b56)
										_0x20e20b[i(108, 97, -67, -67)](_0x4a6ebd)
									}
									if (t.cohRT(e[r(21, 182, 24, 350)](t[i(480, 360, 379, 242)]), -1))
										return t[r(-170, -76, -102, 8)]
									function r(t, e, r, i) {
										return n(0, e - -1382, 0, i)
									}
									function i(t, e, r, i) {
										return n(0, e - -1216, 0, i)
									}
									return t[i(0, 45, 0, 61)]
								}
							},
							{
								key: t[n(0, 1436, 0, 1361)],
								value: function () {
									function e(t, e, r, i) {
										return n(0, e - -557, 0, r)
									}
									function r(t, n, e, r) {
										return i(0, 0, r, t - 68)
									}
									return (
										f.default[e(0, 970, 911)](e(0, 797, 626) + r(900, 0, 0, 1030)) ||
										f[r(842, 0, 0, 851)][r(1042, 0, 0, 1124)](t[r(928, 0, 0, 984)]) ||
										f[e(0, 770, 851)][e(0, 970, 1096)](r(877, 0, 0, 810)) ||
										f[r(842, 0, 0, 910)][r(1042, 0, 0, 939)](t.LxrWm)
									)
								}
							},
							{
								key: i(0, 0, 1053, 961) + "ccountid",
								value: function () {
									function e(t, e, r, i) {
										return n(0, t - 177, 0, e)
									}
									var o = {
										iQSPL: function (n, e) {
											return t[((i = 1273), (o = 1406), r(i - 547, o))](n, e)
											var i, o
										}
									}
									function u(t, n, e, r) {
										return i(0, 0, t, r - -1156)
									}
									return t[u(-218, 0, 0, -261)](t.iyWJh, t[e(1437, 1579)])
										? !!o[u(-115, 0, 0, -260)](_0xea0f5.indexOf(_0x3d2556[_0x4eccaf]), -1) || void 0
										: f[u(-275, 0, 0, -382)][e(1704, 1542)](t.EAGhQ)
								}
							},
							{
								key: n(0, 1395, 0, 1467),
								value: function () {
									function t(t, e, r, i) {
										return n(0, t - -1706, 0, e)
									}
									return (
										window[t(-239, -362)][((e = 1170), (r = 1007), i(0, 0, r, e - 294))][
											t(-142, -77)
										]("#/") > -1
									)
									var e, r
								}
							},
							{
								key: t[n(0, 1468, 0, 1551)],
								value: function () {
									var n = {
										LxLBe: t[c(-353, -262, -376, -292)],
										CAosQ: function (t, n) {
											return t(n)
										}
									}
									if (!this[h(789, 680, 834, 810) + "nInfo"]) {
										if (t.goukV(t.XxYHu, t.mXNqG)) {
											var e =
													t[c(-190, -83, -241, -52)](arguments.length, 0) &&
													t[c(-393, -409, -476, -528)](arguments[0], _0xc8fb90)
														? arguments[0]
														: {},
												r = new this()
											return (0, _0x19b353[h(656, 822, 770, 544) + "ce"])(r, e)
										}
										var o = { sessionId: "" }
										return (o[c(-373, -400, -499, -249) + "p"] = ""), o
									}
									var u = f.default[h(889, 1007, 890, 770)](
											this["sessionIdC" + c(-266, -290, -277, -214)]
										),
										a = f.default[c(-197, -314, -240, -171)](
											this["sessionSte" + c(-405, -487, -530, -489)]
										)
									if (!u)
										if (t[h(742, 663, 848, 641)](t.omYVW, t.hmJez)) {
											if (
												_0x1a2771 &&
												_0x55926d.data &&
												_0xb14d37[h(679, 552, 795, 526)][n[c(-318, -333, -333, -265)]]
											) {
												var s = _0x2ac696.data["x-rpc-devi" + c(-243, -169, -367, -344)]
												;(_0x41540c[h(659, 685, 494, 655)] = s),
													(_0xfd8298.user_info[h(659, 805, 498, 761)] = s)
											}
											n[h(671, 519, 831, 687)](_0x5416f9, _0x205d2a)
										} else
											(a = 0),
												(u = t[h(824, 837, 851, 672)](
													t.VQNUs(this.uuid, "_"),
													(0, p.randomId)()
												)),
												f[h(689, 641, 859, 829)][c(-249, -222, -307, -231)](
													this[h(661, 653, 592, 732) + h(820, 744, 867, 884)],
													u,
													{ expires: this[h(788, 851, 704, 777) + c(-304, -277, -445, -157)] }
												)
									function c(t, n, e, r) {
										return i(0, 0, r, t - -1171)
									}
									function h(t, n, e, r) {
										return i(0, 0, e, t - -85)
									}
									!(a = t[c(-359, -221, -321, -320)](Number, a)) && (a = 0),
										(a += 1),
										f.default[c(-249, 0, 0, -164)](this[h(713, 0, 762) + h(681, 0, 601)], a, {
											expires: this[c(-298, 0, 0, -276) + c(-304, 0, 0, -267)]
										})
									var v = {}
									return (v.sessionId = u), (v[c(-373, 0, 0, -294) + "p"] = a), v
								}
							},
							{
								key: t.wOofZ,
								value: function () {
									function n(t, n, e, r) {
										return i(0, 0, r, t - -984)
									}
									function e(t, n, e, r) {
										return i(0, 0, t, e - -720)
									}
									var r = this.isHash()
										? window[e(329, 0, 194)][e(188, 0, 97)][e(237, 0, 259)]("#", "")
										: window[n(-70, 0, 0, -79)][n(-105, 0, 0, -142)]
									return {
										app_id: this[e(67, 0, 231)],
										page_url: this[e(365, 0, 224)] || r,
										page_name: this[e(167, 0, 263)] || r,
										page_fullurl: window[e(282, 0, 194)].href,
										utm_source: (0, p[n(-87, 0, 0, -59) + "Name"])(t[n(-149, 0, 0, 2)]),
										utm_medium: (0, p[n(-87, 0, 0, -239) + e(298, 0, 143)])(e(226, 0, 256)),
										utm_campaign: (0, p[e(268, 0, 177) + "Name"])(n(-144, 0, 0, -8) + "gn"),
										document_referrer: document[e(364, 0, 260)],
										extra_info: this[e(281, 0, 284) + e(216, 0, 255)]
									}
								}
							},
							{
								key: t[i(0, 0, 825, 868)],
								value: function () {
									function n(t, n, e, r) {
										return i(0, 0, n, e - -849)
									}
									function e(t, n, e, r) {
										return i(0, 0, t, e - -1163)
									}
									if (t[e(-161, 0, -268)](t[e(-487, 0, -451)], t.FnTbf))
										return {
											auth_key: (0, p[n(0, -91, 48) + "Name"])(t[e(-422, 0, -338)]) || "",
											authkey_ver: (0, p.getParamByName)(t[e(-97, 0, -138)]),
											game_biz: (0, p["getParamBy" + e(-303, 0, -300)])(e(-186, 0, -324)) || "",
											account_id: this[e(-415, 0, -459) + "id"]() || "",
											bh3_sea_account_id: this[e(-47, 0, -202) + e(-382, 0, -370)](),
											game_uid: this.game_uid,
											game_region: this[e(-196, 0, -272) + "n"],
											uuid: this[n(0, 207, 158)],
											device_id: this[e(-336, 0, -419)],
											extra_info: this[n(0, -105, -86) + e(-229, 0, -188)]
										}
									_0x239a41[e(-79, 0, -181)][e(-392, 0, -405) + "erty"][n(0, -111, -155)](
										_0x31f6ec,
										_0x4f5652
									) && (_0x4052f9[_0xc97318] = _0x4fe77b[_0x385a2a])
								}
							},
							{
								key: t[n(0, 1305, 0, 1454)],
								value: function () {
									function e(t, e, r, i) {
										return n(0, e - 5, 0, i)
									}
									function r(t, e, r, i) {
										return n(0, r - -507, 0, e)
									}
									if (!t.INRNf(t[r(0, 1050, 898)], t[r(0, 887, 898)])) {
										var i =
												arguments[e(0, 1536, 0, 1558)] > 0 &&
												t[e(0, 1586, 0, 1687)](arguments[0], void 0)
													? arguments[0]
													: {},
											u = i[e(0, 1380, 0, 1321) + r(0, 983, 1046)],
											a = i[r(0, 957, 828) + "n"],
											f = i[e(0, 1506, 0, 1349)],
											s = i.eventValue,
											c = i[e(0, 1342, 0, 1266)],
											h = t.oBgvt(c, void 0) ? {} : c,
											v = {
												eventCategory: u,
												eventAction: a,
												eventLabel: f,
												eventValue: s,
												timestamp: new Date().getTime(),
												extra_info: t[e(0, 1293, 0, 1220)](
													o,
													{},
													this[r(0, 941, 915) + e(0, 1327, 0, 1442)] || {},
													h
												)
											}
										return v
									}
									_0x2257f7[r(0, 846, 860)](_0x328746)
								}
							},
							{
								key: n(0, 1447, 0, 1609) + "ms",
								value: function () {
									var n = {
											JOMDq: function (t, n) {
												return t !== n
											},
											lZRFn: t[s(707, 910, 723, 843)],
											zDsnH: function (n, e) {
												return t[
													((r = 172),
													(i = 270),
													(o = 139),
													(u = 83),
													s(r - 433, i - 378, u, o - -681))
												](n, e)
												var r, i, o, u
											},
											OAMRV: t[f(1046, 956, 802, 817)],
											lrizh: t[f(1217, 1060, 1142, 955)]
										},
										e = this,
										r =
											t[s(770, 674, 590, 728)](arguments[s(860, 812, 1035, 903)], 0) &&
											t[s(974, 1067, 871, 953)](arguments[0], void 0)
												? arguments[0]
												: {},
										o = this[f(1291, 1172, 1050, 1332) + f(1045, 1145, 990, 1092)](),
										u = o.sessionId,
										a = o.sessionStep
									function f(t, n, e, r) {
										return i(0, 0, t, n - 265)
									}
									function s(t, n, e, r) {
										return i(0, 0, e, r - -75)
									}
									var c = {
										page_info: this.getPageInfo(),
										user_info: this[f(1265, 1237) + "o"](),
										event_info: this[s(0, 0, 891, 722) + "fo"](r),
										type: this.type,
										data_belong: this[f(1116, 1080) + "g"],
										mia_session_id: u,
										mia_session_step: a,
										analysis_version: this[f(1288, 1220) + s(0, 0, 906, 931)]
									}
									return new Promise(function (t) {
										var r = {
											vLJhi: i(-47, 50, 105, 162) + i(163, 278, 157, 150),
											IJkMU: function (t, e) {
												return n[
													((r = -343),
													(o = -227),
													(u = -135),
													i(r, o - -286, o - 47, u - 115))
												](t, e)
												var r, o, u
											},
											gipfn: n[o(-235, -381, -191, -341)]
										}
										function i(t, n, e, r) {
											return f(t, n - -915)
										}
										function o(t, n, e, r) {
											return s(0, 0, e, t - -917)
										}
										if (e[o(37, 0, 78)] && e[o(37, 0, 118)].appVersion && !e[i(191, 94)])
											e[i(388, 379)]
												[o(-117, 0, -248) + i(333, 196) + "s"]()
												[o(-217, 0, -129)](function (n) {
													function u(t, n, e, r) {
														return i(e, t - 285)
													}
													if (n && n[u(399, 0, 523)] && n.data[r[f(1485, 1333, 1361, 1316)]])
														if (r[u(650, 0, 494)](r.gipfn, r[u(468, 0, 422)]))
															_0x3934f9[_0x3a3adb] = _0x3ed59c[_0x32be25]
														else {
															var a = n[u(399, 0, 266)][r[u(632, 0, 478)]]
															;(e.device_id = a),
																(c[f(1100, 1062, 948, 947)][f(1218, 1080, 993, 933)] =
																	a)
														}
													function f(t, n, e, r) {
														return o(n - 1328, 0, r)
													}
													t(c)
												})
										else {
											if (n.zDsnH(n[i(88, 126)], n[o(-57, 0, -210)]))
												return _0x4e10cb[o(-78, 0, 33)][i(386, 226)].indexOf("#/") > -1
											t(c)
										}
									})
								}
							},
							{
								key: n(0, 1369, 0, 1345),
								value: function () {
									var e = {
										FBenS: r(303, 338, 194, 350) + r(239, 285, 292, 224),
										NnzJF: t[r(99, 160, 227, 225)],
										hDgJP: t.Fkrnk,
										QuQji: function (t, n) {
											return t < n
										},
										MMRGZ: function (n, e) {
											return t[
												((i = 142), (o = 244), (u = 78), r(i - 500, o, o - 111, u - -163))
											](n, e)
											var i, o, u
										}
									}
									function r(t, e, r, i) {
										return n(0, i - -1215, 0, e)
									}
									var i =
											t[s(1386, 1324, 1379, 1264)](arguments[s(1429, 1217, 1386, 1417)], 0) &&
											t[s(1100, 1224, 1227, 1057)](arguments[0], void 0)
												? arguments[0]
												: "",
										o =
											t[r(0, 78, 0, 100)](arguments[r(0, 297, 0, 316)], 1) &&
											t[r(0, 164, 0, 284)](arguments[1], void 0)
												? arguments[1]
												: "",
										u =
											t[r(0, 362, 0, 319)](arguments[r(0, 410, 0, 316)], 2) &&
											t[s(1266, 1395, 1227, 1092)](arguments[2], void 0)
												? arguments[2]
												: "",
										a = this,
										f =
											t[s(1223, 1267, 1211, 1272)](arguments[r(0, 429, 0, 316)], 3) &&
											t[s(1160, 1335, 1263, 1276)](arguments[3], void 0)
												? arguments[3]
												: ""
									function s(t, e, r, i) {
										return n(0, r - -145, 0, i)
									}
									var c =
										t.cohRT(arguments[r(0, 410, 0, 316)], 4) && t.zHiQf(arguments[4], void 0)
											? arguments[4]
											: {}
									try {
										if (!t[r(0, 128, 0, 116)](t.YZjlY, s(0, 0, 1309, 1190))) {
											for (
												var h = _0x564664[s(0, 0, 1322, 1303)][r(0, 184, 0, 244)],
													v = [e.FBenS, e[s(0, 0, 1119, 1260)], e[r(0, 183, 0, 222)]],
													l = 0;
												e[s(0, 0, 1310, 1380)](l, v[s(0, 0, 1386, 1433)]);
												l++
											)
												if (e[r(0, 460, 0, 334)](h[r(0, 493, 0, 349)](v[l]), -1)) return !0
											return !1
										}
										var p = {
											eventCategory: i,
											eventAction: o,
											eventLabel: u,
											eventValue: f,
											extraInfo: t[r(0, 136, 0, 44)](
												Object[r(0, 203, 0, 320)][r(0, -18, 0, 86)][s(0, 0, 1102, 1162)](c),
												r(0, 196, 0, 248) + r(0, -69, 0, 80)
											)
												? c
												: {}
										}
										this[s(0, 0, 1302, 1339) + "ms"](p).then(function (t) {
											var n, e, i, o
											a[((i = 1130), (o = 1126), r(0, i, 0, o - 768))]
												? a[((n = 1337), (e = 1176), s(0, 0, e - -217, n))](t)
												: a.post(t)
										})
									} catch (n) {
										t.goukV(t.nhnjB, t.nhnjB)
											? console[s(0, 0, 1222, 1219)](n)
											: (this[s(0, 0, 1352, 1313)] = _0x5ebeb1)
									}
								}
							},
							{
								key: t[i(0, 0, 1081, 917)],
								value: function () {
									function n(t, n, e, r) {
										return i(0, 0, t, r - 677)
									}
									var e = {
										lIPXm: function (t, n) {
											return t > n
										},
										HuJVj: function (n, e, r) {
											return t.gqbNk(n, e, r)
										},
										ZzLig: function (n, e) {
											return t.IaWVz(n, e)
										}
									}
									function r(t, n, e, r) {
										return i(0, 0, t, n - 344)
									}
									if (t[n(1691, 0, 0, 1539)](n(1611, 0, 0, 1518), t[n(1280, 0, 0, 1436)])) {
										var o = this,
											u =
												t[n(1702, 0, 0, 1580)](arguments[n(1632, 0, 0, 1655)], 0) &&
												t[n(1578, 0, 0, 1670)](arguments[0], void 0)
													? arguments[0]
													: {}
										try {
											var a = u[r(1083, 1125)],
												f = u[r(1237, 1298)]
											a && (this[n(1695, 0, 0, 1621)] = a),
												f && (this.pagename = f),
												this[r(1151, 1238) + "ms"](this[r(1314, 1243)])[r(1224, 1119)](
													function (t) {
														function e(t, e, r, i) {
															return n(e, 0, 0, r - -280)
														}
														var i, u
														o[e(0, 1544, 1417)]
															? o[((i = 216), (u = 52), r(i, u - -1277))](t)
															: o[e(0, 1161, 1157)](t)
													}
												)
										} catch (t) {
											console[n(1427, 0, 0, 1491)](t)
										}
									} else {
										if (e.lIPXm(_0x537987, 10)) return
										e[n(1731, 0, 0, 1643)](
											_0x10a3ff,
											function () {
												var t, n
												_0x4b1dbc[((t = 434), (n = 306), r(n, t - -670))](_0x41aba9)
											},
											e[r(1135, 1265)](_0xd7a64a, 100)
										)
									}
								}
							},
							{
								key: t[n(0, 1353, 0, 1286)],
								value: function () {
									function e(t, n, e, r) {
										return i(0, 0, e, n - -707)
									}
									function r(t, e, r, i) {
										return n(0, t - -1200, 0, e)
									}
									if (t[r(201, 310)](t[r(362, 488)], t[r(225, 325)]))
										for (var o = t[r(241, 93)][e(0, 291, 173)]("|"), u = 0; ; ) {
											switch (o[u++]) {
												case "0":
													this[e(0, 58, 137) + "id"] = !0
													continue
												case "1":
													this[r(244, 255) + "n"] = s
													continue
												case "2":
													this.game_uid = f
													continue
												case "3":
													var a =
														t.Wjtpo(arguments[e(0, 271, 110)], 0) &&
														t.fFOQP(arguments[0], void 0)
															? arguments[0]
															: {}
													continue
												case "4":
													var f = a.uid,
														s = a[r(49, 45)]
													continue
											}
											break
										}
									else _0xf3d0f8[e(0, 53, 74)](_0x6757f0)
								}
							},
							{
								key: t.SfLQR,
								value: function (e) {
									var r = t.iDQnT[o(1177, 1251, 1238, 1218)]("|")
									function o(t, e, r, i) {
										return n(0, r - -313, 0, e)
									}
									var u = 0
									function a(t, n, e, r) {
										return i(0, 0, e, n - -1109)
									}
									for (;;) {
										switch (r[u++]) {
											case "0":
												var f = parseInt(t[o(0, 869, 958)](Date[o(0, 1323, 1199)](), 1e3), 10)
												continue
											case "1":
												var c = (0, l[o(0, 892, 1014)])(
													[g, y, v, p, f, h][a(0, -379, -447)]("\n")
												)
												continue
											case "2":
												var h = t[a(0, -152, -288)]
												continue
											case "3":
												var v = t[a(0, -279, -129)]
												continue
											case "4":
												var p = m[a(0, -385, -229)]
												continue
											case "5":
												var d = {}
												return (
													(d[o(0, 952, 1118) + "pe"] = v),
													(d[a(0, -259, -123) + "5"] = y),
													(d[o(0, 1039, 1190)] = f),
													(d[a(0, -166, -14) + "on"] = c),
													d
												)
											case "6":
												var g = t[a(0, -358, -492)]
												continue
											case "7":
												var y = (0, s[a(0, -335, -275)])(e)
												continue
											case "8":
												var w = {}
												w[o(0, 949, 1101)] = v
												var m = new Blob([e], w)
												continue
										}
										break
									}
								}
							},
							{
								key: t.ceRrW,
								value: function () {
									var e = {}
									function r(t, e, r, i) {
										return n(0, e - -317, 0, i)
									}
									;(e[u(1520, 1512, 1356, 1377)] = t[u(1659, 1611, 1657, 1576)]),
										(e[r(0, 961, 0, 1104)] = u(1248, 1374, 1527, 1529) + u(1765, 1602, 1741, 1559))
									var o = e
									function u(t, n, e, r) {
										return i(0, 0, e, n - 674)
									}
									if (t[u(0, 1569, 1490)](t[u(0, 1687, 1521)], r(0, 1168, 0, 1315))) {
										var a =
											t[u(0, 1645, 1510)](arguments[r(0, 1214, 0, 1070)], 0) &&
											t[u(0, 1619, 1577)](arguments[0], void 0)
												? arguments[0]
												: {}
										try {
											if (!t[r(0, 1044, 0, 1072)](t[r(0, 1185, 0, 1222)], t[u(0, 1623, 1545)]))
												throw new _0x3890bb(o[u(0, 1512, 1589)])
											var f = this.apis[this[u(0, 1367, 1434) + "t"]]
											if (!f) return
											var s = JSON[r(0, 1046, 0, 989)](a),
												c = this[u(0, 1662, 1602) + r(0, 1159, 0, 1097)](s)
											if (this[u(0, 1372, 1313)]) {
												var h = c[u(0, 1624, 1527)],
													v = c[r(0, 1179, 0, 1085) + "on"],
													l = t[u(0, 1665, 1575)](
														t[u(0, 1395, 1309)](
															t[u(0, 1583, 1526)](t.gfbIx(f, t[u(0, 1476, 1454)]), h),
															t[u(0, 1466, 1630)]
														),
														v
													)
												navigator[u(0, 1413, 1293)](l, s)
											} else {
												if (t.UnfOR(u(0, 1637, 1538), t[u(0, 1508, 1376)]))
													return t[u(0, 1382, 1457)]
												var p = new XMLHttpRequest()
												;(p[u(0, 1460, 1389) + "tials"] = !0),
													p.open("POST", f, !0),
													Object[u(0, 1559, 1725)](c)[r(0, 1101, 0, 1016)](function (n) {
														var e = {}
														function r(t, n, e, r) {
															return u(0, n - -1507, e)
														}
														function i(t, n, e, r) {
															return u(0, n - -10, e)
														}
														;(e[r(-39, -62, -53, -145)] = t[r(-80, 18, 139, 153)]),
															(e.xkRXV = r(11, -32, -41, 110)),
															(e[r(0, -105, -32)] = "ltuid_v2")
														var o = e
														if (!t[r(0, -116, -159)](t.jVZbG, t.jVZbG))
															return (
																_0x248506[i(0, 1438, 1411)][r(0, 141, 87)](
																	o[r(0, -62, 17)]
																) ||
																_0x1f8871[r(0, -59, -50)][i(0, 1638, 1585)](o.xkRXV) ||
																_0x334352[i(0, 1438, 1521)][i(0, 1638, 1489)](
																	o[i(0, 1392, 1322)]
																) ||
																_0x20bac6[r(0, -59, 61)][r(0, 141, 169)](
																	i(0, 1384, 1520)
																)
															)
														p["setRequest" + i(0, 1603, 1478)](n, c[n])
													}),
													p[u(0, 1627, 1585)](s)
											}
										} catch (n) {
											if (t[r(0, 938, 0, 778)](t[r(0, 1200, 0, 1109)], t[u(0, 1638, 1693)]))
												console[r(0, 1081, 0, 979)](n)
											else {
												var d = _0x441103[u(0, 1438, 1389)][o[u(0, 1399, 1501)]]
												;(_0x5c8b2f[r(0, 980, 0, 1057)] = d),
													(_0x29e1fa[u(0, 1400, 1557)][u(0, 1418, 1328)] = d)
											}
										}
									} else {
										var g = {
												HdFdy: function (n, e) {
													return t[((r = 1e3), (i = 984), u(0, r - -494, i))](n, e)
													var r, i
												},
												dsdPr: function (t, n) {
													return t * n
												}
											},
											y = this
										this[r(0, 1102, 0, 1253)][u(0, 1539, 1391)](function (t, n) {
											var e, r
											g[((e = 412), (r = 324), u(0, r - -1194, e))](n, 10) ||
												_0x533ec4(function () {
													y.post(t)
												}, g.dsdPr(n, 100))
										})
									}
								}
							},
							{
								key: t.GsrUL,
								value: function () {
									function e(t, e, r, i) {
										return n(0, e - -21, 0, i)
									}
									var r = this
									this[e(0, 1398, 0, 1446)][e(0, 1397, 0, 1303)](function (i, o) {
										var u = {
											Sieih: function (n, e) {
												return t.TKgfJ(n, e)
											},
											CnvRC: t[a(778, 780, 617, 886)],
											hYDrQ: "GbRMc"
										}
										function a(t, e, r, i) {
											return n(0, e - 493 - -1124, 0, i)
										}
										function f(t, n, r, i) {
											return e(0, r - -856, 0, n)
										}
										t[a(0, 726, 0, 852)](o, 10) ||
											setTimeout(function () {
												function t(t, n, e, r) {
													return f(0, r, n - -169)
												}
												function n(t, n, e, r) {
													return f(0, t, e - -768)
												}
												if (u[t(0, 295, 0, 163)](u.CnvRC, u[t(0, 297, 0, 180)])) {
													var e = arguments[_0x32e7e3]
													for (var o in e)
														_0x184024.prototype[t(0, 265, 0, 218) + t(0, 220, 0, 339)][
															n(-432, 0, -398)
														](e, o) && (_0x1a1fb5[o] = e[o])
												} else r[n(-490, 0, -332)](i)
											}, 100 * o)
									})
								}
							},
							{
								key: t.bhMwe,
								value: function () {
									var t, n
									this[((t = 481), (n = 639), i(0, 0, n, t - -539))] = !0
								}
							},
							{
								key: n(0, 1538, 0, 1472),
								value: function (e) {
									function r(t, e, r, i) {
										return n(0, e - 119, 0, t)
									}
									function o(t, n, e, r) {
										return i(0, 0, t, e - -832)
									}
									t[o(-89, 0, 39)](t[r(1366, 1451)], r(1487, 1394))
										? (this.pagename = _0x56043b)
										: this[r(1396, 1538)][o(-190, 0, -140)](e)
								}
							},
							{
								key: "popStash",
								value: function () {
									function e(t, e, r, i) {
										return n(0, t - -945, 0, i)
									}
									function r(t, e, r, i) {
										return n(0, e - -1749, 0, i)
									}
									if (
										((this[e(628, 0, 0, 646)] = !1),
										t[r(0, -388, 0, -226)](this.eventList[e(586, 0, 0, 628)], 0))
									) {
										if (t[e(597, 0, 0, 512)] !== t[e(585, 0, 0, 517)]) return
										this[r(0, -330, 0, -189)] = []
									}
									this[e(357, 0, 0, 279) + r(0, -486, 0, -386)](), this.clearStash()
								}
							},
							{
								key: t[i(0, 0, 814, 737)],
								value: function () {
									var t, n
									this[((t = -152), (n = -110), i(0, 0, n, t - -1018))] = []
								}
							}
						],
						[
							{
								key: t[n(0, 1547, 0, 1682)],
								value: function (n) {
									var e =
										t[a(409, 516, 546, 419)](arguments.length, 1) &&
										t[a(684, 697, 425, 541)](arguments[1], void 0)
											? arguments[1]
											: {}
									function r(t, n, e, r) {
										return i(0, 0, n, r - -41)
									}
									var u = new this()
									function a(t, n, e, r) {
										return i(0, 0, t, r - -336)
									}
									var f = {}
									;(f[r(0, 604, 0, 772)] = n),
										(0, p[r(0, 828, 0, 700) + "ce"])(u, t[r(0, 727, 0, 692)](o, f, e))
								}
							},
							{
								key: t[i(0, 0, 932, 990)],
								value: function () {
									var n =
										arguments.length > 0 && t[e(995, 698, 826, 755)](arguments[0], void 0)
											? arguments[0]
											: {}
									function e(t, n, e, r) {
										return i(0, 0, r, e - -167)
									}
									var r = new this()
									function o(t, n, e, r) {
										return i(0, 0, t, n - -1133)
									}
									return (0, p[o(-269, -392) + "ce"])(r, n)
								}
							}
						]
					),
					e
				)
			})()
			n[c(1178, 0, 0, 1234)] = y
		},
		function (t, n, e) {
			var r
			"undefined" != typeof self && self,
				(t.exports =
					((r = e(1)),
					(function (t) {
						var n = {}
						function e(r) {
							if (n[r]) return n[r].exports
							var i = (n[r] = { i: r, l: !1, exports: {} })
							return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports
						}
						return (
							(e.m = t),
							(e.c = n),
							(e.d = function (t, n, r) {
								e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r })
							}),
							(e.r = function (t) {
								"undefined" != typeof Symbol &&
									Symbol.toStringTag &&
									Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
									Object.defineProperty(t, "__esModule", { value: !0 })
							}),
							(e.t = function (t, n) {
								if ((1 & n && (t = e(t)), 8 & n)) return t
								if (4 & n && "object" == typeof t && t && t.__esModule) return t
								var r = Object.create(null)
								if (
									(e.r(r),
									Object.defineProperty(r, "default", { enumerable: !0, value: t }),
									2 & n && "string" != typeof t)
								)
									for (var i in t)
										e.d(
											r,
											i,
											function (n) {
												return t[n]
											}.bind(null, i)
										)
								return r
							}),
							(e.n = function (t) {
								var n =
									t && t.__esModule
										? function () {
												return t.default
										  }
										: function () {
												return t
										  }
								return e.d(n, "a", n), n
							}),
							(e.o = function (t, n) {
								return Object.prototype.hasOwnProperty.call(t, n)
							}),
							(e.p = ""),
							e((e.s = 0))
						)
					})([
						function (t, n, e) {
							"use strict"
							Object.defineProperty(n, "__esModule", { value: !0 })
							var r,
								i = (r = e(1)) && r.__esModule ? r : { default: r }
							function o(t) {
								if (window.location.host.indexOf(".yuuki.me") > -1)
									i.default.set("_MHYUUID", t, { domain: ".yuuki.me", path: "/", expires: 365 })
								else {
									var n = window.location.hostname.split(".").slice(-2).join(".")
									i.default.set("_MHYUUID", t, { domain: "." + n, path: "/", expires: 365 })
								}
							}
							n.default = {
								getVisitorId: function () {
									var t = this
									return new Promise(function (n) {
										n(t.getUuid())
									})
								},
								getUuid: function () {
									var t = i.default.get("_MHYUUID")
									return t
										? (o(t), t)
										: (o(
												(t = (function () {
													if (window.crypto && window.crypto.randomUUID)
														return window.crypto.randomUUID()
													if (window.crypto && window.crypto.getRandomValues) {
														var t = new Uint8Array(16)
														window.crypto.getRandomValues(t),
															(t[6] &= 15),
															(t[6] |= 64),
															(t[8] &= 63),
															(t[8] |= 128)
														var n = Array.prototype.map
															.call(t, function (t) {
																return ("0" + t.toString(16)).slice(-2)
															})
															.join("")
														return (
															n.substr(0, 8) +
															"-" +
															n.substr(8, 4) +
															"-4" +
															n.substr(12, 3) +
															"-" +
															n.substr(15, 4) +
															"-" +
															n.substr(19, 12)
														)
													}
													var e = Date.now()
													return (
														"undefined" != typeof performance &&
															"function" == typeof performance.now &&
															(e += performance.now()),
														"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
															/[xy]/g,
															function (t) {
																var n = (e + 16 * Math.random()) % 16 | 0
																return (
																	(e = Math.floor(e / 16)),
																	("x" === t ? n : (3 & n) | 8).toString(16)
																)
															}
														)
													)
												})())
										  ),
										  t)
								}
							}
						},
						function (t, n) {
							t.exports = r
						}
					]).default))
		},
		function (t, n, e) {
			var r, i, o, u, a
			;(r = e(2)),
				(i = e(0).utf8),
				(o = e(6)),
				(u = e(0).bin),
				((a = function (t, n) {
					t.constructor == String
						? (t = n && "binary" === n.encoding ? u.stringToBytes(t) : i.stringToBytes(t))
						: o(t)
						? (t = Array.prototype.slice.call(t, 0))
						: Array.isArray(t) || t.constructor === Uint8Array || (t = t.toString())
					for (
						var e = r.bytesToWords(t),
							f = 8 * t.length,
							s = 1732584193,
							c = -271733879,
							h = -1732584194,
							v = 271733878,
							l = 0;
						l < e.length;
						l++
					)
						e[l] = (16711935 & ((e[l] << 8) | (e[l] >>> 24))) | (4278255360 & ((e[l] << 24) | (e[l] >>> 8)))
					;(e[f >>> 5] |= 128 << f % 32), (e[14 + (((f + 64) >>> 9) << 4)] = f)
					var p = a._ff,
						d = a._gg,
						g = a._hh,
						y = a._ii
					for (l = 0; l < e.length; l += 16) {
						var w = s,
							m = c,
							x = h,
							b = v
						;(s = p(s, c, h, v, e[l + 0], 7, -680876936)),
							(v = p(v, s, c, h, e[l + 1], 12, -389564586)),
							(h = p(h, v, s, c, e[l + 2], 17, 606105819)),
							(c = p(c, h, v, s, e[l + 3], 22, -1044525330)),
							(s = p(s, c, h, v, e[l + 4], 7, -176418897)),
							(v = p(v, s, c, h, e[l + 5], 12, 1200080426)),
							(h = p(h, v, s, c, e[l + 6], 17, -1473231341)),
							(c = p(c, h, v, s, e[l + 7], 22, -45705983)),
							(s = p(s, c, h, v, e[l + 8], 7, 1770035416)),
							(v = p(v, s, c, h, e[l + 9], 12, -1958414417)),
							(h = p(h, v, s, c, e[l + 10], 17, -42063)),
							(c = p(c, h, v, s, e[l + 11], 22, -1990404162)),
							(s = p(s, c, h, v, e[l + 12], 7, 1804603682)),
							(v = p(v, s, c, h, e[l + 13], 12, -40341101)),
							(h = p(h, v, s, c, e[l + 14], 17, -1502002290)),
							(s = d(s, (c = p(c, h, v, s, e[l + 15], 22, 1236535329)), h, v, e[l + 1], 5, -165796510)),
							(v = d(v, s, c, h, e[l + 6], 9, -1069501632)),
							(h = d(h, v, s, c, e[l + 11], 14, 643717713)),
							(c = d(c, h, v, s, e[l + 0], 20, -373897302)),
							(s = d(s, c, h, v, e[l + 5], 5, -701558691)),
							(v = d(v, s, c, h, e[l + 10], 9, 38016083)),
							(h = d(h, v, s, c, e[l + 15], 14, -660478335)),
							(c = d(c, h, v, s, e[l + 4], 20, -405537848)),
							(s = d(s, c, h, v, e[l + 9], 5, 568446438)),
							(v = d(v, s, c, h, e[l + 14], 9, -1019803690)),
							(h = d(h, v, s, c, e[l + 3], 14, -187363961)),
							(c = d(c, h, v, s, e[l + 8], 20, 1163531501)),
							(s = d(s, c, h, v, e[l + 13], 5, -1444681467)),
							(v = d(v, s, c, h, e[l + 2], 9, -51403784)),
							(h = d(h, v, s, c, e[l + 7], 14, 1735328473)),
							(s = g(s, (c = d(c, h, v, s, e[l + 12], 20, -1926607734)), h, v, e[l + 5], 4, -378558)),
							(v = g(v, s, c, h, e[l + 8], 11, -2022574463)),
							(h = g(h, v, s, c, e[l + 11], 16, 1839030562)),
							(c = g(c, h, v, s, e[l + 14], 23, -35309556)),
							(s = g(s, c, h, v, e[l + 1], 4, -1530992060)),
							(v = g(v, s, c, h, e[l + 4], 11, 1272893353)),
							(h = g(h, v, s, c, e[l + 7], 16, -155497632)),
							(c = g(c, h, v, s, e[l + 10], 23, -1094730640)),
							(s = g(s, c, h, v, e[l + 13], 4, 681279174)),
							(v = g(v, s, c, h, e[l + 0], 11, -358537222)),
							(h = g(h, v, s, c, e[l + 3], 16, -722521979)),
							(c = g(c, h, v, s, e[l + 6], 23, 76029189)),
							(s = g(s, c, h, v, e[l + 9], 4, -640364487)),
							(v = g(v, s, c, h, e[l + 12], 11, -421815835)),
							(h = g(h, v, s, c, e[l + 15], 16, 530742520)),
							(s = y(s, (c = g(c, h, v, s, e[l + 2], 23, -995338651)), h, v, e[l + 0], 6, -198630844)),
							(v = y(v, s, c, h, e[l + 7], 10, 1126891415)),
							(h = y(h, v, s, c, e[l + 14], 15, -1416354905)),
							(c = y(c, h, v, s, e[l + 5], 21, -57434055)),
							(s = y(s, c, h, v, e[l + 12], 6, 1700485571)),
							(v = y(v, s, c, h, e[l + 3], 10, -1894986606)),
							(h = y(h, v, s, c, e[l + 10], 15, -1051523)),
							(c = y(c, h, v, s, e[l + 1], 21, -2054922799)),
							(s = y(s, c, h, v, e[l + 8], 6, 1873313359)),
							(v = y(v, s, c, h, e[l + 15], 10, -30611744)),
							(h = y(h, v, s, c, e[l + 6], 15, -1560198380)),
							(c = y(c, h, v, s, e[l + 13], 21, 1309151649)),
							(s = y(s, c, h, v, e[l + 4], 6, -145523070)),
							(v = y(v, s, c, h, e[l + 11], 10, -1120210379)),
							(h = y(h, v, s, c, e[l + 2], 15, 718787259)),
							(c = y(c, h, v, s, e[l + 9], 21, -343485551)),
							(s = (s + w) >>> 0),
							(c = (c + m) >>> 0),
							(h = (h + x) >>> 0),
							(v = (v + b) >>> 0)
					}
					return r.endian([s, c, h, v])
				})._ff = function (t, n, e, r, i, o, u) {
					var a = t + ((n & e) | (~n & r)) + (i >>> 0) + u
					return ((a << o) | (a >>> (32 - o))) + n
				}),
				(a._gg = function (t, n, e, r, i, o, u) {
					var a = t + ((n & r) | (e & ~r)) + (i >>> 0) + u
					return ((a << o) | (a >>> (32 - o))) + n
				}),
				(a._hh = function (t, n, e, r, i, o, u) {
					var a = t + (n ^ e ^ r) + (i >>> 0) + u
					return ((a << o) | (a >>> (32 - o))) + n
				}),
				(a._ii = function (t, n, e, r, i, o, u) {
					var a = t + (e ^ (n | ~r)) + (i >>> 0) + u
					return ((a << o) | (a >>> (32 - o))) + n
				}),
				(a._blocksize = 16),
				(a._digestsize = 16),
				(t.exports = function (t, n) {
					if (null == t) throw new Error("Illegal argument " + t)
					var e = r.wordsToBytes(a(t, n))
					return n && n.asBytes ? e : n && n.asString ? u.bytesToString(e) : r.bytesToHex(e)
				})
		},
		function (t, n) {
			function e(t) {
				return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
			}
			/*!
			 * Determine if an object is a Buffer
			 *
			 * @author   Feross Aboukhadijeh <https://feross.org>
			 * @license  MIT
			 */
			t.exports = function (t) {
				return (
					null != t &&
					(e(t) ||
						(function (t) {
							return (
								"function" == typeof t.readFloatLE && "function" == typeof t.slice && e(t.slice(0, 0))
							)
						})(t) ||
						!!t._isBuffer)
				)
			}
		},
		function (t, n, e) {
			;(function (n) {
				var r, i, o, u
				;(r = e(2)),
					(i = e(0).utf8),
					(o = e(0).bin),
					((u = function (t, e) {
						var u = r.wordsToBytes(
							(function (t) {
								t.constructor == String
									? (t = i.stringToBytes(t))
									: void 0 !== n && "function" == typeof n.isBuffer && n.isBuffer(t)
									? (t = Array.prototype.slice.call(t, 0))
									: Array.isArray(t) || (t = t.toString())
								var e = r.bytesToWords(t),
									o = 8 * t.length,
									u = [],
									a = 1732584193,
									f = -271733879,
									s = -1732584194,
									c = 271733878,
									h = -1009589776
								;(e[o >> 5] |= 128 << (24 - (o % 32))), (e[15 + (((o + 64) >>> 9) << 4)] = o)
								for (var v = 0; v < e.length; v += 16) {
									for (var l = a, p = f, d = s, g = c, y = h, w = 0; w < 80; w++) {
										if (w < 16) u[w] = e[v + w]
										else {
											var m = u[w - 3] ^ u[w - 8] ^ u[w - 14] ^ u[w - 16]
											u[w] = (m << 1) | (m >>> 31)
										}
										var x =
											((a << 5) | (a >>> 27)) +
											h +
											(u[w] >>> 0) +
											(w < 20
												? 1518500249 + ((f & s) | (~f & c))
												: w < 40
												? 1859775393 + (f ^ s ^ c)
												: w < 60
												? ((f & s) | (f & c) | (s & c)) - 1894007588
												: (f ^ s ^ c) - 899497514)
										;(h = c), (c = s), (s = (f << 30) | (f >>> 2)), (f = a), (a = x)
									}
									;(a += l), (f += p), (s += d), (c += g), (h += y)
								}
								return [a, f, s, c, h]
							})(t)
						)
						return e && e.asBytes ? u : e && e.asString ? o.bytesToString(u) : r.bytesToHex(u)
					})._blocksize = 16),
					(u._digestsize = 20),
					(t.exports = u)
			}).call(this, e(8).Buffer)
		},
		function (t, n, e) {
			"use strict"
			;(function (t) {
				/*!
				 * The buffer module from node.js, for the browser.
				 *
				 * @author   Feross Aboukhadijeh <http://feross.org>
				 * @license  MIT
				 */
				var r = e(10),
					i = e(11),
					o = e(12)
				function u() {
					return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
				}
				function a(t, n) {
					if (u() < n) throw new RangeError("Invalid typed array length")
					return (
						f.TYPED_ARRAY_SUPPORT
							? ((t = new Uint8Array(n)).__proto__ = f.prototype)
							: (null === t && (t = new f(n)), (t.length = n)),
						t
					)
				}
				function f(t, n, e) {
					if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f)) return new f(t, n, e)
					if ("number" == typeof t) {
						if ("string" == typeof n)
							throw new Error("If encoding is specified then the first argument must be a string")
						return h(this, t)
					}
					return s(this, t, n, e)
				}
				function s(t, n, e, r) {
					if ("number" == typeof n) throw new TypeError('"value" argument must not be a number')
					return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer
						? (function (t, n, e, r) {
								if ((n.byteLength, e < 0 || n.byteLength < e))
									throw new RangeError("'offset' is out of bounds")
								if (n.byteLength < e + (r || 0)) throw new RangeError("'length' is out of bounds")
								n =
									void 0 === e && void 0 === r
										? new Uint8Array(n)
										: void 0 === r
										? new Uint8Array(n, e)
										: new Uint8Array(n, e, r)
								f.TYPED_ARRAY_SUPPORT ? ((t = n).__proto__ = f.prototype) : (t = v(t, n))
								return t
						  })(t, n, e, r)
						: "string" == typeof n
						? (function (t, n, e) {
								;("string" == typeof e && "" !== e) || (e = "utf8")
								if (!f.isEncoding(e)) throw new TypeError('"encoding" must be a valid string encoding')
								var r = 0 | p(n, e),
									i = (t = a(t, r)).write(n, e)
								i !== r && (t = t.slice(0, i))
								return t
						  })(t, n, e)
						: (function (t, n) {
								if (f.isBuffer(n)) {
									var e = 0 | l(n.length)
									return 0 === (t = a(t, e)).length || n.copy(t, 0, 0, e), t
								}
								if (n) {
									if (
										("undefined" != typeof ArrayBuffer && n.buffer instanceof ArrayBuffer) ||
										"length" in n
									)
										return "number" != typeof n.length || (r = n.length) != r ? a(t, 0) : v(t, n)
									if ("Buffer" === n.type && o(n.data)) return v(t, n.data)
								}
								var r
								throw new TypeError(
									"First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
								)
						  })(t, n)
				}
				function c(t) {
					if ("number" != typeof t) throw new TypeError('"size" argument must be a number')
					if (t < 0) throw new RangeError('"size" argument must not be negative')
				}
				function h(t, n) {
					if ((c(n), (t = a(t, n < 0 ? 0 : 0 | l(n))), !f.TYPED_ARRAY_SUPPORT))
						for (var e = 0; e < n; ++e) t[e] = 0
					return t
				}
				function v(t, n) {
					var e = n.length < 0 ? 0 : 0 | l(n.length)
					t = a(t, e)
					for (var r = 0; r < e; r += 1) t[r] = 255 & n[r]
					return t
				}
				function l(t) {
					if (t >= u())
						throw new RangeError(
							"Attempt to allocate Buffer larger than maximum size: 0x" + u().toString(16) + " bytes"
						)
					return 0 | t
				}
				function p(t, n) {
					if (f.isBuffer(t)) return t.length
					if (
						"undefined" != typeof ArrayBuffer &&
						"function" == typeof ArrayBuffer.isView &&
						(ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
					)
						return t.byteLength
					"string" != typeof t && (t = "" + t)
					var e = t.length
					if (0 === e) return 0
					for (var r = !1; ; )
						switch (n) {
							case "ascii":
							case "latin1":
							case "binary":
								return e
							case "utf8":
							case "utf-8":
							case void 0:
								return Y(t).length
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return 2 * e
							case "hex":
								return e >>> 1
							case "base64":
								return k(t).length
							default:
								if (r) return Y(t).length
								;(n = ("" + n).toLowerCase()), (r = !0)
						}
				}
				function d(t, n, e) {
					var r = !1
					if (((void 0 === n || n < 0) && (n = 0), n > this.length)) return ""
					if (((void 0 === e || e > this.length) && (e = this.length), e <= 0)) return ""
					if ((e >>>= 0) <= (n >>>= 0)) return ""
					for (t || (t = "utf8"); ; )
						switch (t) {
							case "hex":
								return D(this, n, e)
							case "utf8":
							case "utf-8":
								return C(this, n, e)
							case "ascii":
								return z(this, n, e)
							case "latin1":
							case "binary":
								return L(this, n, e)
							case "base64":
								return E(this, n, e)
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return S(this, n, e)
							default:
								if (r) throw new TypeError("Unknown encoding: " + t)
								;(t = (t + "").toLowerCase()), (r = !0)
						}
				}
				function g(t, n, e) {
					var r = t[n]
					;(t[n] = t[e]), (t[e] = r)
				}
				function y(t, n, e, r, i) {
					if (0 === t.length) return -1
					if (
						("string" == typeof e
							? ((r = e), (e = 0))
							: e > 2147483647
							? (e = 2147483647)
							: e < -2147483648 && (e = -2147483648),
						(e = +e),
						isNaN(e) && (e = i ? 0 : t.length - 1),
						e < 0 && (e = t.length + e),
						e >= t.length)
					) {
						if (i) return -1
						e = t.length - 1
					} else if (e < 0) {
						if (!i) return -1
						e = 0
					}
					if (("string" == typeof n && (n = f.from(n, r)), f.isBuffer(n)))
						return 0 === n.length ? -1 : w(t, n, e, r, i)
					if ("number" == typeof n)
						return (
							(n &= 255),
							f.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf
								? i
									? Uint8Array.prototype.indexOf.call(t, n, e)
									: Uint8Array.prototype.lastIndexOf.call(t, n, e)
								: w(t, [n], e, r, i)
						)
					throw new TypeError("val must be string, number or Buffer")
				}
				function w(t, n, e, r, i) {
					var o,
						u = 1,
						a = t.length,
						f = n.length
					if (
						void 0 !== r &&
						("ucs2" === (r = String(r).toLowerCase()) ||
							"ucs-2" === r ||
							"utf16le" === r ||
							"utf-16le" === r)
					) {
						if (t.length < 2 || n.length < 2) return -1
						;(u = 2), (a /= 2), (f /= 2), (e /= 2)
					}
					function s(t, n) {
						return 1 === u ? t[n] : t.readUInt16BE(n * u)
					}
					if (i) {
						var c = -1
						for (o = e; o < a; o++)
							if (s(t, o) === s(n, -1 === c ? 0 : o - c)) {
								if ((-1 === c && (c = o), o - c + 1 === f)) return c * u
							} else -1 !== c && (o -= o - c), (c = -1)
					} else
						for (e + f > a && (e = a - f), o = e; o >= 0; o--) {
							for (var h = !0, v = 0; v < f; v++)
								if (s(t, o + v) !== s(n, v)) {
									h = !1
									break
								}
							if (h) return o
						}
					return -1
				}
				function m(t, n, e, r) {
					e = Number(e) || 0
					var i = t.length - e
					r ? (r = Number(r)) > i && (r = i) : (r = i)
					var o = n.length
					if (o % 2 != 0) throw new TypeError("Invalid hex string")
					r > o / 2 && (r = o / 2)
					for (var u = 0; u < r; ++u) {
						var a = parseInt(n.substr(2 * u, 2), 16)
						if (isNaN(a)) return u
						t[e + u] = a
					}
					return u
				}
				function x(t, n, e, r) {
					return N(Y(n, t.length - e), t, e, r)
				}
				function b(t, n, e, r) {
					return N(
						(function (t) {
							for (var n = [], e = 0; e < t.length; ++e) n.push(255 & t.charCodeAt(e))
							return n
						})(n),
						t,
						e,
						r
					)
				}
				function A(t, n, e, r) {
					return b(t, n, e, r)
				}
				function _(t, n, e, r) {
					return N(k(n), t, e, r)
				}
				function B(t, n, e, r) {
					return N(
						(function (t, n) {
							for (var e, r, i, o = [], u = 0; u < t.length && !((n -= 2) < 0); ++u)
								(e = t.charCodeAt(u)), (r = e >> 8), (i = e % 256), o.push(i), o.push(r)
							return o
						})(n, t.length - e),
						t,
						e,
						r
					)
				}
				function E(t, n, e) {
					return 0 === n && e === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(n, e))
				}
				function C(t, n, e) {
					e = Math.min(t.length, e)
					for (var r = [], i = n; i < e; ) {
						var o,
							u,
							a,
							f,
							s = t[i],
							c = null,
							h = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1
						if (i + h <= e)
							switch (h) {
								case 1:
									s < 128 && (c = s)
									break
								case 2:
									128 == (192 & (o = t[i + 1])) && (f = ((31 & s) << 6) | (63 & o)) > 127 && (c = f)
									break
								case 3:
									;(o = t[i + 1]),
										(u = t[i + 2]),
										128 == (192 & o) &&
											128 == (192 & u) &&
											(f = ((15 & s) << 12) | ((63 & o) << 6) | (63 & u)) > 2047 &&
											(f < 55296 || f > 57343) &&
											(c = f)
									break
								case 4:
									;(o = t[i + 1]),
										(u = t[i + 2]),
										(a = t[i + 3]),
										128 == (192 & o) &&
											128 == (192 & u) &&
											128 == (192 & a) &&
											(f = ((15 & s) << 18) | ((63 & o) << 12) | ((63 & u) << 6) | (63 & a)) >
												65535 &&
											f < 1114112 &&
											(c = f)
							}
						null === c
							? ((c = 65533), (h = 1))
							: c > 65535 &&
							  ((c -= 65536), r.push(((c >>> 10) & 1023) | 55296), (c = 56320 | (1023 & c))),
							r.push(c),
							(i += h)
					}
					return (function (t) {
						var n = t.length
						if (n <= 4096) return String.fromCharCode.apply(String, t)
						var e = "",
							r = 0
						for (; r < n; ) e += String.fromCharCode.apply(String, t.slice(r, (r += 4096)))
						return e
					})(r)
				}
				;(n.Buffer = f),
					(n.SlowBuffer = function (t) {
						;+t != t && (t = 0)
						return f.alloc(+t)
					}),
					(n.INSPECT_MAX_BYTES = 50),
					(f.TYPED_ARRAY_SUPPORT =
						void 0 !== t.TYPED_ARRAY_SUPPORT
							? t.TYPED_ARRAY_SUPPORT
							: (function () {
									try {
										var t = new Uint8Array(1)
										return (
											(t.__proto__ = {
												__proto__: Uint8Array.prototype,
												foo: function () {
													return 42
												}
											}),
											42 === t.foo() &&
												"function" == typeof t.subarray &&
												0 === t.subarray(1, 1).byteLength
										)
									} catch (t) {
										return !1
									}
							  })()),
					(n.kMaxLength = u()),
					(f.poolSize = 8192),
					(f._augment = function (t) {
						return (t.__proto__ = f.prototype), t
					}),
					(f.from = function (t, n, e) {
						return s(null, t, n, e)
					}),
					f.TYPED_ARRAY_SUPPORT &&
						((f.prototype.__proto__ = Uint8Array.prototype),
						(f.__proto__ = Uint8Array),
						"undefined" != typeof Symbol &&
							Symbol.species &&
							f[Symbol.species] === f &&
							Object.defineProperty(f, Symbol.species, { value: null, configurable: !0 })),
					(f.alloc = function (t, n, e) {
						return (function (t, n, e, r) {
							return (
								c(n),
								n <= 0
									? a(t, n)
									: void 0 !== e
									? "string" == typeof r
										? a(t, n).fill(e, r)
										: a(t, n).fill(e)
									: a(t, n)
							)
						})(null, t, n, e)
					}),
					(f.allocUnsafe = function (t) {
						return h(null, t)
					}),
					(f.allocUnsafeSlow = function (t) {
						return h(null, t)
					}),
					(f.isBuffer = function (t) {
						return !(null == t || !t._isBuffer)
					}),
					(f.compare = function (t, n) {
						if (!f.isBuffer(t) || !f.isBuffer(n)) throw new TypeError("Arguments must be Buffers")
						if (t === n) return 0
						for (var e = t.length, r = n.length, i = 0, o = Math.min(e, r); i < o; ++i)
							if (t[i] !== n[i]) {
								;(e = t[i]), (r = n[i])
								break
							}
						return e < r ? -1 : r < e ? 1 : 0
					}),
					(f.isEncoding = function (t) {
						switch (String(t).toLowerCase()) {
							case "hex":
							case "utf8":
							case "utf-8":
							case "ascii":
							case "latin1":
							case "binary":
							case "base64":
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return !0
							default:
								return !1
						}
					}),
					(f.concat = function (t, n) {
						if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers')
						if (0 === t.length) return f.alloc(0)
						var e
						if (void 0 === n) for (n = 0, e = 0; e < t.length; ++e) n += t[e].length
						var r = f.allocUnsafe(n),
							i = 0
						for (e = 0; e < t.length; ++e) {
							var u = t[e]
							if (!f.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers')
							u.copy(r, i), (i += u.length)
						}
						return r
					}),
					(f.byteLength = p),
					(f.prototype._isBuffer = !0),
					(f.prototype.swap16 = function () {
						var t = this.length
						if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits")
						for (var n = 0; n < t; n += 2) g(this, n, n + 1)
						return this
					}),
					(f.prototype.swap32 = function () {
						var t = this.length
						if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits")
						for (var n = 0; n < t; n += 4) g(this, n, n + 3), g(this, n + 1, n + 2)
						return this
					}),
					(f.prototype.swap64 = function () {
						var t = this.length
						if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits")
						for (var n = 0; n < t; n += 8)
							g(this, n, n + 7), g(this, n + 1, n + 6), g(this, n + 2, n + 5), g(this, n + 3, n + 4)
						return this
					}),
					(f.prototype.toString = function () {
						var t = 0 | this.length
						return 0 === t ? "" : 0 === arguments.length ? C(this, 0, t) : d.apply(this, arguments)
					}),
					(f.prototype.equals = function (t) {
						if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer")
						return this === t || 0 === f.compare(this, t)
					}),
					(f.prototype.inspect = function () {
						var t = "",
							e = n.INSPECT_MAX_BYTES
						return (
							this.length > 0 &&
								((t = this.toString("hex", 0, e).match(/.{2}/g).join(" ")),
								this.length > e && (t += " ... ")),
							"<Buffer " + t + ">"
						)
					}),
					(f.prototype.compare = function (t, n, e, r, i) {
						if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer")
						if (
							(void 0 === n && (n = 0),
							void 0 === e && (e = t ? t.length : 0),
							void 0 === r && (r = 0),
							void 0 === i && (i = this.length),
							n < 0 || e > t.length || r < 0 || i > this.length)
						)
							throw new RangeError("out of range index")
						if (r >= i && n >= e) return 0
						if (r >= i) return -1
						if (n >= e) return 1
						if (this === t) return 0
						for (
							var o = (i >>>= 0) - (r >>>= 0),
								u = (e >>>= 0) - (n >>>= 0),
								a = Math.min(o, u),
								s = this.slice(r, i),
								c = t.slice(n, e),
								h = 0;
							h < a;
							++h
						)
							if (s[h] !== c[h]) {
								;(o = s[h]), (u = c[h])
								break
							}
						return o < u ? -1 : u < o ? 1 : 0
					}),
					(f.prototype.includes = function (t, n, e) {
						return -1 !== this.indexOf(t, n, e)
					}),
					(f.prototype.indexOf = function (t, n, e) {
						return y(this, t, n, e, !0)
					}),
					(f.prototype.lastIndexOf = function (t, n, e) {
						return y(this, t, n, e, !1)
					}),
					(f.prototype.write = function (t, n, e, r) {
						if (void 0 === n) (r = "utf8"), (e = this.length), (n = 0)
						else if (void 0 === e && "string" == typeof n) (r = n), (e = this.length), (n = 0)
						else {
							if (!isFinite(n))
								throw new Error(
									"Buffer.write(string, encoding, offset[, length]) is no longer supported"
								)
							;(n |= 0), isFinite(e) ? ((e |= 0), void 0 === r && (r = "utf8")) : ((r = e), (e = void 0))
						}
						var i = this.length - n
						if (((void 0 === e || e > i) && (e = i), (t.length > 0 && (e < 0 || n < 0)) || n > this.length))
							throw new RangeError("Attempt to write outside buffer bounds")
						r || (r = "utf8")
						for (var o = !1; ; )
							switch (r) {
								case "hex":
									return m(this, t, n, e)
								case "utf8":
								case "utf-8":
									return x(this, t, n, e)
								case "ascii":
									return b(this, t, n, e)
								case "latin1":
								case "binary":
									return A(this, t, n, e)
								case "base64":
									return _(this, t, n, e)
								case "ucs2":
								case "ucs-2":
								case "utf16le":
								case "utf-16le":
									return B(this, t, n, e)
								default:
									if (o) throw new TypeError("Unknown encoding: " + r)
									;(r = ("" + r).toLowerCase()), (o = !0)
							}
					}),
					(f.prototype.toJSON = function () {
						return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) }
					})
				function z(t, n, e) {
					var r = ""
					e = Math.min(t.length, e)
					for (var i = n; i < e; ++i) r += String.fromCharCode(127 & t[i])
					return r
				}
				function L(t, n, e) {
					var r = ""
					e = Math.min(t.length, e)
					for (var i = n; i < e; ++i) r += String.fromCharCode(t[i])
					return r
				}
				function D(t, n, e) {
					var r = t.length
					;(!n || n < 0) && (n = 0), (!e || e < 0 || e > r) && (e = r)
					for (var i = "", o = n; o < e; ++o) i += j(t[o])
					return i
				}
				function S(t, n, e) {
					for (var r = t.slice(n, e), i = "", o = 0; o < r.length; o += 2)
						i += String.fromCharCode(r[o] + 256 * r[o + 1])
					return i
				}
				function P(t, n, e) {
					if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint")
					if (t + n > e) throw new RangeError("Trying to access beyond buffer length")
				}
				function M(t, n, e, r, i, o) {
					if (!f.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance')
					if (n > i || n < o) throw new RangeError('"value" argument is out of bounds')
					if (e + r > t.length) throw new RangeError("Index out of range")
				}
				function T(t, n, e, r) {
					n < 0 && (n = 65535 + n + 1)
					for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i)
						t[e + i] = (n & (255 << (8 * (r ? i : 1 - i)))) >>> (8 * (r ? i : 1 - i))
				}
				function R(t, n, e, r) {
					n < 0 && (n = 4294967295 + n + 1)
					for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i)
						t[e + i] = (n >>> (8 * (r ? i : 3 - i))) & 255
				}
				function U(t, n, e, r, i, o) {
					if (e + r > t.length) throw new RangeError("Index out of range")
					if (e < 0) throw new RangeError("Index out of range")
				}
				function I(t, n, e, r, o) {
					return o || U(t, 0, e, 4), i.write(t, n, e, r, 23, 4), e + 4
				}
				function q(t, n, e, r, o) {
					return o || U(t, 0, e, 8), i.write(t, n, e, r, 52, 8), e + 8
				}
				;(f.prototype.slice = function (t, n) {
					var e,
						r = this.length
					if (
						((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
						(n = void 0 === n ? r : ~~n) < 0 ? (n += r) < 0 && (n = 0) : n > r && (n = r),
						n < t && (n = t),
						f.TYPED_ARRAY_SUPPORT)
					)
						(e = this.subarray(t, n)).__proto__ = f.prototype
					else {
						var i = n - t
						e = new f(i, void 0)
						for (var o = 0; o < i; ++o) e[o] = this[o + t]
					}
					return e
				}),
					(f.prototype.readUIntLE = function (t, n, e) {
						;(t |= 0), (n |= 0), e || P(t, n, this.length)
						for (var r = this[t], i = 1, o = 0; ++o < n && (i *= 256); ) r += this[t + o] * i
						return r
					}),
					(f.prototype.readUIntBE = function (t, n, e) {
						;(t |= 0), (n |= 0), e || P(t, n, this.length)
						for (var r = this[t + --n], i = 1; n > 0 && (i *= 256); ) r += this[t + --n] * i
						return r
					}),
					(f.prototype.readUInt8 = function (t, n) {
						return n || P(t, 1, this.length), this[t]
					}),
					(f.prototype.readUInt16LE = function (t, n) {
						return n || P(t, 2, this.length), this[t] | (this[t + 1] << 8)
					}),
					(f.prototype.readUInt16BE = function (t, n) {
						return n || P(t, 2, this.length), (this[t] << 8) | this[t + 1]
					}),
					(f.prototype.readUInt32LE = function (t, n) {
						return (
							n || P(t, 4, this.length),
							(this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
						)
					}),
					(f.prototype.readUInt32BE = function (t, n) {
						return (
							n || P(t, 4, this.length),
							16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
						)
					}),
					(f.prototype.readIntLE = function (t, n, e) {
						;(t |= 0), (n |= 0), e || P(t, n, this.length)
						for (var r = this[t], i = 1, o = 0; ++o < n && (i *= 256); ) r += this[t + o] * i
						return r >= (i *= 128) && (r -= Math.pow(2, 8 * n)), r
					}),
					(f.prototype.readIntBE = function (t, n, e) {
						;(t |= 0), (n |= 0), e || P(t, n, this.length)
						for (var r = n, i = 1, o = this[t + --r]; r > 0 && (i *= 256); ) o += this[t + --r] * i
						return o >= (i *= 128) && (o -= Math.pow(2, 8 * n)), o
					}),
					(f.prototype.readInt8 = function (t, n) {
						return n || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
					}),
					(f.prototype.readInt16LE = function (t, n) {
						n || P(t, 2, this.length)
						var e = this[t] | (this[t + 1] << 8)
						return 32768 & e ? 4294901760 | e : e
					}),
					(f.prototype.readInt16BE = function (t, n) {
						n || P(t, 2, this.length)
						var e = this[t + 1] | (this[t] << 8)
						return 32768 & e ? 4294901760 | e : e
					}),
					(f.prototype.readInt32LE = function (t, n) {
						return (
							n || P(t, 4, this.length),
							this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
						)
					}),
					(f.prototype.readInt32BE = function (t, n) {
						return (
							n || P(t, 4, this.length),
							(this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
						)
					}),
					(f.prototype.readFloatLE = function (t, n) {
						return n || P(t, 4, this.length), i.read(this, t, !0, 23, 4)
					}),
					(f.prototype.readFloatBE = function (t, n) {
						return n || P(t, 4, this.length), i.read(this, t, !1, 23, 4)
					}),
					(f.prototype.readDoubleLE = function (t, n) {
						return n || P(t, 8, this.length), i.read(this, t, !0, 52, 8)
					}),
					(f.prototype.readDoubleBE = function (t, n) {
						return n || P(t, 8, this.length), i.read(this, t, !1, 52, 8)
					}),
					(f.prototype.writeUIntLE = function (t, n, e, r) {
						;((t = +t), (n |= 0), (e |= 0), r) || M(this, t, n, e, Math.pow(2, 8 * e) - 1, 0)
						var i = 1,
							o = 0
						for (this[n] = 255 & t; ++o < e && (i *= 256); ) this[n + o] = (t / i) & 255
						return n + e
					}),
					(f.prototype.writeUIntBE = function (t, n, e, r) {
						;((t = +t), (n |= 0), (e |= 0), r) || M(this, t, n, e, Math.pow(2, 8 * e) - 1, 0)
						var i = e - 1,
							o = 1
						for (this[n + i] = 255 & t; --i >= 0 && (o *= 256); ) this[n + i] = (t / o) & 255
						return n + e
					}),
					(f.prototype.writeUInt8 = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 1, 255, 0),
							f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
							(this[n] = 255 & t),
							n + 1
						)
					}),
					(f.prototype.writeUInt16LE = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 2, 65535, 0),
							f.TYPED_ARRAY_SUPPORT ? ((this[n] = 255 & t), (this[n + 1] = t >>> 8)) : T(this, t, n, !0),
							n + 2
						)
					}),
					(f.prototype.writeUInt16BE = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 2, 65535, 0),
							f.TYPED_ARRAY_SUPPORT ? ((this[n] = t >>> 8), (this[n + 1] = 255 & t)) : T(this, t, n, !1),
							n + 2
						)
					}),
					(f.prototype.writeUInt32LE = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 4, 4294967295, 0),
							f.TYPED_ARRAY_SUPPORT
								? ((this[n + 3] = t >>> 24),
								  (this[n + 2] = t >>> 16),
								  (this[n + 1] = t >>> 8),
								  (this[n] = 255 & t))
								: R(this, t, n, !0),
							n + 4
						)
					}),
					(f.prototype.writeUInt32BE = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 4, 4294967295, 0),
							f.TYPED_ARRAY_SUPPORT
								? ((this[n] = t >>> 24),
								  (this[n + 1] = t >>> 16),
								  (this[n + 2] = t >>> 8),
								  (this[n + 3] = 255 & t))
								: R(this, t, n, !1),
							n + 4
						)
					}),
					(f.prototype.writeIntLE = function (t, n, e, r) {
						if (((t = +t), (n |= 0), !r)) {
							var i = Math.pow(2, 8 * e - 1)
							M(this, t, n, e, i - 1, -i)
						}
						var o = 0,
							u = 1,
							a = 0
						for (this[n] = 255 & t; ++o < e && (u *= 256); )
							t < 0 && 0 === a && 0 !== this[n + o - 1] && (a = 1),
								(this[n + o] = (((t / u) >> 0) - a) & 255)
						return n + e
					}),
					(f.prototype.writeIntBE = function (t, n, e, r) {
						if (((t = +t), (n |= 0), !r)) {
							var i = Math.pow(2, 8 * e - 1)
							M(this, t, n, e, i - 1, -i)
						}
						var o = e - 1,
							u = 1,
							a = 0
						for (this[n + o] = 255 & t; --o >= 0 && (u *= 256); )
							t < 0 && 0 === a && 0 !== this[n + o + 1] && (a = 1),
								(this[n + o] = (((t / u) >> 0) - a) & 255)
						return n + e
					}),
					(f.prototype.writeInt8 = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 1, 127, -128),
							f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
							t < 0 && (t = 255 + t + 1),
							(this[n] = 255 & t),
							n + 1
						)
					}),
					(f.prototype.writeInt16LE = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 2, 32767, -32768),
							f.TYPED_ARRAY_SUPPORT ? ((this[n] = 255 & t), (this[n + 1] = t >>> 8)) : T(this, t, n, !0),
							n + 2
						)
					}),
					(f.prototype.writeInt16BE = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 2, 32767, -32768),
							f.TYPED_ARRAY_SUPPORT ? ((this[n] = t >>> 8), (this[n + 1] = 255 & t)) : T(this, t, n, !1),
							n + 2
						)
					}),
					(f.prototype.writeInt32LE = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 4, 2147483647, -2147483648),
							f.TYPED_ARRAY_SUPPORT
								? ((this[n] = 255 & t),
								  (this[n + 1] = t >>> 8),
								  (this[n + 2] = t >>> 16),
								  (this[n + 3] = t >>> 24))
								: R(this, t, n, !0),
							n + 4
						)
					}),
					(f.prototype.writeInt32BE = function (t, n, e) {
						return (
							(t = +t),
							(n |= 0),
							e || M(this, t, n, 4, 2147483647, -2147483648),
							t < 0 && (t = 4294967295 + t + 1),
							f.TYPED_ARRAY_SUPPORT
								? ((this[n] = t >>> 24),
								  (this[n + 1] = t >>> 16),
								  (this[n + 2] = t >>> 8),
								  (this[n + 3] = 255 & t))
								: R(this, t, n, !1),
							n + 4
						)
					}),
					(f.prototype.writeFloatLE = function (t, n, e) {
						return I(this, t, n, !0, e)
					}),
					(f.prototype.writeFloatBE = function (t, n, e) {
						return I(this, t, n, !1, e)
					}),
					(f.prototype.writeDoubleLE = function (t, n, e) {
						return q(this, t, n, !0, e)
					}),
					(f.prototype.writeDoubleBE = function (t, n, e) {
						return q(this, t, n, !1, e)
					}),
					(f.prototype.copy = function (t, n, e, r) {
						if (
							(e || (e = 0),
							r || 0 === r || (r = this.length),
							n >= t.length && (n = t.length),
							n || (n = 0),
							r > 0 && r < e && (r = e),
							r === e)
						)
							return 0
						if (0 === t.length || 0 === this.length) return 0
						if (n < 0) throw new RangeError("targetStart out of bounds")
						if (e < 0 || e >= this.length) throw new RangeError("sourceStart out of bounds")
						if (r < 0) throw new RangeError("sourceEnd out of bounds")
						r > this.length && (r = this.length), t.length - n < r - e && (r = t.length - n + e)
						var i,
							o = r - e
						if (this === t && e < n && n < r) for (i = o - 1; i >= 0; --i) t[i + n] = this[i + e]
						else if (o < 1e3 || !f.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) t[i + n] = this[i + e]
						else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), n)
						return o
					}),
					(f.prototype.fill = function (t, n, e, r) {
						if ("string" == typeof t) {
							if (
								("string" == typeof n
									? ((r = n), (n = 0), (e = this.length))
									: "string" == typeof e && ((r = e), (e = this.length)),
								1 === t.length)
							) {
								var i = t.charCodeAt(0)
								i < 256 && (t = i)
							}
							if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string")
							if ("string" == typeof r && !f.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
						} else "number" == typeof t && (t &= 255)
						if (n < 0 || this.length < n || this.length < e) throw new RangeError("Out of range index")
						if (e <= n) return this
						var o
						if (
							((n >>>= 0), (e = void 0 === e ? this.length : e >>> 0), t || (t = 0), "number" == typeof t)
						)
							for (o = n; o < e; ++o) this[o] = t
						else {
							var u = f.isBuffer(t) ? t : Y(new f(t, r).toString()),
								a = u.length
							for (o = 0; o < e - n; ++o) this[o + n] = u[o % a]
						}
						return this
					})
				var O = /[^+\/0-9A-Za-z-_]/g
				function j(t) {
					return t < 16 ? "0" + t.toString(16) : t.toString(16)
				}
				function Y(t, n) {
					var e
					n = n || 1 / 0
					for (var r = t.length, i = null, o = [], u = 0; u < r; ++u) {
						if ((e = t.charCodeAt(u)) > 55295 && e < 57344) {
							if (!i) {
								if (e > 56319) {
									;(n -= 3) > -1 && o.push(239, 191, 189)
									continue
								}
								if (u + 1 === r) {
									;(n -= 3) > -1 && o.push(239, 191, 189)
									continue
								}
								i = e
								continue
							}
							if (e < 56320) {
								;(n -= 3) > -1 && o.push(239, 191, 189), (i = e)
								continue
							}
							e = 65536 + (((i - 55296) << 10) | (e - 56320))
						} else i && (n -= 3) > -1 && o.push(239, 191, 189)
						if (((i = null), e < 128)) {
							if ((n -= 1) < 0) break
							o.push(e)
						} else if (e < 2048) {
							if ((n -= 2) < 0) break
							o.push((e >> 6) | 192, (63 & e) | 128)
						} else if (e < 65536) {
							if ((n -= 3) < 0) break
							o.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (63 & e) | 128)
						} else {
							if (!(e < 1114112)) throw new Error("Invalid code point")
							if ((n -= 4) < 0) break
							o.push((e >> 18) | 240, ((e >> 12) & 63) | 128, ((e >> 6) & 63) | 128, (63 & e) | 128)
						}
					}
					return o
				}
				function k(t) {
					return r.toByteArray(
						(function (t) {
							if (
								(t = (function (t) {
									return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
								})(t).replace(O, "")).length < 2
							)
								return ""
							for (; t.length % 4 != 0; ) t += "="
							return t
						})(t)
					)
				}
				function N(t, n, e, r) {
					for (var i = 0; i < r && !(i + e >= n.length || i >= t.length); ++i) n[i + e] = t[i]
					return i
				}
			}).call(this, e(9))
		},
		function (t, n) {
			var e
			e = (function () {
				return this
			})()
			try {
				e = e || new Function("return this")()
			} catch (t) {
				"object" == typeof window && (e = window)
			}
			t.exports = e
		},
		function (t, n, e) {
			"use strict"
			;(n.byteLength = function (t) {
				var n = s(t),
					e = n[0],
					r = n[1]
				return (3 * (e + r)) / 4 - r
			}),
				(n.toByteArray = function (t) {
					var n,
						e,
						r = s(t),
						u = r[0],
						a = r[1],
						f = new o(
							(function (t, n, e) {
								return (3 * (n + e)) / 4 - e
							})(0, u, a)
						),
						c = 0,
						h = a > 0 ? u - 4 : u
					for (e = 0; e < h; e += 4)
						(n =
							(i[t.charCodeAt(e)] << 18) |
							(i[t.charCodeAt(e + 1)] << 12) |
							(i[t.charCodeAt(e + 2)] << 6) |
							i[t.charCodeAt(e + 3)]),
							(f[c++] = (n >> 16) & 255),
							(f[c++] = (n >> 8) & 255),
							(f[c++] = 255 & n)
					2 === a && ((n = (i[t.charCodeAt(e)] << 2) | (i[t.charCodeAt(e + 1)] >> 4)), (f[c++] = 255 & n))
					1 === a &&
						((n =
							(i[t.charCodeAt(e)] << 10) | (i[t.charCodeAt(e + 1)] << 4) | (i[t.charCodeAt(e + 2)] >> 2)),
						(f[c++] = (n >> 8) & 255),
						(f[c++] = 255 & n))
					return f
				}),
				(n.fromByteArray = function (t) {
					for (var n, e = t.length, i = e % 3, o = [], u = 0, a = e - i; u < a; u += 16383)
						o.push(c(t, u, u + 16383 > a ? a : u + 16383))
					1 === i
						? ((n = t[e - 1]), o.push(r[n >> 2] + r[(n << 4) & 63] + "=="))
						: 2 === i &&
						  ((n = (t[e - 2] << 8) + t[e - 1]),
						  o.push(r[n >> 10] + r[(n >> 4) & 63] + r[(n << 2) & 63] + "="))
					return o.join("")
				})
			for (
				var r = [],
					i = [],
					o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
					u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
					a = 0,
					f = u.length;
				a < f;
				++a
			)
				(r[a] = u[a]), (i[u.charCodeAt(a)] = a)
			function s(t) {
				var n = t.length
				if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4")
				var e = t.indexOf("=")
				return -1 === e && (e = n), [e, e === n ? 0 : 4 - (e % 4)]
			}
			function c(t, n, e) {
				for (var i, o, u = [], a = n; a < e; a += 3)
					(i = ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (255 & t[a + 2])),
						u.push(r[((o = i) >> 18) & 63] + r[(o >> 12) & 63] + r[(o >> 6) & 63] + r[63 & o])
				return u.join("")
			}
			;(i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63)
		},
		function (t, n) {
			;(n.read = function (t, n, e, r, i) {
				var o,
					u,
					a = 8 * i - r - 1,
					f = (1 << a) - 1,
					s = f >> 1,
					c = -7,
					h = e ? i - 1 : 0,
					v = e ? -1 : 1,
					l = t[n + h]
				for (h += v, o = l & ((1 << -c) - 1), l >>= -c, c += a; c > 0; o = 256 * o + t[n + h], h += v, c -= 8);
				for (u = o & ((1 << -c) - 1), o >>= -c, c += r; c > 0; u = 256 * u + t[n + h], h += v, c -= 8);
				if (0 === o) o = 1 - s
				else {
					if (o === f) return u ? NaN : (1 / 0) * (l ? -1 : 1)
					;(u += Math.pow(2, r)), (o -= s)
				}
				return (l ? -1 : 1) * u * Math.pow(2, o - r)
			}),
				(n.write = function (t, n, e, r, i, o) {
					var u,
						a,
						f,
						s = 8 * o - i - 1,
						c = (1 << s) - 1,
						h = c >> 1,
						v = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
						l = r ? 0 : o - 1,
						p = r ? 1 : -1,
						d = n < 0 || (0 === n && 1 / n < 0) ? 1 : 0
					for (
						n = Math.abs(n),
							isNaN(n) || n === 1 / 0
								? ((a = isNaN(n) ? 1 : 0), (u = c))
								: ((u = Math.floor(Math.log(n) / Math.LN2)),
								  n * (f = Math.pow(2, -u)) < 1 && (u--, (f *= 2)),
								  (n += u + h >= 1 ? v / f : v * Math.pow(2, 1 - h)) * f >= 2 && (u++, (f /= 2)),
								  u + h >= c
										? ((a = 0), (u = c))
										: u + h >= 1
										? ((a = (n * f - 1) * Math.pow(2, i)), (u += h))
										: ((a = n * Math.pow(2, h - 1) * Math.pow(2, i)), (u = 0)));
						i >= 8;
						t[e + l] = 255 & a, l += p, a /= 256, i -= 8
					);
					for (u = (u << i) | a, s += i; s > 0; t[e + l] = 255 & u, l += p, u /= 256, s -= 8);
					t[e + l - p] |= 128 * d
				})
		},
		function (t, n) {
			var e = {}.toString
			t.exports =
				Array.isArray ||
				function (t) {
					return "[object Array]" == e.call(t)
				}
		},
		function (t, n, e) {
			"use strict"
			Object.defineProperty(n, "__esModule", { value: !0 })
			var r = !0,
				i = function () {
					return {
						development: "https://login.yuuki.me/common/badge/v1",
						test: "https://login.yuuki.me/common/badge/v1",
						prerelease: "https://login.yuuki.me/common/badge/v1",
						production: "https://login.yuuki.me/common/badge/v1"
					}
				},
				o = (n.getParamByName = function (t) {
					var n = t.replace(/[\[\]]/g, "\\$&"),
						e = new RegExp("[?&]" + n + "(=([^&#]*)|&|#|$)"),
						r = window.location.search,
						i = e.exec(r)
					if (i) return i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : ""
				}),
				u = function () {
					return "true" === o("mia_preload_track_stash")
				},
				a = function (t) {
					t.bbsApp.onWebViewWillAppear(function () {
						console.log("mihoyo-analysis: onWebViewWillAppear"), t.popStash()
					}),
						t.bbsApp.getIsAppearing().then(function (n) {
							n || (console.log("mihoyo-analysis: getIsAppearing"), t.startStash())
						})
				}
			;(n.initInstance = function (t) {
				var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
					o = n.Vue,
					f = n.dataBelong,
					s = void 0 === f ? [] : f,
					c = n.appId,
					h = n.router,
					v = n.needUid,
					l = n.env,
					p = n.isSea,
					d = void 0 !== p && p,
					g = n.debug,
					y = void 0 !== g && g,
					w = n.pagename,
					m = n.device_id,
					x = void 0 === m ? "" : m,
					b = n.pageExtrainfo,
					A = n.userExtrainfo,
					_ = n.eventExtrainfo,
					B = n.type,
					E = void 0 === B ? "tool" : B,
					C = n.autoTrackPageview,
					z = void 0 === C || C,
					L = n.setMiaToVue,
					D = void 0 === L || L,
					S = n.needSessionInfo,
					P = void 0 !== S && S,
					M = n.sessionInfoExpires,
					T = void 0 === M ? 1 / 48 : M,
					R = n.host,
					U = void 0 === R ? "" : R,
					I = n.useBeacon,
					q = void 0 !== I && I,
					O = o || window.Vue
				if (!window.MIHOYO_ANALYSIS_LOGINEFFECT && navigator && navigator.userAgent.includes("miHoYoBBS/")) {
					;(window.MIHOYO_ANALYSIS_LOGINEFFECT = !0), e(14)
					var j = { test: "https://login.yuuki.me/", production: "https://login.yuuki.me/" },
						Y = i(),
						k = function () {
							var n = new XMLHttpRequest()
							n.withCredentials = !0
							var e = j.production
							;["development", "test", "sandbox"].includes(l || t.environment) && (e = j.test),
								window.location.host.indexOf("mimelon.com") >= 0 &&
									(e = e.replace("misuck.com", "mimelon.com")),
								(n.onreadystatechange = function () {
									4 === n.readyState &&
										200 === n.status &&
										0 !== JSON.parse(n.responseText).retcode &&
										O.prototype.$bbsApp.getCookieToken(!0).then(function () {
											O.prototype.$bbsApp.toLogin()
										})
								}),
								n.open("GET", e + "auth/api/getUserAccountInfoByCookieToken", !0),
								n.send()
						}
					window.addEventListener("ajaxReadyStateChange", function (t) {
						try {
							var n = t.detail
							if (
								Object.values(Y).some(function (t) {
									return n.responseURL.indexOf(t) >= 0
								})
							)
								return
							if (4 === n.readyState && 200 === n.status) {
								var e = JSON.parse(n.responseText)
								if (!O) {
									if (!window.Vue) return
									O = window.Vue
								}
								;[-100, 10001].includes(e.retcode) &&
									O.prototype.$bbsApp &&
									O.prototype.$bbsApp.getCookieInfo().then(function (t) {
										var n = t.data
										n && n.ltoken && k()
									})
							}
						} catch (t) {
							console.log(t)
						}
					})
				}
				if (!c) throw (console.error("请传入appId"), new Error("请传入appId"))
				if (!Array.isArray(s))
					throw (
						(console.error("dataBelong的类型为数组"),
						(t.data_belong = ""),
						new Error("dataBelong的类型为数组"))
					)
				return (
					(t.data_belong = s.join(",")),
					l && t.apis[l] && (t.environment = l),
					(d || t.isHostSea) && "production" === t.environment && (t.environment = "production.sea"),
					y && (t.environment = "test"),
					(d || t.isHostSea) && "test" === t.environment && (t.environment = "test.sea"),
					O && D && (O.prototype.$mia = t),
					(t.app_id = "" + c),
					(t.needUid = v || !1),
					(t.pagename = w),
					(t.pageExtrainfo = b),
					(t.userExtrainfo = A),
					(t.eventExtrainfo = _),
					(t.type = E),
					(t.device_id = x),
					(t.needSessionInfo = P),
					(t.sessionInfoExpires = T),
					(t.host = U),
					(t.bbsApp = O && O.prototype.$bbsApp),
					(t.useBeacon = q && navigator && navigator.sendBeacon && "function" == typeof navigator.sendBeacon),
					u() && t.bbsApp && t.bbsApp.getIsAppearing && r && ((r = !1), a(t)),
					z &&
						(O
							? h &&
							  h.afterEach(function (n) {
									var e = n || {},
										r = (e.meta || {}).miaPagename
									;(t.pageurl = e.path), (t.pagename = r || e.name || e.path), t.trackPageview()
							  })
							: t.trackPageview()),
					t
				)
			}),
				(n.randomId = function () {
					var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
						n = [],
						e = Math.random,
						r = void 0
					;(n[8] = n[13] = n[18] = n[23] = n[28] = n[33] = n[38] = n[43] = n[48] = n[53] = n[58] = "-"),
						(n[14] = "4")
					for (var i = 0; i < 64; i++)
						n[i] || ((r = 0 | (16 * e())), (n[i] = t[19 === i ? (3 & r) | 8 : 15 & r]))
					return n.join("").toLowerCase()
				})
		},
		function (t, n, e) {
			"use strict"
			!(function () {
				if ("function" == typeof window.CustomEvent) return !1
				function t(t, n) {
					n = n || { bubbles: !1, cancelable: !1, detail: void 0 }
					var e = document.createEvent("CustomEvent")
					return e.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), e
				}
				;(t.prototype = window.Event.prototype), (window.CustomEvent = t)
			})(),
				(function () {
					function t(t) {
						var n = new CustomEvent(t, { detail: this })
						window.dispatchEvent(n)
					}
					var n = window.XMLHttpRequest
					window.XMLHttpRequest = function () {
						var e = new n()
						e.addEventListener(
							"abort",
							function () {
								t.call(this, "ajaxAbort")
							},
							!1
						),
							e.addEventListener(
								"error",
								function () {
									t.call(this, "ajaxError")
								},
								!1
							),
							e.addEventListener(
								"load",
								function () {
									t.call(this, "ajaxLoad")
								},
								!1
							),
							e.addEventListener(
								"loadstart",
								function () {
									t.call(this, "ajaxLoadStart")
								},
								!1
							),
							e.addEventListener(
								"progress",
								function () {
									t.call(this, "ajaxProgress")
								},
								!1
							),
							e.addEventListener(
								"timeout",
								function () {
									t.call(this, "ajaxTimeout")
								},
								!1
							),
							e.addEventListener(
								"loadend",
								function () {
									t.call(this, "ajaxLoadEnd")
								},
								!1
							),
							e.addEventListener(
								"readystatechange",
								function () {
									t.call(this, "ajaxReadyStateChange")
								},
								!1
							)
						var r = e.send
						e.send = function () {
							for (var n = arguments.length, i = Array(n), o = 0; o < n; o++) i[o] = arguments[o]
							r.apply(e, i), (e.body = i[0]), t.call(e, "ajaxSend")
						}
						var i = e.open
						e.open = function () {
							for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o]
							i.apply(e, r),
								(e.method = r[0]),
								(e.orignUrl = r[1]),
								(e.async = r[2]),
								t.call(e, "ajaxOpen")
						}
						var o = e.setRequestHeader
						return (
							(e.requestHeader = {}),
							(e.setRequestHeader = function (t, n) {
								;(e.requestHeader[t] = n), o.call(e, t, n)
							}),
							e
						)
					}
				})()
		}
	]).default
})
