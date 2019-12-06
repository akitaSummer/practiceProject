module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true // 合并url参数，让路由可以访问到
  })
  const Category = require('../../models/Category')

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.post('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') { // 单独处理分类路径下父类型
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', async(req, res, next) => { // 中间件, 在router前调用
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({dest: __dirname + '../../uploads'})
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res)=> {
    const { username, password } = req.body
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({ username }).select('+password')
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
      id: user._id,
      _id: user._id,
      username: user.username
    }, app.get('secret'))
    res.send({token})
  })
}
