function debounce(func, dec) {
    let I = 0
    return (...args) => {
        clearTimeout(I)
        I = setTimeout(func.bind(null, args), dec)
    }
}

function throttle(func, dec) {
    let lock = false
    return (...args) => {
        if (lock) {
            return
        }
        lock = true
        func.call(null, ...args)
        setTimeout(() => { lock = false }, dec)
    }
}