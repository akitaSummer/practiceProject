function forEach(obj, fn) {
    if (typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(key, obj[key])
            }
        }
    } else {
        obj.forEach((item, index) => {
            fn(index, item)
        })
    }
}