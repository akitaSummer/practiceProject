// 列队
function Queue() {
    this.dataStore = []
    this.enqueue = enqueue // 向队尾添加一个元素
    this.dequeue = dequeue // 删除队首的元素
    this.front = front // 读取队首元素
    this.back = back // 读取队尾元素
    this.toString = toString // 显示队列内所有元素
    this.empty = empty // 判断队列是否为空
}

// 向队尾添加一个元素
function enqueue(element) {
    this.dataStore.push(element)
}

// 删除队首的元素
function dequeue() {
    return this.dataStore.shift()
}

// 读取队首元素
function front() {
    return this.dataStore[0]
}

// 读取队尾元素
function back() {
    return this.dataStore[this.dataStore.length - 1]
}

// 显示队列内所有元素
function toString() {
    let retStr = ''
    for (let i = 0; i < this.dataStore.length; i++) {
        retStr += this.dataStore[i] + '\n'
    }
    return retStr
}

// 判断队列是否为空
function empty() {
    if (this.dataStore.length === 0) {
        return true
    } else {
        return false
    }
}