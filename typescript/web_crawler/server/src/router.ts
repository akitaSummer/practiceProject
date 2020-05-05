import { NextFunction, Request, Response, Router } from 'express'
import fs from 'fs'
import path from 'path'

import { getResponseData } from './utils/util'
import Crowller from './utils/crowller'
import Analyzer from './utils/analyzer'

// 问题1: express库的类型定义文件 .d.ts 文件描述不准确
interface BodyRequest extends Request {
	body: {
		[key: string]: string | undefined
	}
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
	const isLogin = req.session ? req.session.login : undefined
	if (isLogin) {
		next()
	} else {
		res.json(getResponseData(null, '请先登录'))
	}
}

const router = Router()

router.get('/', () => {})

router.post('/login', (req: BodyRequest, res: Response) => {
	const { password } = req.body
	const isLogin = req.session ? req.session.login : undefined
	if (isLogin) {
		res.json(getResponseData(false, '已经登陆过'))
	} else {
		if (password === '1234' && req.session) {
			req.session.login = true
			res.json(getResponseData(true))
		} else {
			res.json(getResponseData(false, '登录失败'))
		}
	}
})

router.get('/logout', (req: Request, res: Response) => {
	if (req.session) {
		req.session.login = undefined
	}
	res.json(getResponseData(true))
})

router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {
	const url = 'http://www.dell-lee.com/'
	const analyzer = Analyzer.getInstance()
	const crowller: Crowller = new Crowller(url, analyzer)
	res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
	try {
		const position = path.resolve(__dirname, '../data/course.json')
		const result = fs.readFileSync(position, 'utf8')
		res.json(getResponseData(JSON.parse(result)))
	} catch (e) {
		res.json(getResponseData(false, '数据不存在'))
	}
})

export default router
