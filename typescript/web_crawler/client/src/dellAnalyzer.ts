import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzer } from './crowller'

interface Course {
	count: number
	title: string
}

interface courseResult {
	time: number
	data: Course[]
}

interface Content {
	[propName: number]: Course[]
}

export default class DellAnalyzer implements Analyzer {
	private static instance: DellAnalyzer

	static getInstance() {
		if (!this.instance) {
			this.instance = new DellAnalyzer()
		}
		return this.instance
	}

	private constructor() {}

	private getCourseInfo(html: string) {
		const $ = cheerio.load(html)
		const courseItems = $('.course-item')
		const courseInfos: Course[] = []
		courseItems.map((index, element) => {
			const descs = $(element).find('.course-desc')
			const title = descs.eq(0).text()
			const count = Math.floor(100 * Math.random())
			courseInfos.push({ title, count })
		})
		return {
			time: Date.now(),
			data: courseInfos,
		}
	}

	private generateJsonContent(courseInfo: courseResult, filePath: string) {
		let fileContent: Content = {}
		if (fs.existsSync(filePath)) {
			fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
		}
		fileContent[courseInfo.time] = courseInfo.data
		return fileContent
	}

	analyze(html: string, filePath: string) {
		const courseInfo = this.getCourseInfo(html)
		const fileContent = this.generateJsonContent(courseInfo, filePath)
		return JSON.stringify(fileContent)
	}
}
