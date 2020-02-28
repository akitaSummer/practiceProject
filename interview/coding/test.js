function add(num1, num2) {
    num1 = num1.split('')
    num2 = num2.split('')
    if (num1.length > num2.length) {
        const need = num1.length - num2.length
        for (let i = 0; i < need; i++) {
            num2.unshift('0')
        }
    } else {
        const need = num2.length - num1.length
        for (let i = 0; i < need; i++) {
            num1.unshift('0')
        }
    }
    let ten = 0
    const result = []
    for (let i = num1.length - 1; i >= 0; i--) {
        let resultNum = Number(num1[i]) + Number(num2[i]) + ten
        ten = 0
        if (resultNum >= 10 && i > 0) {
            ten = 1
            resultNum = resultNum - 10
        }
        result.unshift('' + resultNum)
    }
    return result.join('')
}

console.log(add('999999999', '1'))

function format(num) {
    const reg = /(\d{1,3})(?=(\d{3}))/g
    return (num + '').replace(reg, '$1,')
}

console.log(format(13456))

function deepClone(target) {
    let result
    if (Array.isArray(target)) {
        result = []
        for (let i of target) {
            if (i !== null && typeof i === 'object') {
                result.push(deepClone(i))
            } else {
                result.push(i)
            }
        }
    } else {
        result = {}
        for (let i in target) {
            if (target.hasOwnProperty(i)) {
                if (target[i] !== null && typeof target[i] === 'object') {
                    result[i] = deepClone(target[i])
                } else {
                    result[i] = target[i]
                }
            }
        }
    }
    return result
}

console.log(deepClone({
    age: 1,
    jobs: {
        first: "FE"
    },
    schools: [{
            name: "shenda"
        },
        {
            name: "shiyan"
        }
    ],
    arr: [
        [{
            value: "1"
        }],
        [{
            value: "2"
        }]
    ]
}))

function quickSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const mid = arr.splice(Math.floor(arr.length / 2), 1)
    const left = []
    const right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < mid[0]) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(mid.concat(quickSort(right)))
}

console.log(quickSort([1, 56, 23, 6, 534252, 343, 7, 32, 66]))

function ajax() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '', true)
    xhr.send()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success')
        }
    }
}

function merge(left, right) {
    let result = []
    while (left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) {
            const first = right.shift()
            result.push(first)
        } else {
            const first = left.shift()
            result.push(first)
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

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const left = arr.splice(0, Math.floor(arr.length / 2))
    const right = arr
    return merge(mergeSort(left), mergeSort(right))
}

console.log(mergeSort([1, 56, 23, 6, 534252, 343, 7, 32, 66]))

function curry(fn, ...args) {
    if (args.length === fn.length) {
        return fn.apply(this, args)
    } else {
        return function(...args2) {
            return curry(fn, ...args, ...args2)
        }
    }
}

function add(a, b, c) {
    return a + b + c
}

console.log(curry(add, 1)(2)(3))

function flatArr(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatArr(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}

console.log(flatArr([1, 2, 3, [44, 55, [33]]]))
console.log([1, 2, 3, [44, 55, [33]]].flat(Infinity))

function rabbit(n) {
    let result = [1, 0, 0]
    if (n === 0) {
        return 0
    } else if (n === 1) {
        return 1
    } else {
        for (let i = 1; i < n; i++) {
            let res2 = []
            for (let j = 0; j < 3; j++) {
                if (j === 0) {
                    res2[1] = result[0]
                } else if (j === 1) {
                    res2[2] = result[1] + result[2]
                } else {
                    res2[0] = res2[2]
                }
            }
            result = res2
        }
        return result.reduce((pre, item) => {
            return pre + item
        }, 0)
    }
}

function fi(n) {
    if (n === 1) {
        return 1
    } else if (n === 2) {
        return 1
    } else {
        return fi(n - 1) + fi(n - 2)
    }
}

console.log(rabbit(10))
console.log(fi(10))

function coin(n) {
    if (n > 990) {
        return 0
    } else if (n === 0) {
        return 1
    } else if (n > 0 && n <= 10) {
        let result = []
        for (let i = 0; i < n; i++) {
            let com = (990 - i) / (1000 - i)
            result.push(com)
        }
        return result.reduce((pre, item) => {
            return pre * item
        }, 1)
    } else {
        let result = []
        for (let i = 0; i < 10; i++) {
            let com = (990 - n + i + 1) / (1000 - i)
            result.push(com)
        }
        console.log(result)
        return result.reduce((pre, item) => {
            return pre * item
        }, 1)
    }
}

console.log(coin(11))