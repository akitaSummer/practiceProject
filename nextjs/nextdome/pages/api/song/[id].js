const fs = require('fs')

export default (req, res) => {

    const songData = fs.readFileSync(`${process.cmd()}/json/data.json`, 'utf-8')

    const idData = JSON.parse(songData).data.artistList.filter((item) => {
        return req.query.id === item.id
    })
    res.setHeader('content-type', 'application/json')

    res.status(200)

    res.send(idData)
}