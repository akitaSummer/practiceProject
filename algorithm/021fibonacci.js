function *fibonacci() {
    let a = 1, b = 2
    yield a
    yield b
    while (true) {
        const t = b
        b = a + b
        a = t
        yield b
    }
}

const it = fibonacci()
const feb10 = Array.from(Array(10), it.next).map(x => x.value)
console.log(feb10)