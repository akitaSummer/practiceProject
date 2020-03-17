class eventTarget {
    constructor() {
        this.listeners = {}
    }

    on(type, callback) {
        if (this.listeners[type] === undefined) {
            this.listeners[type] = [callback]
        } else if (this.listeners[type].indexOf(callback) !== -1) {
            return
        } else {
            this.listeners[type].push(callback)
        }
    }

    once(type, callback) {
        callback._once = true
        if (this.listeners[type] === undefined) {
            this.listeners[type] = [callback]
        } else if (this.listeners[type].indexOf(callback) !== -1) {
            return
        } else {
            this.listeners[type].push(callback)
        }
    }

    off(type, callback) {
        if (this.listeners[type] === undefined) {
            return
        } else if (this.listeners[type].indexOf(callback) !== -1) {
            return
        } else {
            this.listeners[type].splice(this.listeners[type].indexOf(callback), 1)
        }
    }

    trigger({ type, target }) {
        this.listeners[type] && this.listeners[type].map((callback, i) => {
            callback(target)
            if (callback._once) {
                this.listeners[type].splice(i, 1)
            }
        })
    }
}

console.log(test(obj1), test(obj1) === obj1)