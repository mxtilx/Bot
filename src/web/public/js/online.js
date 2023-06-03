/** @format */

async function online() {
	try {
		// list server
		const r = await axios.get("/api/server", {
			timeout: 1000 * 30
		})
		if (r.data != undefined || r.data.data != undefined) {
			updateOrCreateRows(r.data.data)
		}
	} catch (error) {
		console.error(error)
	}
}
online()
setInterval(function () {
	online()
}, 10 * 1000)
const tableBody = document.querySelector("tbody")

// Function to update or create rows in the table
function updateOrCreateRows(data) {
	console.log(data)
	let total = 0
	Object.entries(data).forEach(function ([id, row]) {
		const existingRow = document.querySelector(`tr[data-id="${id}"]`) || document.createElement("tr")
		existingRow.setAttribute("data-id", id)

		const nameCell = existingRow.cells[0] || existingRow.insertCell(0)
		nameCell.textContent = stringifyValue(row.name)
		nameCell.style.color = row.server.online ? 'green' : 'red';
		nameCell.setAttribute("data-bs-toggle", "tooltip")
		nameCell.setAttribute("data-bs-placement", "top")
		nameCell.setAttribute("data-bs-html", "true")
		nameCell.setAttribute(
			"title",
			`
			ID: ${row.id}<br>
			Commit: ${row.server.commit}<br>
			Version Support: ${Object.values(row.server.version).join(", ")}<br>
			Uptime: ${calculateUptime(row.server.startup)}
			`
		)
		const nameTooltip = new bootstrap.Tooltip(nameCell) // Initialize the tooltip
		nameCell.addEventListener("click", function () {
			nameTooltip.hide() // Hide the tooltip when clicked
		})
		// Add event listeners for hovering over the server title
		nameCell.addEventListener("mouseenter", function () {
			nameTooltip.show() // Show the tooltip on mouse enter
		})
		nameCell.addEventListener("mouseleave", function () {
			nameTooltip.hide() // Hide the tooltip on mouse leave
		})

		const playerCell = existingRow.cells[1] || existingRow.insertCell(1)
		var online = row.server.player
		if (row.server.sub != "???") {
			online += ` | Node ${Object.values(row.server.sub).join(", ")}`
		}
		total += parseInt(row.server.player) || 0
		playerCell.textContent = stringifyValue(online)

		const cpuCell = existingRow.cells[2] || existingRow.insertCell(2)
		cpuCell.textContent = stringifyValue(row.server.cpu)

		const ramCell = existingRow.cells[3] || existingRow.insertCell(3)
		ramCell.textContent = stringifyValue(row.server.ram)

		if (!existingRow.parentElement) {
			tableBody.appendChild(existingRow)
		}
	})

	// Update or create the footer row
	let footerRow = document.querySelector("tfoot tr")
	if (!footerRow) {
		footerRow = document.createElement("tr")
		const footerCell = document.createElement("td")
		footerCell.setAttribute("colspan", "3")
		footerRow.appendChild(footerCell)
		tableFooter.appendChild(footerRow)
	}

	const footerCell = footerRow.cells[1] || footerRow.insertCell(1)
	footerCell.textContent = `Total: ${total}`
}

// Helper function to convert values to string
function stringifyValue(value) {
	if (typeof value === "object" && value !== null) {
		// If value is an object, convert it to JSON string
		return JSON.stringify(value)
	}
	// Otherwise, convert value to string
	return String(value)
}

function calculateUptime(startupTimestamp) {
	if (startupTimestamp == "???") {
		return "Offline/NotUpdate"
	}
	const now = Math.floor((Date.now() + 8 * 3600 * 1000) / 1000) // Current timestamp adjusted for UTC+8 in seconds
	const uptimeSeconds = now - startupTimestamp // Calculate the uptime in seconds

	// Calculate the components of uptime
	const days = Math.floor(uptimeSeconds / 86400)
	const hours = Math.floor((uptimeSeconds % 86400) / 3600)
	const minutes = Math.floor((uptimeSeconds % 3600) / 60)
	const seconds = uptimeSeconds % 60

	// Create an array of uptime components
	const components = []
	if (days > 0) components.push(`${days}d`)
	if (hours > 0) components.push(`${hours}h`)
	if (minutes > 0) components.push(`${minutes}m`)
	if (seconds > 0) components.push(`${seconds}s`)

	// Join the components with spaces to form the formatted uptime
	return components.join(" ")
}
