const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise() {
    this.state = PENDING
    this.value = null
    this.resolvedCallbacks = []
    this.rejecteedCallbacks = []

    const resolve = (value) => {
        if (this.state === PENDING) {
            this.state = RESOLVED
            this.value = value
            this.resolvedCallbacks.map(item => item(this.value))
        }
    }

    const reject = (value) => {
        if (this.state === PENDING) {
            this.state = REJECTED
            this.value = value
            this.rejecteedCallbacks.map(item => item(this.value))
        }
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }

    if (this.state === PENDING) {
        this.rejecteedCallbacks.push(onFulfilled)
        this.resolvedCallbacks.push(onRejected)
    } else if (this.state === REJECTED) {
        onFulfilled(this.value)
    } else {
        onRejected(this.value)
    }
}