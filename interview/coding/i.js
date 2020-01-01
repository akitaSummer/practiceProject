function debounce(func, dec) {
    let I = 0
    return (...args) => {
        clearTimeout(I)
        I = setTimeout(func.bind(null, args), dec)
    }
}

function throttle(func, dec) {
    let lock = false
    return (...args) => {
        if (lock) {
            return
        }
        lock = true
        func.call(null, ...args)
        setTimeout(() => { lock = false }, dec)
    }
}

function interator_1(node) {
    console.log(node)
    if (node.children.length) {
        for (let i = 0; i < node.children.length; i++) {
            interator_1(node.children[i])
        }
    }
}

function interator_2(node) {
    const arr = []
    arr.push(node)
    while (arr.length > 0) {
        node = arr.shift()
        console.log(node)
        if (node.children.length) {
            for (let i = 0; i < node.children.length; i++) {
                arr.push(node.children[i])
            }
        }
    }
}

function bubbleSort(arr) {
    const result = [...arr]
    let temp
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length - i; j++) {
            if (result[j] > result[j + 1]) {
                temp = result[j]
                result[j] = result[j + 1]
                result[j + 1] = temp
            }
        }
    }
    return result
}

function insertSort(arr) {
    const result = []
    const hand = [...arr]
    result.push(hand[0])
    for (let i = 1; i < hand.length; i++) {
        card = hand[i]
        let j = result.length
        while (j > 0 && result[j - 1] > card) {
            j--
        }
        result.splice(j, 0, card)
    }
    return result
}

function selectionSort(arr) {
    const result = [...arr]
    let temp, min
    for (let i = 0; i < result.length; i++) {
        min = result[i]
        for (let j = i + 1; j < result.length; j++) {
            if (result[j] < min) {
                temp = result[j]
                result[j] = min
                min = temp
            }
        }
        result[i] = min
    }
    return result
}

function quickSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const result = [...arr]
    const middle = Math.floor(result.length / 2)
    const middleNum = result.splice(middle, 1)
    const left = []
    const right = []
    for (let i = 0; i < result.length; i++) {
        if (result[i] > middleNum) {
            right.push(result[i])
        } else {
            left.push(result[i])
        }
    }
    return quickSort(left).concat(middleNum, quickSort(right))
}

function merge(left, right) {
    const result = []
    while (left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) {
            result.push(right.shift())
        } else {
            result.push(left.shift())
        }
    }
    while (left.length > 0) {
        result.push(left.shift())
    }
    while (right.length > 0) {
        result.push(right.shift())
    }
    return result
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const arrCopy = [...arr]
    const right = arrCopy.splice(Math.floor(arrCopy.length / 2))
    return merge(mergeSort(arrCopy), mergeSort(right))
}

console.log(mergeSort([1, 342, 56, 2, 64, 32, 14, 687, 543, 23, 645, 93, 43]))

function ajax(url) {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {}
    }
    xhr.open('GET', url)
    xhr.send()
}

function Sup(name) {
    this.name = this.name
}

Sup.prototype.sayName = function() {
    console.log(this.name)
}

function creat(sub, parent) {
    const sup = Object.create(parent.prototype)
    sub.prototype = sup
    sub.prototype.constructor = sub
}

function Sub(name) {
    Sup.apply(this, name)
}
creat(Sub, Sup)

Function.prototype.myCall = function(obj, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }

    obj = obj || window

    const { fn } = obj

    obj.fn = this
    const arr = [...args]
    const result = obj.fn(...arr)
    obj.fn = fn
    return result
}

Function.prototype.myApply = function(obj, args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    obj = obj || window
    const { fn } = obj
    obj.fn = this
    let result
    if (Array.isArray(args)) {
        result = obj.fn(...args)
    } else {
        result = obj.fn()
    }
    obj.fn = fn
    return result
}

Function.prototype.myBind = function(obj, ...args1) {
    const that = this
    const args = [...args1]
    return function(...args2) {
        return that.apply(obj, args.concat(Array.from(args2)))
    }
}

function test(arg1, arg2) {
    console.log(arg1, arg2);
    console.log(this.a, this.b);
}

test.myBind({
        a: "a",
        b: "b"
    }, 1,
    2
)()