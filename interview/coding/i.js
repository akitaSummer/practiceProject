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

// 发布订阅模式
const subscribe = (function() {
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

// 观察者模式
const Observer = (function() {
    let list = []
    return {
        add: (obj) => {
            list.push(obj)
        },
        remove: (obj) => {
            list = list.filter(item => item !== obj)
        },
        notify: () => {
            list.forEach(obj => obj.fn())
        }
    }
})()

// quene
function Quene() {
    this.quene = []
    this.task = function(time, fn) {
        this.quene.push({
            time,
            fn
        })
        return this
    }
    this.start = function() {
        if (this.quene.length === 0) return
        const obj = this.quene.shift()
        setTimeout(() => {
            obj.fn()
            this.start()
        }, obj.time)
    }
    this.start_test = function() {
        if (this.quene.length === 0) return
        const quene = this.quene
        async function fn() {
            for (let i = 0; i < quene.length; i++) {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        quene[i].fn()
                        resolve()
                    }, quene[i].time)
                })
            }
        }
        fn()
    }
}

// new Quene()
//     .task(1000, () => {
//         console.log(1)
//     })
//     .task(6000, () => {
//         console.log(2)
//     })
//     .task(1000, () => {
//         console.log(3)
//     })
//     .start_test()

// chain

function chain() {
    const list = []
    setTimeout(async() => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].type !== 'sleep') {
                list[i].fn()
            } else {
                await list[i].fn()
            }
        }
    }, 0)
    const obj = {
        eat: () => {
            list.push({
                type: 'eat',
                fn: () => { console.log('eat') }
            })
            return obj
        },
        work: () => {
            list.push({
                type: 'work',
                fn: () => { console.log('work') }
            })
            return obj
        },
        sleep: (time) => {
            list.push({
                type: 'sleep',
                fn: () => new Promise((resolve) => {
                    setTimeout(() => { resolve() }, time * 1000)
                })
            })
            return obj
        }
    }
    return obj
}


// chain().eat().sleep(5).work().eat().sleep(10).work()

// new
const myNew = (fn, ...args) => {
    const obj = Object.create(fn.prototype)
    const returnObj = fn.call(obj, ...args)
    return returnObj
}

// 千分符
const thousands = (str) => {
    const reverseStr = str.split('').reverse().join('')
    const reg = /([0-9]{3})/g
    const reverseStrRes = reverseStr.replace(reg, function($1) {
        return $1 + ','
    })
    const result = reverseStrRes.split('').reverse()
    if (result[0] === ',') {
        result.shift()
    }
    return result.join('')
}

console.log(thousands('100000'))

// leetcode 001
const twoSum = (nums, target) => {
    const arr = []
    for (let i = 0; i < nums.length; i++) {
        if (arr[nums[i]] === undefined) {
            arr[nums[i]] = [i]
        } else {
            arr[nums[i]].push(i)
        }
    }
    for (let i = 0; i < nums.length; i++) {
        const j = target - nums[i]
        if (j === nums[i] && arr[j].length > 1) {
            return [i, arr[j][1]]
        } else if (j !== nums[i] && arr[j] !== undefined) {
            return [i, arr[j][0]]
        }
    }
}

// 斐波那契
const fibonacci_1 = (n, a1 = 1, a2 = 1) => {
    if (n <= 2) return a2
    return fibonacci_1(n - 1, a2, a1 + a2)
}

const fibonacci_2 = (n) => {
    if (n <= 2) return 1
    return fibonacci_2(n - 1) + fibonacci_2(n - 2)
}

console.log(fibonacci_1(5), fibonacci_2(5))

// ajax
// const xhr = new XMLHttpRequest()

// xhr.open('GET', 'www.baidu.com', true)

// xhr.onreadystatechanges = () => {
//     if (xhr.readystate === 4 && xhr.status === 200) {}
// }

// xhr.send()

// function ajax({ url, method, data, timeout, success, error }) {
//     const xhr = new XMLHttpRequest()
//     xhr.open(url, method, true)
//     xhr.send(data)
//     return new Promise((resolve, reject) => {
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 resolve()
//             } else {
//                 reject()
//             }
//         }
//         if (timeout) {
//             setTimeout(() => {
//                 reject()
//             }, timeout)
//         }
//     }).then(() => {
//         success()
//     }).catch(() => {
//         error()
//     })
// }

function generateId() {
    let i = -1
    return () => {
        return ++i
    }
}

let generator = generateId();

var a = generator(); // 输出0
console.log(a)
var b = generator(); // 输出1
console.log(b)
generator(); // 输出2

const isBalanced = (root) => {
    if (root === null) return
    return Math.abs(dep(root.left) - dep(root.right)) < 2 && isBalanced(root.left) && isBalanced(root.right)
}

const dep = (root) => {
    if (root === null) return
    return 1 + Math.max(dep(root.left), dep(root.right))
}

const objCompare = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1).sort((a, b) => a.charCodeAt() - b.charCodeAt())
    const obj2Keys = Object.keys(obj2).sort((a, b) => a.charCodeAt() - b.charCodeAt())
    if (JSON.stringify(obj1Keys) !== JSON.stringify(obj2Keys)) {
        return false
    } else {
        for (let i = 0; i < obj1Keys.length; i++) {
            const key = obj1Keys[i]
            const obj1Value = obj1[key]
            const obj2Value = obj2[key]
            if (obj1Value !== obj2Value) {
                if (typeof obj1Value !== 'object' && typeof obj2Value !== 'object') {
                    return false
                } else if (typeof obj1Value !== 'object') {
                    return false
                } else if (typeof obj2Value !== 'object') {
                    return false
                } else {
                    if (!objCompare(obj1Value, obj2Value)) return false
                }
            }
        }
        return true
    }
}

console.log(objCompare({
    a: 1,
    b: '2',
    c: {
        d: null,
        e: undefined,
        f: [1, 2]
    }
}, {
    a: 1,
    b: "2",
    c: {
        d: null,
        e: undefined,
        f: [1, 2]
    }
}))
