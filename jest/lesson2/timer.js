export default (callback) => {
    setTimeout(() => {
        callback()
        setTimeout(() => {
            callback()
        }, 3000)
    }, 6000)
}