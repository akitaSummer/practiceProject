Function.prototype._call = function() {
    let content = arguments[0]
    content.fn = this

    let args = []

    for (i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }

    let res = content.fn(...args)

    delete content.fn
    return res
}