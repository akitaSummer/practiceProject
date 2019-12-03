function trueCurrying(fn, ...args) {
    if (args.length >= fn.length) {
        fn(args)
    } else {
        return function(...args2) {
            trueCurrying(fn, ...args, ...args2)
        }
    }
}