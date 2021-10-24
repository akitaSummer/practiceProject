const path = require('path')
const fs = require('fs')

const template = fs.readFileSync("dist/client/index.html", 'utf-8')

const render = require('./dist/server/server-entry').render

const routesToRender = fs.readFileSync('src/pages').map((file) => {
    return file.replace('.jsx', '').toLowerCase();
})

(async() => {
    for (const route of routesToRender) {

        const context = {}

        const html = await render(req.url, context)

        const responseHTML = template.replace("<!--APP_HTML-->", html)

        const filePath = `dist/static${route}.html`

        fs.writeFileSync(filePath, responseHTML)
    }
})()