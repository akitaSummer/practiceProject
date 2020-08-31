class Task {
    constructor() {
        this.list = []
        setTimeout(async() => {
            for (let i = 0; i < this.list.length; i++) {
                await new Promise((resolve, reject) => {
                    const item = this.list[i]
                    if (item.type === 'sleep') {
                        setTimeout(() => {
                            resolve()
                        }, item.value)
                    } else {
                        console.log(item.value)
                        resolve()
                    }
                })
            }
        }, 0)
        this.list = []
    }
    sleep(time) {
        this.list.push({ type: 'sleep', value: time })
        return this
    }
    print(string) {
        this.list.push({ type: 'print', value: string })
        return this
    }
}

(new Task()).print('hello').sleep(1000).print('world')