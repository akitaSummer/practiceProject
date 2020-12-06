class test {
    constructor() {
        this.middleware = []
    }
    use(fn) {
        this.middleware.push(fn)
    }
    callback() {
        let i = -1
        const next = async() => {
            i++
            await this.middleware[i](null, next)
        }
        next()
    }
}

const app = new test()

app.use(async(ctx, next) => {
    console.log(1)
    await next()
    console.log(2)
})

app.use(async(ctx, next) => {
    console.log(3)
    await next()
    console.log(4)
})

app.use(async(ctx) => {
    console.log('success')
})

app.callback()