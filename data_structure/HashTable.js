// 散列
function HashTable() {
    this.table = new Array(137)
    this.simpleHash = simpleHash
    this.betterHash = betterHash
    this.showDistro = showDistro
    this.put = put
    this.get = get
}

function simpleHash(data) {
    let total = 0
    for (let i = 0; i < data.length; i++) {
        total += data.charCodeAt(i)
    }
    return total % this.table.length
}

function betterHash(string) {
    const H = 37
    let total = 0
    for (let i = 0; i < string.length; i++) {
        total += string.charCodeAt(i) + H * total
    }
    total = total % this.table.length
    if (total < 0) {
        total += this.table.length - 1
    }
    return parseInt(total)
}

function put(key, data) {
    const pos = this.betterHash(key)
    this.table[pos] = data
}

function showDistro() {
    for (let i = 0; i < this.table.length; i++) {
        if (this.table[i] != undefined) {
            console.log(`${i}: ${this.table[i]}`)
        }
    }
}

function get(key) {
    return this.table[this.betterHash(key)]
}