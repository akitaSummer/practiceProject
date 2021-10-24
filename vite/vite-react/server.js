const express = require('express')
const fs = require('fs')

const app = express()

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
    const template = fs.readFileSync("dist/client/index.html", 'utf-8')

    app.use(express.static("dist/client"))

    app.get('*', async(req, res) => {
        const render = require('./dist/server/server-entry').render

        const context = {}

        const html = await render(req.url, context)

        if (context.url) {
            res.redirect(301, context.url)
            return
        }

        const responseHTML = template.replace("<!--APP_HTML-->", html)

        res.set('content-type', 'text/html').send(responseHTML)
    })

    app.listen(4000)
} else {
    const { createServer: createViteServer } = require('vite')

    createViteServer({
        server: {
            // middlewareMode: 'html'
            middlewareMode: 'ssr'
        }
    }).then(vite => {
        app.use(vite.middlewares)

        app.get('*', async(req, res) => {
            // res.set('content-type', 'text/html')
            // res.send(fs.readFileSync('index.html'))
            let template = fs.readFileSync("index.html", 'utf-8')

            template = await vite.transformIndexHtml(req.url, template)

            const { render } = await vite.ssrLoadModule('/src/server-entry.jsx')

            const html = await render(req.url)

            const responseHTML = template.replace("<!--APP_HTML-->", html)

            res.set('content-type', 'text/html').send(responseHTML)
        })

        app.listen(4000)
    })
}