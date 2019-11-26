function getType(target) {
    if (target === null) {
        return 'null'
    }
    const type = typeof target
    if (type !== 'object') {
        return type
    }
    const template = {
        '[object Object]': 'object',
        '[object Array]': 'array',
        '[object Function]': 'function',
        '[object Number]': 'object - number',
        '[object Boolean]': 'object - boolean',
        '[object String]': 'object - string'
    }
    const typeStr = Object.prototype.toString.call(target)
    return template[typeStr]
}