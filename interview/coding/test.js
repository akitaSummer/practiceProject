function myPromise(fn) {
    this.state = 'padding'
    this.value = null
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    resolve = (value) => {
        if (this.state === 'padding') {
            this.state = 'resolve'
            this.value = value
            this.resolveCallbacks.forEach(item => item(value))
        }
    }
    reject = (value) => {
        if (this.state === 'padding') {
            this.state = 'reject'
            this.value = value
            this.rejectCallbacks.forEach(item => item(value))
        }
    }
    try {
        fn(resolve, reject)
    } catch {
        reject()
    }
}

myPromise.prototype.then = (fn) => {
    if (this.state === 'padding') {
        this.resolveCallbacks.push(fn)
    } else {
        fn(this.value)
    }
}