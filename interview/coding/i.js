const single = (function() {
    let simple = null
    return function() {
        if (simple === null) {
            return {}
        } else {
            return simple
        }
    }
})()