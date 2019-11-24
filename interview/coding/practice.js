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