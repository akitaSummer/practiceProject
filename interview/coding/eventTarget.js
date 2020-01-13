class TargetEvent {
    constructor() {
        this.listenters = {}
    }

    on = (type, callback) => {
        if (!this.listenters[type]) {
            this.listenters[type] = []
        }
        this.listenters[type].push(callback)
    }

    once = (type, callback) => {
        if (!this.listenters[type]) {
            this.listenters[type] = []
        }
        callback._once = true
        this.listenters[type].push(callback)
    }

    off = (type, callback) => {
        const listenters = this.listenters[type]
        const index = listenters.indexOf(callback)
        listenters.splice(index, 1)
        if (listenters.length === 0) {
            delete listenters
        }
    }

    trigger = (event) => {
        const { type, target } = event
        const listenters = this.listenters[type]
        listenters.forEach(element => {
            element(target)
            if (element._once) {
                this.off(type, element)
            }
        });
    }
}