function throttle(func, delay = 500) {
    let lock = false
    return (...args) => {
        if (lock) {
            return
        } else {
            lock = true
            func.bind(null, ...args)
            setTimeout(() => { lock = false }, delay)
        }
    }
}