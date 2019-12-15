function bubbleSort(arr) {
    let result = [...arr]
    let temp
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length - i; j++) {
            if (result[j] > result[j + 1]) {
                temp = result[j + 1]
                result[j + 1] = result[j]
                result[j] = temp
            }
        }
    }
    return result
}

function insertSort(arr) {
    const result = [...arr]
    const handle = []
    handle.push(result[0])
    for (let i = 1; i < result.length; i++) {
        const j = handle.length
        while (J > 0 && result[i] < handle[j - 1]) {
            j--
        }
        handle.splice(j, 0, result[i])
    }
    return handle
}

function selectionSort(arr) {
    const result = [...arr]
    let temp
    for (let i = 0; i < result.length; i++) {
        let min = result[i]
        for (let j = i + 1; j < result.length; j++) {
            if (result[j] < min) {
                temp = min
                min = result[j]
                result[j] = min
            }
        }
    }
    return result
}

function quickSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const arrCopy = [...arr]
    const middle = arrCopy.splice(Math.floor(arrCopy.length / 2), 1)
    const right = []
    const left = []
    for (let i = 0; i < arrCopy.length; i++) {
        if (arrCopy[i] < middle) {
            left.push(arrCopy[i])
        } else {
            right.push(arrCopy[i])
        }
    }
    return quickSort(left).concat(middle, quickSort(right))
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const arrCopy = [...arr]
    const left = arrCopy.slice(0, Math.floor(arrCopy.length / 2))
    const right = arrCopy.slice(Math.floor(arrCopy.length / 2))
    return mergeSort(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    const result = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }
    return result
}

function Parent(name) {
    this.name = name
}

Parent.prototype.getName = function() {
    console.log(this.name)
}

function creatObject(obj) {
    function F() {}
    F.prototype = obj.prototype
    return new F()
}

function prototype(child, parent) {
    child.prototype = creatObject(parent)
    child.prototype.constructor = child
}

function Child(name) {
    Parent.call(this, name)
    prototype(Child, Parent)
}