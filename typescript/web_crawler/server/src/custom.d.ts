// 问题2: 当我使用中间件时，对req/res做了修改之后，类型并不能改变
declare namespace Express {
	interface Request {
		teacherName: string
	}
}
