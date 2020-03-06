function jsonp({ url, data, callback }) {
    return new Promise((resolve, reject) => {
        window[callback] = (data) => {
            resolve(data)
        }
        url = url.indexOf('?') === -1 ? url + '?' : url + '&'
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                url += `${key}=${data[key]}&`
            }
        }
        url += `callback=${callback}`
        console.log(url)
        let script = document.createElement('script')
        script.src = url
        script.type = 'type/javascript'
        document.body.appendChild(script)
    })
}
jsonp({
    url: 'http://localhost:3000/',
    data: { test: 'test' },
    callback: 'show'
}).then((data) => {
    console.log(data);
}).catch((e) => { console.log(e) })