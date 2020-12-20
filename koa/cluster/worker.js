const http = require('http')
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`handle by child, pid is ${process.pid} \n`)
    throw Error('uncaughtException')
})

server.listen(8000, () => {
    console.log(`listen by child, pid is ${process.pid} \n`)
})

process.on('uncaughtException', (err) => {
    console.error(err)
        // 连接都断开后，退出进程，会先发送'disconnect',在发送'exit'
    process.disconnect()
        // 长连接条件下，设置超时时间
    setTimeout(() => process.exit(1), 5000)
})