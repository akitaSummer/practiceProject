// 节流
function throttle(func, delay = 60) {
    let lock = false
    return (...args) => {
        if (lock) {
            return
        }
        func(...args)
        lock = true
        setTimeout(() => { lock = false }, delay)
    }
}

const fn = function() {
    console.log('boom')
}

setInterval(throttle(fn, 500), 1000)