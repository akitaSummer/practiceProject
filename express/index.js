const express = require('express')

const app = express()

app.use(express.json()) // 允许express解析post中的json到req.body中

const mongoose = require('mongoose') // 引入mongoose
mongoose.connect('mongodb://localhost:27017/express-test', { useNewUrlParser: true, useUnifiedTopology: true }) // 连接mongodb数据库
const Product = mongoose.model('Product', new mongoose.Schema({
        title: String
    })) // 创建一个集合（表），schema作为结构
app.use(require('cors')()) // 使用cors解决跨域

app.use('/', express.static('public')) // 使用中间件托管静态文件夹, 并且可以设置路径

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

app.listen(4000, () => {
    console.log('App listening on port 4000!')
})