// 列表
function List() {
    this.listSize = 0 // 列表元素个数
    this.pos = 0 // 列表的当前位置
    this.dataStore = [] // 初始化一个空数组来保存元素
    this.clear = clear // 清空列表中的所有元素
    this.find = find // 在列表中查找某一元素
    this.toString = toString // 返回列表的字符串形式
    this.insert = insert // 在现有元素后插入新元素
    this.append = append // 在列表的末尾添加新元素
    this.remove = remove // 从列表中删除元素
    this.front = front // 将列表的当前位置设移动到第一个元素
    this.end = end // 将列表的当前位置移动到最后一个元素-
    this.prev = prev // 将当前位置后移一位
    this.next = next // 将当前位置前移一位
    this.length = length // 返回列表中元素的个数
    this.currPos = currPos // 返回列表的当前位置
    this.getElement = getElement // 返回当前位置的元素
    this.moveTo = moveTo // 将当前位置移动到指定位置
    this.contains = contains //判断给定值是否在列表中
}

// 在列表的末尾添加新元素
function append(element) {
    this.dataStore[listSize++].push(element)
}

// 在列表中查找某一元素
function find(element) {
    for (let index = 0; index < this.dataStore.length; index++) {
        if (this.dataStore[index] === element) {
            return index
        }
    }
    return -1
}

// 从列表中删除元素
function remove(element) {
    const count = this.find(element)
    if (count >= 0) {
        this.dataStore.splice(count, 1)
        --this.pos
        return true
    }
    return false
}

// 返回列表中元素的个数
function length() {
    return this.listSize
}

// 返回列表的字符串形式
function toString() {
    return this.dataStore
}

// 向列表中插入一个元素
function insert(element, after) {
    const insertPos = this.find(after)
    if (insertPos >= 0) {
        this.dataStore.splice(after, 0, element)
        this.listSize++
        return true
    }
    return false
}

// 清空列表中所有的元素
function clear() {
    delete this.dataStore
    this.dataStore = []
    this.listSize = this.pos = 0
}

// 判断给定值是否在列表中
function contains(element) {
    for (let index = 0; index < this.dataStore.length; index++) {
        if (this.dataStore[index] === element) {
            return true
        }
    }
    return false
}

 // 将列表的当前位置设移动到第一个元素
function front() {
    this.pos = 0
}

 // 将列表的当前位置设移动到最后一个元素
 function end() {
     this.pos = this.listSize - 1
 }

 // 将当前位置后移一位
 function prev() {
     if (this.pos > 0) {
         --this.pos
     }
 }

 // 将当前位置前移一位
 function next() {
    if (this.pos < this.listSize) {
        ++this.pos
    }
}

// 返回列表的当前位置
function currPos() {
    return this.pos
}

// 将当前位置移动到指定位置
function move(position) {
    this.pos = position
}

// 返回当前位置的元素
function getElement() {
    return this.dataStore[this.pos]
}