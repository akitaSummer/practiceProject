function debounce(func, delay = 500, I = null) {
    return function(...args) {
        clearTimeout(I)
        I = setTimeout(func.bing(null, ...args), delay)
    }
}