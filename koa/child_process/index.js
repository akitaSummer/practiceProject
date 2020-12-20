const fork = require('child_process').fork
const cpus = require('os').cpus()

// for (var i = 0; i < cpus.length; i++) {
//     fork('./worker.js')
// }

const chlid = fork('./worker.js')

const server = require('net').createServer()

// server.on('connection', (socket) => {
//     socket.end('handle by parent\n')
// })

server.listen(1337, () => {
    chlid.send('server', server)
    server.close()
})

// chlid.on('message', (m) => {
//     console.log(`PARENT got message: `, m)
// })

// chlid.send({ hello: 'world' })