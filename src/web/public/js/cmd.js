/** @format */

API_JSON_DATA = "https://fastly.jsdelivr.net/gh/Dituon/grasscutter-command-helper@main/data/en-US/3.5/"
// found https://github.com/Dituon/grasscutter-command-helper/tree/main/data/en-US/3.3

async function setup() {
	try {
		// list server
		const r = await axios.get("/api/server", {
			timeout: 1000 * 30
		})
		if (r.data) {
			var s = r.data

			//console.log(s);

			s.data.forEach((item) => {
				const optionElement = document.createElement("option")
				optionElement.setAttribute("value", item.id)
				optionElement.innerText = item.name
				document.getElementById("getserver").appendChild(optionElement)
			})
		}

		// list monster
		const r_monster = await axios.get(API_JSON_DATA + "monsterList.json", {
			timeout: 1000 * 15
		})
		var data_monster = r_monster.data
		if (data_monster) {
			//console.log(data_monster);
			let list_ms = document.querySelector("#list_monster")
			data_monster.forEach((item) => {
				let option = document.createElement("option")
				option.value = item.id
				option.text = item.name
				list_ms.appendChild(option)
			})
		}

		// list item
		const r_item = await axios.get(API_JSON_DATA + "itemList.json", {
			timeout: 1000 * 15
		})
		var data_item = r_item.data
		if (data_item) {
			//console.log(data_item);
			let list_ms = document.querySelector("#list_item")
			data_item.forEach((item) => {
				let option = document.createElement("option")
				option.value = item.id
				option.text = item.name
				list_ms.appendChild(option)
			})
		}
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Error get server, try reload..."
		})
		console.error(error)
	}
}
let data_login

let cmd_raw = document.querySelector("#cmd_raw")
cmd_raw.addEventListener("submit", async function (e) {
	e.preventDefault()

	if (!data_login) {
		Swal.fire({
			icon: "error",
			title: "No Login",
			showConfirmButton: false,
			timer: 1500
		})
		return
	}

	console.log(data_login)

	let formData = new FormData(cmd_raw)
	let object = {}
	formData.forEach(function (value, key) {
		object[key] = value
	})
	//let json = JSON.stringify(object);
	//console.log(object);

	var raw_cmd = object["get_cmd_raw"]

	const cmd_line = raw_cmd.split(/\r?\n/)
	const total_cmd = cmd_line.length

	// list cmd
	for (let i = 0; i < total_cmd; i++) {
		const cmdp = cmd_line[i].replace("/", "").replace("!", "")
		if (!cmdp) {
			continue
		}

		var tmp = {
			uid: data_login.user.uid,
			code: data_login.user.code, // TODO: vaild stuff
			cmd: cmdp
		}
		console.log(tmp)

		const rr = await axios.get("/api/server/" + data_login.server.name + "/command", {
			params: tmp,
			timeout: 1000 * 120
		})
		console.log(rr)

		if (rr.data) {
			var d = rr.data
			if (d.code == 200) {
				Swal.fire({
					icon: "success",
					title: d.msg,
					showConfirmButton: false,
					timer: 1500
				})
			} else {
				Swal.fire({
					icon: "error",
					title: d.msg
				})
			}
		} else {
			Swal.fire({
				icon: "error",
				title: "Maybe down?",
				showConfirmButton: false,
				timer: 1500
			})
		}
	}
})

let cmd_login = document.querySelector("#cmd_login")
cmd_login.addEventListener("submit", async function (e) {
	e.preventDefault()

	let formData = new FormData(cmd_login)
	let object = {}
	formData.forEach(function (value, key) {
		object[key] = value
	})
	let json = JSON.stringify(object)
	console.log(json)

	//TODO: add real login
	const rr = await axios.post("/api/server/" + object.server + "/ping", json)
	if (rr.data) {
		var d = rr.data
		if (d.code == 200) {
			Swal.fire({
				icon: "success",
				title: "You have successfully connected",
				showConfirmButton: false,
				timer: 1500
			})

			try {
				data_login = {
					server: {
						name: object.server,
						version: d.data.version
					},
					user: {
						code: object.code,
						uid: object.uid
					}
				}
				console.log(data_login)
			} catch (error) {
				console.log(error)
				Swal.fire({
					icon: "error",
					title: "idk",
					showConfirmButton: false,
					timer: 1500
				})
				return
			}

			Toggle("go_login")
			Toggle("go_cmd_raw")
		} else {
			Swal.fire({
				icon: "error",
				title: d.msg
			})
		}
	} else {
		Swal.fire({
			icon: "error",
			title: "Maybe down?",
			showConfirmButton: false,
			timer: 1500
		})
	}
	console.log(rr)
})

const textarea_cmd = document.getElementById("add_cmd_raw")

// TODO: add multi func not just mosnter?

const toadd_monster = document.getElementById("add_monster")
toadd_monster.addEventListener("click", function handleClick() {
	if (!CheckLogin()) return // check login

	var id = document.getElementById("search_monster").value
	if (!id) {
		Swal.fire({
			icon: "error",
			title: "Please fill in id",
			showConfirmButton: false,
			timer: 1500
		})
		return
	}

	var set_level = document.getElementById("set_monster_level").value
	var set_num = document.getElementById("set_monster_num").value

	var final_input = ""
	if (data_login.server.version == 1) {
		// GIO stuff
		// monster 20010101 5 20 {20010101=id_monster,5=total,20=level}
		final_input = `monster ${id} ${set_num} ${set_level}`
	} else {
		// GC stuff
		// /s 20010101 lv20 x5
		final_input = `/s ${id} x${set_num} lv${set_level}`
	}

	textarea_cmd.value += final_input + "\r\n"

	//console.log(data_login);
	//console.log(id);
	//console.log('element clicked');
})

const toadd_item = document.getElementById("add_item")
toadd_item.addEventListener("click", function handleClick() {
	if (!CheckLogin()) return // check login

	var id = document.getElementById("search_item").value
	if (!id) {
		Swal.fire({
			icon: "error",
			title: "Please fill in id",
			showConfirmButton: false,
			timer: 1500
		})
		return
	}

	var set_num = document.getElementById("set_item_num").value

	var final_input = ""
	if (data_login.server.version == 1) {
		// GIO stuff
		// item add
		final_input = `item add ${id} ${set_num}`
	} else {
		// GC stuff
		// /g
		final_input = `/g ${id} x${set_num}`
	}

	textarea_cmd.value += final_input + "\r\n"

	//console.log(data_login);
	//console.log(id);
	//console.log('element clicked');
})

// clear
const btn_clear = document.getElementById("clear_cmd")
btn_clear.addEventListener("click", function handleClick() {
	textarea_cmd.value = ""
})

function CheckLogin() {
	if (!data_login) {
		Swal.fire({
			icon: "error",
			title: "Not logged in yet",
			showConfirmButton: false,
			timer: 1500
		})
		return false
	}
	return true
}

function Toggle(name = "go_cmd_raw", foce = null) {
	var x = document.getElementById(name)
	if (foce) {
		x.style.display = foce
		return
	}
	if (x.style.display === "none") {
		x.style.display = "block"
	} else {
		x.style.display = "none"
	}
}

Count("item_num")
Count("monster_level")
Count("monster_num")

function Count(tes) {
	var i = document.querySelector("#set_" + tes)
	var o = document.querySelector("#view_" + tes)
	o.innerHTML = i.value
	i.addEventListener(
		"input",
		function () {
			o.innerHTML = i.value
		},
		false
	)
}

setup()
