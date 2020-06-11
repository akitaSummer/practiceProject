const express = require('express')

const app = express()

app.use(express.json()) // 允许express解析post中的json到req.body中
app.use(express.urlencoded({ extended: false }))

const { Product, User } = require('./models')
app.use(require('cors')()) // 使用cors解决跨域

const SECRET = 'miyao'
const jwt = require('jsonwebtoken')

app.use('/public', express.static('public')) // 使用中间件托管静态文件夹, 并且可以设置路径

app.get('/', function(req, res) {
    res.send({
        page: 'home'
    })
})

app.get('/products', async function(req, res) {
    // const data = await Product.find().skip(1).limit(2)
    // const data = await Product.where({ title: 'Product B' })
    const data = await Product.sort({ _id: -1 }) // 1是正序，-1是倒叙
    res.send(data)
})

app.get('/products/:id', async(req, res) => {
    const data = await Product.findById(req.params.id)
    res.send(data)
})

app.post('/products', async(req, res) => {
    const data = req.body
    const product = await Product.create(data)
    res.send(product)
})

app.put('/products/:id', async(req, res) => {
    const product = await Product.findById(req.params.id)
    product.title = req.body.title
    await product.save()
    res.send(product)
})

app.delete('/products/:id', async(req, res) => {
    const product = await Product.findById(req.params.id)
    await product.remove()
    res.send({
        success: true
    })
})

app.get('/api/users', async(req, res) => {
    const users = await User.find()
    res.send(users)
})

app.post('/api/register', async(req, res) => {
    const { username, password } = req.body
    const user = await User.create({
        username,
        password
    })
    res.send(user)
})

app.post('/api/login', async(req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({
        username
    })
    if (!user) {
        return res.status(422).send({
            message: '用户不存在'
        })
    }
    const isPasswordValid = user.password === password
    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码无效'
        })
    }
    // 生成token
    const token = jwt.sign({
        id: String(user._id)
    }, SECRET)
    res.send({
        user,
        token
    })
})

const auth = async(req, res, next) => { // 中间件
    const raw = String(req.headers.authorization).split(' ').pop()
    const { id } = jwt.verify(raw, SECRET)
    req.user = await User.findById(id)
    next()
}

app.get('/api/profile', auth, async(req, res) => {

    res.send(req.user)
})

app.listen(4000, () => {
    console.log('App listening on port 4000!')
})