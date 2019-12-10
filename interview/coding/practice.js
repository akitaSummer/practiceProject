function ajax() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/', true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 2) {
            if (xhr.status > 400) {}
        }
    }
    xhr.send()
}

Function.prototype._apply = function(obj, args) {
    obj.fn = this
    const res = obj.fn(...args)
    delete obj.fn
    return res
}

Function.prototype._call = function(obj, ...args) {
    obj.fn = this
    const res = obj.fn(...args)
    delete obj.fn
    return res
}

Function.prototype._bind = function(obj, ...args) {
    const self = this
    return function() {
        self.apply(obj, args.concat(Array.prototype.slice(this.arguments)))
    }
}

const PADDING = 'PADDING'
const RESOLVE = 'RESOLVE'
const REJECT = 'REJECT'

function MyPromise(fn) {
    this.value = null
    this.state = PADDING
    this.rejectCallbacks = []
    this.resolveCallbacks = []

    function resolve(value) {
        this.state = 'RESOLVE'
        this.value = value
        this.resolveCallbacks.map(fn => fn())
    }

    function reject(value) {
        this.state = 'REJECT'
        this.value = value
        this.resolveCallbacks.map(fn => fn())
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : v => v

    if (this.state === PADDING) {
        this.resolveCallbacks.push(onFulfilled)
        this.rejectCallbacks.push(onRejected)
    } else if (this.state === RESOLVE) {
        onFulfilled(this.value)
    } else {
        onRejected(this.value)
    }
}

function getType(target) {
    if (target === null) {
        return 'null'
    }
    const type = typeof target
    if (type !== 'object') {
        return type
    }
    const template = {
        '[Object Array]': 'array',
        '[Object Object]': 'object',
        '[Object Number]': 'object number',
        '[Object String]': 'object string',
        '[Object Boolean]': 'object boolean',
    }
    const typeStr = Object.prototype.toString.call(target)
    return template[typeStr]
}