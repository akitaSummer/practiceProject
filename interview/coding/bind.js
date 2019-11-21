Function.prototype._bind = function(context, ...args) {
    let self = this
    return function() {
        self.apply(context, args.concat(Array.prototype.slice.call(arguments)))
    }
}