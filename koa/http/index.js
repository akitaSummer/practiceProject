const http = require('http')
const fs = require('fs')
const through = require('through2')

const PORT = 3000

const proxy = (req, res) => {
    const options = {
        host: req.host,
        port: 3000,
        headers: req.headers,
        path: '/remote',
        agent: false,
        method: 'GET'
    }
    const httpProxy = http.request(options, (response) => {
        response.pipe(res)
    })

    req.pipe(httpProxy)
}

const server = http.createServer((req, res) => {

    if ('/remote' === req.url) {

        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            const content = Buffer.concat(body).toString()
            res.end(body)
        })

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })

        res.write("<!DOCTYPE 'html'>")

        res.end('hello nodejs\n')
    } else {
        proxy(req, res)
    }

}).listen(3000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('umi mock serve at http://%s:%s', host, port)
})

server.on('request', (req, res) => {})

const client = http.request({
    host: 'httpbin.org',
    path: '/ip'
}, (res) => {
    res.setEncoding("utf8")
    let str = ''
    res.on('data', (chunk) => {
        str += chunk
    })
    res.on('end', () => {
        console.log(str)
    })
})

const source = fs.readFileSync('/path/to/source', { encoding: 'utf-8' })
fs.writeFileSync('/path/to/dest', source)
    // -->
fs.createReadStream('/path/to/source').pipe(fs.createWriteStream('/path/to/dest'))