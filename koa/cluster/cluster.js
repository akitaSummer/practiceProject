const cluster = require('cluster')

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

cluster.schedulingPolicy = cluster.SCHED_RR

cluster.setupMaster({
    exec: 'worker.js'
})

const workers = {}

const createWorker = () => {
    // 处理短时间大量反复重启
    if (isTooFrequently()) {
        process.emit('giveup', restart.length, during)
        return
    }

    const worker = cluster.fork()

    worker.on('exit', () => {
        console.log(`Worker ${worker.id} exited`)
        delete workers[worker.id]
    })

    worker.on('disconnect', (message) => {
        console.log(`Worker ${worker.id} disconnected`)
        createWorker()
    })

    workers[worker.id] = worker
    console.log(`Create worker, id: ${worker.id}`)
}

// cluster.on('message', (message) => {
//     console.log('restart')
//     if (message.act === 'suicide') createWorker()
// })

// cluster.on('disconnect', () => {
//     console.log('disconnect')
//     createWorker()
// })

// cluster.on('exit', () => {
//     delete workers[worker.id]
// })

const cpus = require('os').cpus()

for (let i = 0; i < cpus.length; i++) {
    createWorker()
}

process.on('exit', () => {
    for (let id in workers) {
        workers[id].kill()
    }
})