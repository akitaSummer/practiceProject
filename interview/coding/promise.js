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

myPromiseAll = (arr) => {
    const list = []
    let count = 0
    let back = null
    const result = new Promise((resolve, reject) => {
        back = resolve
    })
    for (let i = 0; i < arr.length; i++) {
        if (!(arr[i] instanceof Promise)) {
            arr[i] = Promise.resolve(arr[i])
        }
        arr[i].then((data) => {
            list.push(data)
            count++
            if (count === arr.length) {
                back(list)
            }
        })
    }
    return result
}

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 6000, 'foo');
});

myPromiseAll([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
});

myPromiseRace = (arr) => {
    let back = null
    const result = new Promise((resolve, reject) => {
        back = resolve
    })
    for (let i = 0; i < arr.length; i++) {
        if (!(arr[i] instanceof Promise)) arr[i] = Promise.resolve(arr[i])
        arr[i].then((data) => {
            back(data)
        })
    }
    return result
}

myPromiseRace([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
});