function Dictionary() {
    this.datatore = new Array()
    this.add = add
    this.find = find
    this.remove = remove
    this.showAll = showAll
    this.clear = clear
    this.count = count
}

function add(key, value) {
    this.datatore[key] = value
}

function find(key) {
    return this.datatore[key]
}

function remove(key) {
    delete this.datastore[key]
}

function showAll() {
    for (let key in Object.keys(this.datastore).sort()) {
        console.log(`${key}: ${this.datastore[key]}`)
    }
}

function count() {
    let n = 0
    for (let key in Object.keys(this.datastore)) {
        n++
    }
    return n
}

function clear() {
    for (let key in Object.keys(this.datastore)) {
        delete this.datastore[key]
    }
}