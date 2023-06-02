/** @format */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"

export const _ = {
	async getPostData(detail = true, category = "Genshin Impact") {
		const postDirectory = path.join(__dirname, "../../blog", category)

		console.log(postDirectory)

		const fileNames = fs.readdirSync(postDirectory)

		const allData = fileNames.map((fileName, index) => {
			const url = fileName.replace(/\.md$/, "")
			const fullPath = path.join(postDirectory, fileName)
			const fileContents = fs.readFileSync(fullPath, "utf8")
			const { data: frontmatter, content } = matter(fileContents)

			const ann_id = index + 1

			let processedContent = this.markdownToHtml(content)

			const { date, title, subtitle, banner, lang } = frontmatter

			if (detail) {
				return {
					url,
					ann_id,
					title,
					subtitle,
					banner,
					content: processedContent,
					lang,
					date
				}
			} else {
				return {
					ann_id,
					title,
					subtitle,
					banner,
					content: "",
					type_label: frontmatter.type_label || "Announcement",
					tag_label: frontmatter.tag_label || "2",
					tag_icon: frontmatter.tag_icon || "",
					login_alert: frontmatter.login_alert || 1,
					lang,
					start_time: frontmatter.start_time || "2022-07-15 17:00:00",
					end_time: frontmatter.end_time || "2022-08-23 23:59:59",
					type: frontmatter.type || "2",
					remind: frontmatter.remind || 1,
					alert: frontmatter.alert || 0,
					tag_start_time: frontmatter.tag_start_time || "",
					tag_end_time: frontmatter.tag_end_time || "",
					remind_ver: frontmatter.remind_ver || 1,
					has_content: frontmatter.has_content !== false,
					extra_remind: frontmatter.extra_remind || 0,
					date
				}
			}
		})

		const results = await Promise.all(allData)

		return results.filter(Boolean).sort((a, b) => b.date.localeCompare(a.date))
	},

	markdownToHtml(markdown: string) {
		const md = new MarkdownIt()
		return md.render(markdown)
	}
}

export default _
