module.exports = option => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  const assert = require('http-assert')
  return async (req, res, next) => {
    const token = String(req.header.authorization || '').split(' ').pop()
    assert(token, 401, '请提供jwt token')
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '无效的jwt token')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}
