const connect = require('connect')

const app = connect()

app.use((req, res, next) => {
    next()
})

export default app