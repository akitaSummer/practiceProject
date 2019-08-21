// 栈
function Stack() {
    this.dataStore = [] // 初始化一个空数组来保存元素
    this.top = 0 // 栈中元素个数
    this.push = push // 压栈
    this.pop = pop // 弹栈
    this.peek = peek // 栈顶元素
    this.clear = clear // 清空栈
    this.length = length // 栈的长度
}

// 压栈
function push(element) {
    this.dataStore[this.top++] = element
}

// 弹栈
function pop() {
    return this.dataStore[--this.top]
}

// 栈顶元素
function peek() {
    return this.dataStore[this.top - 1]
}

// 清空栈
function clear() {
    this.top = 0
}

// 栈的长度
function length() {
    return this.pop
}
