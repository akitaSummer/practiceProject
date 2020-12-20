const mongoose = require('mongoose')
const Koa = require('koa')
const session = require('koa-session')
const MongooseStore = require('koa-session-mongoose')

const config = {
    db: 'mongodb://localhost:27017/node_vue_moba'
}

const db_server = process.env.DB_ENV || "primary"

mongoose.connection.on('connected', (ref) => {
    console.log(`Connected to ${db_server} DB!`)

    const app = new Koa()

    const port = process.env.port || 3000
    const ip = process.env_ip

    app.keys = ['some secret hurr'];

    const CONFIG = {
        maxAge: 60000 * 20,
        store: new MongooseStore({ connection: mongoose.connection })
    }

    app.use(session(CONFIG, app))

    app.listen(port, ip, () => {
        console.log(`listening on port ${port}`)
    })
    app.callback()
})

mongoose.connection.on('error', (err) => {
    console.error(`Failed to connect to DB ${db_server} on startup `, err)
})

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose default connection to DB: ${db_server} disconected`)
})

const gracefulExit = () => {
        mongoose.connection.close(() => {
            console.log(`Mongoose default connection with DB: ${db_server} is disconnected through app termination`)
            process.exit(0)
        })
    }
    // Node.js进程结束，关闭Mongoose连接
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)

constoptions = {
    server: {
        auto_reconnect: true,
        poolSize: 10,
        userNewUrlParser: true,
        native_parser: true, // 提升性能
    }
}

try {
    options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 }
    mongoose.connect(config.db, options)
    console.log(`Trying to connect to DB ${db_server}`)
} catch (e) {
    console.log(`Sever initialization failed ${e.message}`)
}