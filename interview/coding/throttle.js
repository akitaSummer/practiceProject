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

function repeat(func, times, wait) {
    let i = 0
    return function(str) {
        const I = setInterval(() => {
            console.log(wait)
            if (i >= wait) {
                clearInterval(I)
            } else {
                i++
                func(str)
            }
        }, times)
    }
}
const repeatFunc = repeat(alert, 4, 3000)
repeatFunc("hellworld")