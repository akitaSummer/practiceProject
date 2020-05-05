// ts -> .d.ts 翻译文件:@types/xxxxx -> js
import superagent from 'superagent'
import fs from 'fs'
import path from 'path'

export interface Analyzer {
	analyze: (html: string, filePath: string) => string
}

class Crowller {
	private filePath = path.resolve(__dirname, '../../data/course.json')
	constructor(private url: string, private analyzer: Analyzer) {
		this.initSpiderProcess()
	}

	private async initSpiderProcess() {
		const html = await this.getRawHtml()
		const fileContent = this.analyzer.analyze(html, this.filePath)
		this.writeFile(fileContent)
	}

	private async getRawHtml() {
		// 爬取网站
		const result = await superagent.get(this.url)
		return result.text
	}

	private writeFile(content: string) {
		fs.writeFileSync(this.filePath, content)
	}
}

export default Crowller
