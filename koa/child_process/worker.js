const { worker } = require('cluster')
const http = require('http')
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`handle by child, pid is ${process.pid} \n`)
})

// process.on('message', (m) => {
//     console.log(`CHILD got message: `, m)
// })

// process.send({ foo: 'bar' })

let worker

process.on('message', (m, tcp) => {
    if (m === 'server') {
        worker = tcp
        worker.on('connection', (socket) => {
            server.emit('connection', socket)
                // socket.end('handle by child\n')
        })
    }
})

process.on('uncaughtException', (err) => {
    console.error(err)
        // 发送自杀信号
    process.send({ act: 'suicide' })
    worker.close(() => {
            // 连接都断开后，退出进程
            process.exit(1)
        })
        // 长连接条件下，设置超时时间
    setTimeout(() => process.exit(1), 5000)
})