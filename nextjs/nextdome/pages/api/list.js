const fetch = require('node-fetch')

/**
 * req
 *  req.method 请求方式
 *  req.body 经过处理的解析成字符串
 *  req.query 请求参数
 *  req.cookies cookie
 * 
 * res
 *  res.statusCode 设置状态码
 *  res.setHeader 设置响应头
 *  res.end() 发送数据 nexjs包装的
 *  res.status(code) 设置状态码的功能，code必须是有效的HTTP状态码
 *  res.json(json) 发送JSON响应，json必须是有效的JSON对象
 *  res.send(body) 发送HTTP响应，body可以是string，object和Buffer
 */

export default async(req, res) => {

    if (req.method === 'GET') {
        res.status(403)
        res.send('Internet Error')
    }

    const response = await fetch('http://localhost:9000/detail', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-type': 'application/json'
        }
    })

    const resData = await response.json()

    res.setHeader('content-type', 'application/json')
    res.status(200)
    res.json(resData)
}