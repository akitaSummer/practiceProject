const s = new Set([1, 2, 3, 4, 5])
const it = s.values()
console.log(it)

let val = null
while (!(val = it.next()).done) {
    console.log(val)
}