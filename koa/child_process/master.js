const fork = require('child_process').fork
const cpus = require('os').cpus()

const server = require('net').createServer()

server.listen(1337)

const limit = 20
const during = 60000
let restart = []
const isTooFrequently = () => {
    const time = Date.now()
    const length = restart.push(time)
    if (length > limit) {
        restart = restart.slice(limit * -1)
    }
    return restart.length >= limit && restart[restart.length - 1] - restart[0] < during
}

const workers = {}

const createWorker = () => {
    // 处理短时间大量反复重启
    if (isTooFrequently) {
        process.emit('giveup', length, during)
        return
    }

    const worker = fork('./worker.js')

    worker.on('exit', () => {
        console.log(`Worker ${worker.pid} exited`)
        delete workers[worker.pid]
            // createWorker()
    })

    worker.on('message', (message) => {
        if (message.act === 'suicide') createWorker()
    })

    worker.send('server', server)
    workers[worker.pid] = worker
    console.log(`Create worker, pid: ${worker.pid}`)
}

for (var i = 0; i < cpus.length; i++) {
    createWorker()
}

process.on('exit', () => {
    for (let pid in workers) {
        workers[pid].kill()
    }
})