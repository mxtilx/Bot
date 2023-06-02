/**
 * ! Copyright © YuukiPS. All Rights Reserved
 *
 * @format
 */

!(function (e) {
	function t(t) {
		for (var n, o, i = t[0], c = t[1], s = t[2], l = 0, d = []; l < i.length; l++)
			(o = i[l]), Object.prototype.hasOwnProperty.call(u, o) && u[o] && d.push(u[o][0]), (u[o] = 0)
		for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n])
		for (f && f(t); d.length; ) d.shift()()
		return a.push.apply(a, s || []), r()
	}
	function r() {
		for (var e, t = 0; t < a.length; t++) {
			for (var r = a[t], n = !0, o = 1; o < r.length; o++) {
				var c = r[o]
				0 !== u[c] && (n = !1)
			}
			n && (a.splice(t--, 1), (e = i((i.s = r[0]))))
		}
		return e
	}
	var n = {},
		o = { 1: 0 },
		u = { 1: 0 },
		a = []
	function i(t) {
		if (n[t]) return n[t].exports
		var r = (n[t] = { i: t, l: !1, exports: {} })
		return e[t].call(r.exports, r, r.exports, i), (r.l = !0), r.exports
	}
	;(i.e = function (e) {
		var t = []
		o[e]
			? t.push(o[e])
			: 0 !== o[e] &&
			  { 2: 1 }[e] &&
			  t.push(
					(o[e] = new Promise(function (t, r) {
						for (
							var n = "/css/announcement/2_464367c990d44af50195.css",
								u = i.p + n,
								a = document.getElementsByTagName("link"),
								c = 0;
							c < a.length;
							c++
						) {
							var s = (f = a[c]).getAttribute("data-href") || f.getAttribute("href")
							if ("stylesheet" === f.rel && (s === n || s === u)) return t()
						}
						var l = document.getElementsByTagName("style")
						for (c = 0; c < l.length; c++) {
							var f
							if ((s = (f = l[c]).getAttribute("data-href")) === n || s === u) return t()
						}
						var d = document.createElement("link")
						;(d.rel = "stylesheet"),
							(d.type = "text/css"),
							(d.onload = t),
							(d.onerror = function (t) {
								var n = (t && t.target && t.target.src) || u,
									a = new Error("Loading CSS chunk " + e + " failed.\n(" + n + ")")
								;(a.request = n), delete o[e], d.parentNode.removeChild(d), r(a)
							}),
							(d.href = u),
							document.getElementsByTagName("head")[0].appendChild(d)
					}).then(function () {
						o[e] = 0
					}))
			  )
		var r = u[e]
		if (0 !== r)
			if (r) t.push(r[2])
			else {
				var n = new Promise(function (t, n) {
					r = u[e] = [t, n]
				})
				t.push((r[2] = n))
				var a,
					c = document.createElement("script")
				;(c.charset = "utf-8"),
					(c.timeout = 120),
					i.nc && c.setAttribute("nonce", i.nc),
					(c.src = "/js/announcement/2_a274bfa23244ff3058d3.js")
				var s = new Error()
				a = function (t) {
					;(c.onerror = c.onload = null), clearTimeout(l)
					var r = u[e]
					if (0 !== r) {
						if (r) {
							var n = t && ("load" === t.type ? "missing" : t.type),
								o = t && t.target && t.target.src
							;(s.message = "Loading chunk " + e + " failed.\n(" + n + ": " + o + ")"),
								(s.name = "ChunkLoadError"),
								(s.type = n),
								(s.request = o),
								r[1](s)
						}
						u[e] = void 0
					}
				}
				var l = setTimeout(function () {
					a({ type: "timeout", target: c })
				}, 12e4)
				;(c.onerror = c.onload = a), document.head.appendChild(c)
			}
		return Promise.all(t)
	}),
		(i.m = e),
		(i.c = n),
		(i.d = function (e, t, r) {
			i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
		}),
		(i.r = function (e) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(e, "__esModule", { value: !0 })
		}),
		(i.t = function (e, t) {
			if ((1 & t && (e = i(e)), 8 & t)) return e
			if (4 & t && "object" == typeof e && e && e.__esModule) return e
			var r = Object.create(null)
			if (
				(i.r(r),
				Object.defineProperty(r, "default", { enumerable: !0, value: e }),
				2 & t && "string" != typeof e)
			)
				for (var n in e)
					i.d(
						r,
						n,
						function (t) {
							return e[t]
						}.bind(null, n)
					)
			return r
		}),
		(i.n = function (e) {
			var t =
				e && e.__esModule
					? function () {
							return e.default
					  }
					: function () {
							return e
					  }
			return i.d(t, "a", t), t
		}),
		(i.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}),
		(i.p = ""),
		(i.oe = function (e) {
			throw (console.error(e), e)
		})
	var c = (window.webpackJsonp = window.webpackJsonp || []),
		s = c.push.bind(c)
	;(c.push = t), (c = c.slice())
	for (var l = 0; l < c.length; l++) t(c[l])
	var f = s
	a.push([190, 0]), r()
})({
	111: function (e) {
		e.exports = JSON.parse('{"router":"./lib/router/index.js"}')
	},
	112: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 })
		var n = r(113)
		t.default = {
			log: function () {
				var e
				;(e = console)[n.Log].apply(e, arguments)
			},
			info: function () {
				var e
				;(e = console)[n.Info].apply(e, arguments)
			},
			warn: function () {
				var e
				;(e = console)[n.Warn].apply(e, arguments)
			},
			error: function () {
				var e
				;(e = console)[n.Error].apply(e, arguments)
			}
		}
	},
	113: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 })
		;(t.Log = "log"), (t.Info = "info"), (t.Warn = "warn"), (t.Error = "error")
	},
	114: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 })
		var n = s(r(394)),
			o = s(r(460)),
			u =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t]
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
					}
					return e
				},
			a = s(r(471)),
			i = r(490),
			c = s(r(491))
		function s(e) {
			return e && e.__esModule ? e : { default: e }
		}
		function l(e, t, r) {
			var n = this,
				a = i.dealConfigsBeforeRequest ? i.dealConfigsBeforeRequest.bind(this)(e) : e,
				c = a.url,
				s = a.data,
				l = a.query,
				f = a.onSuccess,
				d = void 0 === f ? function () {} : f,
				p = a.onError,
				v = void 0 === p ? function () {} : p,
				m = (function (e, t) {
					var r = {}
					for (var n in e) t.indexOf(n) >= 0 || (Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]))
					return r
				})(a, ["url", "data", "query", "onSuccess", "onError"]),
				h = [s, u({ params: l }, m)]
			return (
				"get" === r ? (h = [u({ params: s }, m)]) : "delete" === r && (h = [u({ params: l, data: s }, m)]),
				t[r]
					.apply(
						t,
						[c].concat(
							(function (e) {
								if (Array.isArray(e)) {
									for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t]
									return r
								}
								return Array.from(e)
							})(h)
						)
					)
					.then(
						function (t) {
							return i.requestComplete.bind(n)(t, e) ? null : (d.bind(n)((0, o.default)(t, "data")), t)
						},
						function (t) {
							var r = (0, o.default)(t, "response")
							return i.requestComplete.bind(n)(r, e, t) ? null : (v.bind(n)(r), Promise.reject(t))
						}
					)
			)
		}
		function f(e) {
			var t = this
			return {
				get: function (r) {
					return l.bind(t)(r, e, "get")
				},
				post: function (r) {
					return l.bind(t)(r, e, "post")
				},
				put: function (r) {
					return l.bind(t)(r, e, "put")
				},
				delete: function (r) {
					return l.bind(t)(r, e, "delete")
				}
			}
		}
		t.default = function (e) {
			var t = e
			;(0, n.default)(a.default.defaults, c.default),
				Object.defineProperty(t.prototype, "$http", {
					get: function () {
						return f.bind(this)(a.default)
					}
				})
		}
	},
	122: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.setLocalStorageCache = function (e, t) {
				var r = window.localStorage,
					n = JSON.stringify({ timestamp: new Date().getTime(), value: t })
				r.setItem(e, n)
			}),
			(t.getLocalStorageCache = function (e) {
				var t = window.localStorage.getItem(e)
				if (null == t) return null
				return JSON.parse(t).value
			}),
			(t.removeLocalStorageCache = function (e) {
				window.localStorage.removeItem(e)
			}),
			(t.getLocalStorageInfo = function (e) {
				var t = window.localStorage.getItem(e)
				if (void 0 === t) return
				return JSON.parse(t)
			})
		var n
		t.memoryCache =
			((n = {}),
			{
				set: function (e, t) {
					n[e] = { timestamp: Date.now(), value: t }
				},
				get: function (e) {
					return n[e] ? n[e].value : null
				},
				remove: function (e) {
					void 0 !== e && delete n[e]
				},
				getInfo: function (e) {
					return n[e]
				}
			})
	},
	126: function (e, t, r) {
		"use strict"
		r.d(t, "a", function () {
			return n
		}),
			r.d(t, "b", function () {
				return o
			})
		var n = function () {
				var e = this.$createElement
				return (this._self._c || e)("router-view")
			},
			o = []
		n._withStripped = !0
	},
	183: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.default = function (e, t, r) {
				if ("number" != typeof e) return e
				switch (t) {
					case "split":
						return (function (e) {
							var t = [],
								r = e,
								n = ""
							for (; r > 1e3; ) t.push(r % 1e3), (r = Math.floor(r / 1e3))
							t.push(r)
							for (; t.length > 0; ) n += t.pop() + ","
							return n.substr(0, n.length - 1)
						})(e)
					case "byte":
						return (function (e) {
							var t = 0
							if (e >= 1e3 && e < 1e6)
								return { value: (t = parseFloat(e / 1024)), unit: "KB", text: t + "KB" }
							if (e >= 1e6 && e < 1e9)
								return { value: (t = parseFloat(e / 1048576)), unit: "MB", text: t + "MB" }
							if (e >= 1e9) return { value: (t = parseFloat(e / 1073741824)), unit: "GB", text: t + "GB" }
							return { value: e, unit: "B", text: e + "B" }
						})(e)
					case "percent":
						return (function (e, t) {
							var r = Math.round(100 * e)
							"fill" === t && r < 10 && (r = "0" + r)
							return r + "%"
						})(e, r)
					case "time":
						return (function (e) {
							var t = e / 1e3 / 60 / 60,
								r = Math.floor(t),
								n = 60 * (t - r),
								o = Math.floor(n),
								u = 60 * (n - o),
								a = Math.floor(u)
							return { hour: r, minute: o, second: a, millisecond: 1e3 * (u - a) }
						})(e)
					default:
						return e >= 1e3 && e < 1e6
							? parseFloat((e / 1e3).toFixed(r || 2)) + "K"
							: e >= 1e6 || e <= -1e6
							? parseFloat((e / 1e6).toFixed(r || 2)) + "M"
							: e
				}
			})
	},
	184: function (e, t, r) {
		"use strict"
		e.exports = function (e) {
			return {
				"@configs": e("src/configs"),
				"@framework": e("src/framework/index.js"),
				"@httpService": e("src/framework/services/httpService.js"),
				"@cacheService": e("src/framework/services/cacheService.js"),
				"@routerService": e("src/framework/services/routerService.js"),
				"@numberFormat": e("src/framework/components/utils/numberFormat.js"),
				"@logger": e("src/framework/components/utils/logger.js"),
				"@libRegister": e("src/framework/libRegister.json")
			}
		}
	},
	190: function (e, t, r) {
		"use strict"
		var n =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t]
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
					}
					return e
				},
			o = d(r(191)),
			u = d(r(51)),
			a = r(122),
			i = r(83)
		r(496)
		var c = d(r(503)),
			s = d(r(504)),
			l = d(r(505)),
			f = d(r(513))
		function d(e) {
			return e && e.__esModule ? e : { default: e }
		}
		r(514),
			(0, f.default)(o.default),
			(0, l.default)(o.default),
			(0, s.default)(o.default),
			(0, u.default)(o.default).then(function (e) {
				var t = new o.default(n({ el: "#content", template: "<app />", components: { app: c.default } }, e))
				a.memoryCache.set("vueItem", t),
					o.default.use(window.miHoYoAnalysis, {
						appId: "282",
						router: e.router,
						needUid: !0,
						dataBelong: ["hk4e", "plat"],
						env: i.environment,
						type: "event",
						isSea: i.game_biz.includes("global")
					})
			})
	},
	191: function (e, t) {
		e.exports = Vue
	},
	490: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.dealConfigsBeforeRequest = function (e) {
				return e
			}),
			(t.requestComplete = function (e) {
				"request" === e || !e || e.status
				return !1
			})
	},
	491: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 })
		var n = r(83)
		t.default = { baseURL: n.apiBase, withCredentials: !0 }
	},
	492: function (e, t, r) {
		var n = {
			".": 51,
			"./": 51,
			"./components/utils/logger": 112,
			"./components/utils/logger.js": 112,
			"./components/utils/loggerConfigs": 113,
			"./components/utils/loggerConfigs.js": 113,
			"./components/utils/numberFormat": 183,
			"./components/utils/numberFormat.js": 183,
			"./index": 51,
			"./index.js": 51,
			"./lib/router": 80,
			"./lib/router/": 80,
			"./lib/router/index": 80,
			"./lib/router/index.js": 80,
			"./libRegister": 111,
			"./libRegister.json": 111,
			"./services/cacheService": 122,
			"./services/cacheService.js": 122,
			"./services/httpService": 114,
			"./services/httpService.js": 114,
			"./webpackConfigs/utilWebpackAlias": 184,
			"./webpackConfigs/utilWebpackAlias.js": 184
		}
		function o(e) {
			var t = u(e)
			return r(t)
		}
		function u(e) {
			if (!r.o(n, e)) {
				var t = new Error("Cannot find module '" + e + "'")
				throw ((t.code = "MODULE_NOT_FOUND"), t)
			}
			return n[e]
		}
		;(o.keys = function () {
			return Object.keys(n)
		}),
			(o.resolve = u),
			(e.exports = o),
			(o.id = 492)
	},
	494: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 })
		var n = [
			{
				path: "/",
				name: "home",
				component: function (e) {
					return Promise.all([r.e(0), r.e(2)])
						.then(
							function () {
								var t = [r(537)]
								e.apply(null, t)
							}.bind(this)
						)
						.catch(r.oe)
				}
			}
		]
		t.default = n
	},
	495: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.beforeRouterUpdate = function (e, t, r) {
				0 === e.matched.length ? (t.path ? r(!1) : r("/")) : r()
			}),
			(t.afterRouterUpdate = function (e, t) {})
	},
	496: function (e, t, r) {
		"use strict"
		var n = s(r(497)),
			o = s(r(498)),
			u = s(r(499)),
			a = s(r(500)),
			i = s(r(185)),
			c = r(83)
		function s(e) {
			return e && e.__esModule ? e : { default: e }
		}
		if (
			((document.title = "‎"),
			(document.oncontextmenu = function (e) {
				return e.preventDefault(), !1
			}),
			c.environment.includes("preview"))
		)
			try {
				var l = i.default.get("op_username"),
					f = l.length
				;(0, a.default)({ width: 12 * f + "px", height: 10 * f + "px", text: l })
			} catch (e) {
				console.error("no op name")
			}
		n.default.attach(document.body),
			(0, o.default)({
				widthParam: 640,
				heightParam: 360,
				widthFlex: !0,
				callback: function () {
					document.getElementById("root").style.visibility = "visible"
				}
			}),
			u.default.init()
		var d = document.getElementById("vconsole")
		window.location.search.indexOf("debug=1") > -1 ||
		(-1 === window.location.pathname.indexOf("event_preview") && window.location.host.indexOf("-test") > -1)
			? (d.addEventListener("load", function () {
					window.vconsole = new window.VConsole()
			  }),
			  d.setAttribute("src", d.getAttribute("data-src")))
			: d.parentNode.removeChild(d)
	},
	503: function (e, t, r) {
		"use strict"
		r.r(t)
		var n = r(126),
			o = r(81)
		for (var u in o)
			["default"].indexOf(u) < 0 &&
				(function (e) {
					r.d(t, e, function () {
						return o[e]
					})
				})(u)
		var a = r(186),
			i = Object(a.a)(o.default, n.a, n.b, !1, null, null, null)
		;(i.options.__file = "src/app.vue"), (t.default = i.exports)
	},
	504: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.default = function (e) {
				e.filter("filterA", function (e) {
					return e || e.toLowerCase()
				}),
					e.filter("filterB", function (e) {
						return e || e.toUpperCase()
					})
			})
	},
	505: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 })
		var n = u(r(506)),
			o = u(r(511))
		function u(e) {
			return e && e.__esModule ? e : { default: e }
		}
		t.default = function (e) {
			;(window.miHoYoGameJSSDK = n.default), e.use(o.default, { threshold: 0.5 })
		}
	},
	51: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 }), r(192)
		var n,
			o,
			u = c(r(111)),
			a = c(r(112)),
			i = c(r(114))
		function c(e) {
			return e && e.__esModule ? e : { default: e }
		}
		t.default =
			((n = regeneratorRuntime.mark(function e(t) {
				var n, o, c, s, l
				return regeneratorRuntime.wrap(
					function (e) {
						for (;;)
							switch ((e.prev = e.next)) {
								case 0:
									;(0, i.default)(t), (n = [])
									try {
										for (o = Object.keys(u.default), c = 0; c < o.length; c++)
											(s = o[c]), (l = r(492)("" + u.default[s]).default), n.push(l(t))
									} catch (e) {
										a.default.error(e)
									}
									return e.abrupt("return", Object.assign.apply(Object, [{}].concat(n)))
								case 4:
								case "end":
									return e.stop()
							}
					},
					e,
					this
				)
			})),
			(o = function () {
				var e = n.apply(this, arguments)
				return new Promise(function (t, r) {
					return (function n(o, u) {
						try {
							var a = e[o](u),
								i = a.value
						} catch (e) {
							return void r(e)
						}
						if (!a.done)
							return Promise.resolve(i).then(
								function (e) {
									n("next", e)
								},
								function (e) {
									n("throw", e)
								}
							)
						t(i)
					})("next")
				})
			}),
			function (e) {
				return o.apply(this, arguments)
			})
	},
	513: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 })
		var n = {
			install: function (e) {
				var t = new e({})
				;(e.prototype.$gemit = t.$emit.bind(t)),
					(e.prototype.$gon = t.$on.bind(t)),
					(e.prototype.$gonce = t.$once.bind(t)),
					(e.prototype.$goff = t.$off.bind(t))
			}
		}
		t.default = function (e) {
			e.use(n)
		}
	},
	514: function (e, t, r) {},
	80: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 })
		var n = a(r(493)),
			o = a(r(494)),
			u = r(495)
		function a(e) {
			return e && e.__esModule ? e : { default: e }
		}
		t.default = function (e) {
			e.use(n.default)
			var t = new n.default({ routes: o.default })
			return (
				t.beforeEach(function (t, r, n) {
					u.beforeRouterUpdate.bind(e)(t, r, n)
				}),
				t.afterEach(function (t, r) {
					u.afterRouterUpdate.bind(e)(t, r)
				}),
				{ router: t }
			)
		}
	},
	81: function (e, t, r) {
		"use strict"
		r.r(t)
		var n = r(82),
			o = r.n(n)
		for (var u in n)
			["default"].indexOf(u) < 0 &&
				(function (e) {
					r.d(t, e, function () {
						return n[e]
					})
				})(u)
		t.default = o.a
	},
	82: function (e, t, r) {
		"use strict"
		Object.defineProperty(t, "__esModule", { value: !0 }),
			(t.default = { name: "app", beforeCreate: function () {} })
	},
	83: function (e, t, r) {
		"use strict"
		e.exports = {
			environment: "production",
			game_biz: "hk4e_yuuki",
			apiBase: "https://login.yuuki.me/common/",
			cdnBase: "https://login.yuuki.me/common/",
			webBase: "https://login.yuuki.me/audio/"
		}
	}
})
