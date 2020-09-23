const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// 引入数据库
require('./db/db')()

// 设置请求打印中间件
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// 获取POSTbody内容中间件
app.use(express.json())
// CORS跨域
app.use(cors())
// 设置文件下载文件夹
app.use(express.static('build'))

app.use(require('./middleware/unknownEndpoint'))

app.use(require('./middleware/errorHandlers'))

app.get('/info', (req, res) => {
  res.send(
    `
    <p>Phonebook has info for 4 people</p>
    <p>${Date.now()}</p>
    `
  )
})

// 引入路由
app.use('/api/persons', require('./routes'))

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
