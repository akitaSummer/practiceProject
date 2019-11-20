Function.prototype._apply = function() {
    const content = arguments[0]
    content.fn = this

    let res

    if (arguments[1]) {
        res = content.fn(...arguments[1])
    } else {
        res = content.fn()
    }

    delete content.fn
    return res
}