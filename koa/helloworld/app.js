const Koa = require('koa')
const app = new Koa()
const views = require('koa-views') // 视图渲染
const json = require('koa-json') // 更好支持JSON
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser') // 解析POST类HTTP动词的body内容
const logger = require('koa-logger') // 开发阶段日志
const multer = require('koa-multer') // 文件上传
    // koa-multer不会处理multipart/form-data以外的任何表单
    // const upload = multer({ dest: 'upload/' })
    // router.post('/post/formdata', upload.any(), (ctx) => {
    //   console.log(ctx.req.files)
    //   ctx.body = {
    //     status: {
    //       code: 0,
    //       msg: 'upload success',
    //     },
    //     data: {
    //       body: ctx.req.body,
    //       files: ctx.req.files
    //     }
    //   }
    // })
const jwt = require('jsonwebtoken') // 使用jwt进行鉴权

const secret = 'koa.com'
    // jwt.sign签名
const token = jwt.sign({ //签名体内部包含用户的信息
    data: {
        user_id: 10000,
        user_name: 'akita',
        user_email: '644171127@qq.com'
    }
}, secret, { expiresIn: '1h' })

try {
    // 通过jwt.verify进行校验获得信息
    const decoded = jwt.verify(token, secret)
    console.log(decoded)
} catch (e) {
    console.log(e)
}
// 也可以使用const jwt = require('koa-jwt') router.get('/api', jwt({ secret: 'shared-secret' }, (ctx, next) => {}))

const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const otp = require('./otp')('asdfjkl')

const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')
const multer = require('koa-multer')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
    // etag通常与conditional-get一块使用
app.use(conditional())
app.use(etag())

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

app.use(otp.encode((ctx, next) => {
    ctx.body = {
        token: ctx.otp_token,
        valid: ctx.otp_valid
    }
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    const token = ctx.request.body.token || ctx.query.token || ctx.headers['x-access-token'] // 获取token的方法
    console.log({
        href: ctx.href, // 完整url https://127.0.0.1:8080/site/oneway_list.htm?a=1&b=2#abc
        path: ctx.path, // pathname，search /site/oneway_list.htm
        url: ctx.url, // /site/oneway_list.htm?a=1&b=1
        query: ctx.query, // 查询字符串 {a: 1}
        querystring: ctx.querystring, // a=1
        search: ctx.search, //搜索部分 ?a=1&b=1
        host: ctx.host, // host,port 127.0.0.1:3000
        hostname: ctx.hostname, // 域名 127.0.0.1
        protocol: ctx.protocol, // 协议 http
        secure: ctx.secure, // false
        subdomains: ctx.subdomains, // []
        origin: ctx.origin // http://127.0.0.1:3000
    })
    console.log({
        header: ctx.header,
        method: ctx.method, // GET POST PUT PATCH DELETE
        status: ctx.status, // 200
        type: ctx.type, // html Content-Type
        body: ctx.body, // 使用koa-bodyparser中间件，ctx.request.body可以获得post等请求的内容
        cookies: ctx.cookies, // ctx.cookies.set('name', 'koajs', { signed: true })
        // app.keys = ['im a newer secret'] // 使用app.keys对Cookie进行签名
        params: ctx.params, // /user/:id
        query: ctx.query,
    })
    await next()
    const ms = new Date() - start
        // ctx.response.etag = etag(entity, options)
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});


module.exports = app