const express = require('express')
const fs = require('fs')

const app = express()

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