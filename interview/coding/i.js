// 数组展平
const myFlat = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            const left = arr.splice(0, i)
            const right = arr.splice(1)
            arr = left.concat(arr[0], right)
            i--
        }
    }
    return arr
}

console.log(myFlat([1, 2, 3, [4, 5], 6, 7, [
    [8, 9], 10
]]))

// 手写reduce
Array.prototype.myReduce = function(fn, first) {
    for (let i = 0; i < this.length; i++) {
        first = fn(first, arr[i])
    }
    return first
}

const arr = [1, 2, 3]
console.log(arr.myReduce((prev, item) => prev + item, 0))

// 数组去重
const clearArr1 = (arr) => {
    return [...new Set(arr)]
}

const clearArr2 = (arr) => {
    const hash = {}
    for (let i = 0; i < arr.length; i++) {
        if (!hash[arr[i]]) hash[arr[i]] = true
    }
    return Object.keys(hash).map(item => +item)
}

console.log(clearArr1([1, 1, 2, 3, 3, 4, 5, 6, 6]))
console.log(clearArr2([1, 1, 2, 3, 3, 4, 5, 6, 6]))

// 高阶函数
const sum1 = (...args1) => {
    if (args1.length > 2) {
        return args1.reduce((prev, item) => prev + item, 0)
    } else {
        return function(...args2) {
            return sum1(...args1, ...args2)
        }
    }
}

const sum2 = (...args1) => {
    let nums = [...args1]
    const result = (...args2) => {
        if (args2.length === 0) return nums.reduce((prev, item) => prev + item, 0)
        nums = nums.concat([...args2])
        return result
    }
    return result
}

const sum3 = (...args1) => {
    let nums = [...args1]
    const result = function(...args2) {
        nums = nums.concat([...args2])
        return result
    }
    result.valueOf = function() {
        return nums.reduce((prev, item) => prev + item, 0)
    }
    return result
}

const sum4 = (...args1) => {
    let nums = [...args1]
    const result = (...args2) => {
        nums = nums.concat([...args2])
        return result
    }
    result.toString = () => {
        return nums.reduce((prev, item) => prev + item, 0)
    }
    return result
}

console.log(sum1(1, 2)(3))
console.log(sum2(1, 2)(3)())
console.log(sum3(1, 2)(3).valueOf())
console.log(sum4(1, 2)(3))

// 字符串全排列
const allSort = (str) => {
    const strArr = str.split('')
    const result = []

    function sort(prev, arr) {
        if (arr.length === 1) {
            result.push(prev + arr[0])
        } else {
            for (let i = 0; i < arr.length; i++) {
                const nextArr = [...arr]
                nextArr.splice(i, 1)
                sort(prev + arr[i], nextArr)
            }
        }
    }
    sort('', strArr)
    return result
}

console.log(allSort('abcd'))

// 合并区间
const merge = (arr) => {
    arr = arr.sort((a, b) => a[0] - b[0])

    function test(arr) {
        arrCopy = [...arr]
        for (let i = 1; i < arrCopy.length; i++) {
            if (arrCopy[i - 1][1] >= arrCopy[i][0]) {
                if (arrCopy[i - 1][1] < arrCopy[i][1]) {
                    arrCopy[i - 1][1] = arrCopy[i][1]
                }
                arrCopy.splice(i, 1)
                i--
            }
        }
        if (arr.length === arrCopy.length) {
            return arrCopy
        }
        return test(arrCopy)
    }
    return test(arr)
}

console.log(merge([
    [1, 3],
    [2, 6],
    [15, 18],
    [8, 10],
    [10, 11],
    [7, 8]
]))

// 观察者模式
const Observer = (function() {
    const _message = {}
    return {
        on: (type, fn) => {
            if (_message[type]) {
                _message[type].push(fn)
            } else {
                _message[type] = [fn]
            }
        },
        subscribe: (type, args) => {
            if (!_message[type]) return
            _message[type].forEach(fn => {
                fn(...args)
            })
        },
        off: (type, fn) => {
            if (!_message[type]) return
            _message[type] = _message[type].filter(item => item !== fn)
        }
    }
})()