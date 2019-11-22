function deepClone(obj) {
    const objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepClone(obj[key])
                } else {
                    objClone[key] = obj[key]
                }
            }
        }
    }
}