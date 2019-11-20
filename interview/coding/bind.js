Function.prototype._bind = function(context, ...args) {
    let self = this
    return function() {
        Function.prototype.apply(context, args.concat(Array.prototype.slice.call(arguments)))
    }
}