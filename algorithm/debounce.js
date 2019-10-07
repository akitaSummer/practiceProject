function debounce(func, delay = 300, I = null) {
    return (...args) => {
        clearInterval(I)
        I = setTimeout(func.bind(null, ...args), delay)
    }
}