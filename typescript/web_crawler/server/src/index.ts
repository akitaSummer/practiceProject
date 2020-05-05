import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
// import router from './router'
import router from "./router/index";
import './controller/LoginController'
import './controller/CrowllerController'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(
	cookieSession({
		name: 'session',
		keys: ['dell'],
		maxAge: 24 * 60 * 60 * 1000,
	})
)

// 问题2: 当我使用中间件时，对req/res做了修改之后，类型并不能改变
app.use((req: Request, res: Response, next: NextFunction) => {
	req.teacherName = 'dell'
	next()
})

app.use(router)

app.listen(7000, () => {
	console.log('server is running, url is http://localhost:7000')
})
