const express = require('express')

const app = express()

app.set("view engine", 'pug')

app.get('/', (req, res) => {
    res.render("index", { title: 'hey', message: 'hello world!' })
})

app.listen(4000)