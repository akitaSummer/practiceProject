const express = require('express')

const app = express()

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
    res.send(await Product.find())
})

app.listen(4000, () => {
    console.log('App listening on port 4000!')
})