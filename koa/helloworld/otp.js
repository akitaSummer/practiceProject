// otp：动态口令，又称验证码 HOTP：基于加法计数器和静态对称秘钥的算法 TOTP：寄予时间的一次性密码算法
const notp = require('notp') // TOTP
const opt = {
    window: 0
}

const app = {
    encode: (key) => notp.totp.gen(key, opt),
    decode: (key, token) => {
        const login = notp.totp.verify(token, key, opt)
        if (!login) {
            console.log('Token invalid')
            return false
        }
        return true
    }
}

// koa-otp实现
module.exports = (key) => ({
    encode: (callback) => (ctx, next) => {
        const token = app.encode(key)
        ctx.otp_token = token
        if (callback) {
            callback(ctx, next)
        } else {
            return next()
        }
    },
    decode: (token, callback) => (ctx, next) => {
        ctx.opt_valid = app.decode(key, token)
        if (callback) {
            callback(ctx, next)
        } else {
            return next()
        }
    }
})