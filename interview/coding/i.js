// 数组展平
const myFlat = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            const left = arr.slice(0, i)
            const right = arr.slice(i + 1)
            arr = left.concat(arr[i], right)
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

var restoreIpAddresses = function(s) {
    const numsArr = s.split('')
    if (numsArr.length > 12 || numsArr.length === 0) {
        return []
    }
    const result = []

    function find(now, count, arr) {
        if (count === 4 && arr.length === 0) {
            result.push(now)
        } else if (count === 4 && arr.length > 0) {
            return
        } else if (count > 4) {
            return
        }
        const length = arr.length > 3 ? 3 : arr.length
        for (let i = 0; i < length; i++) {
            const nextArr = [...arr]
            const num = nextArr.splice(0, i + 1).join('')
            if (+num > 0 && num.slice(0, 1) === '0') {
                continue
            }
            if (+num === 0 && num.length > 1) {
                continue
            }
            if (+num > 255) {
                continue
            }
            const next = now + num + '.'
            find(next, count + 1, nextArr)
        }
    }
    find('', 0, numsArr)
    return result.map(item => item.slice(0, item.length - 1))
};

function rgba(a, b, c) {
    console.log(`$color1:        rgba(${(a * 255).toFixed()}, ${(b * 255).toFixed()}, ${(c * 255).toFixed()}, 1);`)
}

rgba(0.9586862922, 0.660125792, 0.8447988033)
rgba(0.8714533448, 0.723166883, 0.9342088699)
rgba(0.7458761334, 0.7851135731, 0.9899476171)
rgba(0.595767796, 0.8494840264, 1)
rgba(0.4398113191, 0.8953480721, 0.9796616435)
rgba(0.3484552801, 0.933657825, 0.9058339596)
rgba(0.4113925397, 0.9645707011, 0.8110389113)
rgba(0.5567936897, 0.9780793786, 0.6893508434)
rgba(0.8850132227, 0.9840424657, 0.4586077332)

var maxDepth = function(root) {
    if (root === null) {
        return 0
    }
    let result = -1

    function com(root, i) {
        if (root.left === null && root.right === null) {
            result = result < i ? i : result
        } else if (root.left === null) {
            com(root.right, i + 1)
        } else if (root.right === null) {
            com(root.left, i + 1)
        } else {
            com(root.left, i + 1)
            com(root.right, i + 1)
        }
    }
    com(root, 1)
    return result
};

const transArr = (arg) => {
    const result = []
    const com = (strs, arr) => {
        if (strs.length === 0) return
        let flag = false
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === strs[0]) {
                flag = true
                com(strs.slice(1), arr[i].child)
                break
            }
        }
        if (!flag) {
            const pushItem = {
                name: strs[0],
                child: []
            }
            arr.push(pushItem)
            com(strs.slice(1), pushItem.child)
        }
    }
    for (let i = 0; i < arg.length; i++) {
        com(arg[i], result)
    }
    return result
}

console.log(transArr(
    [
        ["a", "aa", "aaa", "aaaa"],
        ["b", "bb", "bbb"],
        ["a", "ab", "aba"],
        ["a", "aa", "aab"]
    ]))

const divingBoard = (a, b, k) => {
    let min, max
    if (a > b) {
        min = b
        max = a
    } else {
        min = a
        max = b
    }
    const result = new Array(max * k)
    result[min * k - 1] = min * k
    result[max * k - 1] = max * k
    const com = (now, min, max, num) => {
        if (num === 0) {
            if (now < max * k) {
                result[now - 1] = now
            }
            return
        } else {
            if (now + min < max * k) {
                com(now + min, min, max, num - 1)
            }
            if (now + max < max * k) {
                com(now + max, min, max, num - 1)
            }
        }
    }
    com(0, min, max, k)
    return result.filter(item => item !== undefined)
}

console.log(divingBoard(1, 100, 2))

const comStart = (arr) => {
    let result = arr[0]
    for (let i = 1; i < arr.length; i++) {
        const length = result.length > arr[i].length ? arr[i].length : result.length
        for (let j = 1; j < length; j++) {
            const one = result.slice(0, j)
            const twe = arr[i].slice(0, j)
            if (one === twe) {
                if (j === length - 1) {
                    result = result.slice(0, j + 1)
                } else {
                    continue
                }
            } else {
                result = result.slice(0, j - 1)
                break
            }
        }
    }
    return result
}

console.log(comStart(['flower', 'flow', 'flight']))

const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

console.log(bubbleSort([7, 5, 3, 9, 1, 11]))

const insertSort = (arr) => {
    const result = []
    let card = arr.shift()
    result.push(card)
    while (arr.length > 0) {
        card = arr.shift()
        for (let i = result.length - 1; i >= 0; i--) {
            if (result[i] < card) {
                result.splice(i + 1, 0, card)
                card = null
            }
            break
        }
        if (card !== null) {
            result.unshift(card)
        }
    }
    return result
}

console.log(insertSort([7, 5, 3, 9, 1, 11]))

const quickSort = (arr) => {
    if (arr.length <= 1) return arr
    const middle = arr.splice(Math.floor(arr.length / 2), 1)
    const left = []
    const right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > middle) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return quickSort(left).concat(middle, quickSort(right))
}

console.log(quickSort([7, 5, 3, 9, 1, 11]))

const mergeArr = (left, right) => {
    let result = []
    while (left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) {
            result.push(right[0])
            right.shift()
        } else {
            result.push(left[0])
            left.shift()
        }
    }
    if (left.length > 0) {
        result = result.concat(left)
    }
    if (right.length > 0) {
        result = result.concat(right)
    }
    return result
}

const mergeSort = (arr) => {
    if (arr.length <= 1) return arr
    const left = arr.splice(0, Math.floor(arr.length / 2))
    return mergeArr(mergeSort(left), mergeSort(arr))
}

console.log(mergeSort([7, 5, 3, 9, 1, 11]))

function myPromise(func) {
    this.state = 'PENDING'
    this.fullfillList = []
    this.rejectList = []
    this.value = null

    const resolve = (value) => {
        this.value = value
        this.state = 'FULLFILL'
        this.fullfillList.forEach(fn => {
            fn(this.value)
        })
    }

    const reject = (value) => {
        this.value = value
        this.state = 'REJECT'
        this.rejectList.forEach(fn => {
            fn(this.value)
        })
    }

    try {
        func(resolve, reject)
    } catch (e) {
        reject(e)
    }

}

myPromise.prototype.then = (resolve, reject) => {
    if (this.state === 'PENDING') {
        this.fullfillList.push(resolve)
    } else if (this.state === 'FULLFILL') {
        resolve(this.value)
    } else {
        reject(this.value)
    }
}

const jsonp = (url, data, callback) => {
    return new Promise((resolve, reject) => {
        url = url.indexOf('?') === -1 ? url + '?' : url + '&'
        window[callback] = (data) => {
            resolve(data)
        }
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            url = url + `${keys[i]}=${data[keys[i]]}&`
        }
        url = url + `callbacl=${callback}`
        const node = document.createElement('script')
        node.type = 'text/javascript'
        node.url = url
        document.body.appendChild(node)
    })
}

const ajax = (url, method, data) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status >= 200) {}
    }
    xhr.send(data)
}

const trim = (string) => {
    return string.replace(/^([ ]{0,})(.{0,})([ ]{0,})$/g, (s, $1, $2, $3) => {
        /^('rgb(')(.{0,})(')')$/g
        console.log($1, $2, $3)
        return $2
    })
}

console.log(trim('  a 1 2 '))

const delBAC = (str) => {
    const reg1 = /b/g
    const reg2 = /(ac)/g
    let result = str.replace(reg1, '')
    while (result.match(reg2)) {
        result = result.replace(reg2, '')
    }
    return result
}

console.log(delBAC('aaabbccc'))

const upload = (time) => {
    return new Promise((resolve, reject) => {
        let flag = true
        setTimeout(() => {
            flag = false;
            resolve()
        }, 3000)
        setTimeout(() => { if (flag) { reject() } }, time)
    }).then(() => console.log('resolve')).catch(() => console.log('reject'))
}

upload(2000)

const sortVersion = (arr) => {
    const com = (a, b) => {
        const aArr = a.split('.')
        const bArr = b.split('.')
        if (a.length > b.length) {
            const length = aArr.length - bArr.length
            for (let i = 0; i < length; i++) {
                bArr.push('0')
            }
        } else {
            const length = bArr.length - aArr.length
            for (let i = 0; i < length; i++) {
                aArr.push('0')
            }
        }
        for (let i = 0; i < aArr.length; i++) {
            if (Number(aArr[i]) > Number(bArr[i])) {
                return true
            } else if (Number(bArr[i]) > Number(aArr[i])) {
                return false
            }
        }
        return false
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (!com(arr[j], arr[j + 1])) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

console.log(sortVersion(['1.1.1.1.1.1', '6', '5.4.3', '2.3.1', '2.3.1.1']))

function Scheduler() {
    this.awaitList = []
    this.run = 0
    this.addTask = (time, str) => {
        const func = () => new Promise((resolve, reject) => {
            setTimeout(() => { resolve(str) }, time)
        }).then(() => {
            console.log(str)
            if (this.awaitList.length > 0) {
                fn = this.awaitList.shift()
                fn()
            } else {
                this.run--
            }
        })

        if (this.run < 2) {
            this.run++
                func()
        } else {
            this.awaitList.push(func)
        }

    }
}

const scheduler = new Scheduler()

scheduler.addTask(1000, 1)
scheduler.addTask(500, 2)
scheduler.addTask(300, 3)
scheduler.addTask(400, 4)

const removeDeb = (arr) => {
    const obj = {}
    for (let i = 0; i < arr.length; i++) {
        if (obj[arr[i]] === undefined) {
            obj[arr[i]] = {
                [typeof arr[i]]: true
            }
        } else if (!obj[arr[i]][typeof arr[i]]) {
            obj[arr[i]] = {
                [typeof arr[i]]: true
            }
        } else {
            arr.splice(i, 1)
            i--
        }
    }
    return arr
}

console.log(removeDeb([1, 2, 2, '1', '2', 3, 4, 4, 'test']))

// function Animal(color) {
//     this.color = color
// }

// Animal.prototype.move = function() {}

// function Dog(color, name) {
//     Animal.call(this, color)
//     this.name = name
// }

// function temp() {}

// temp.prototype = Animal.prototype

// Dog.prototype = new temp()

// Dog.prototype.constructor = Dog

// class Animal {
//     constructor(color) {
//         this.color = color
//     }
//     move() {}
// }

// class Dog extends Animal {
//     constructor(color, name) {
//         super(color)
//         this.name = name
//     }
//     say() {}
// }

// function myNew(func, ...args) {
//     const obj = Object.create(func.prototype)
//     func.call(obj, ...args)
//     return obj
// }

// "3[a2[c]]" => "accaccacc"

const decodeString = function(s) {
    const reg = /([1-9]{1}[0-9]{0,})\[([a-zA-Z]{1,})\]/g
    let str = s
    while (str.match(reg)) {
        str = str.replace(reg, (s, $1, $2) => {
            let result = ''
            for (let i = 0; i < Number($1); i++) {
                result += $2
            }
            return result
        })
    }
    return str
};

console.log(decodeString("3[a2[c]]"))