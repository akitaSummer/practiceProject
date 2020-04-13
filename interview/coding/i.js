// function DistanceToHigher(height) {
//     let count = 0
//     const result = [0]
//     for (let i = 1; i < height.length; i++) {
//         for (let j = i - 1; j >= 0; j--) {
//             if (height[j] > height[i]) {
//                 result.push(i - j)
//                 break
//             }
//             if (j === 0) {
//                 result.push(0)
//             }
//         }
//     }
//     return result
// }

// console.log(DistanceToHigher([175, 179, 174, 163, 176, 177]))

function gcd(a, b) {
    let temp
    while (b !== 0) {
        temp = a % b
        a = b
        b = temp
    }
    return a
}

// function test(str) {
//     const content = str.split('\n')
//     const resultNums = content[0].split(' ').map(item => Number(item))
//     const result = new Array(resultNums[1])
//     for (let i = 0; i < result.length; i++) {
//         result[i] = new Array(resultNums[0] + 1)
//     }
//     const people = new Array(resultNums[0])
//     for (let i = 1, j = 0; i <= resultNums[0]; i++, j++) {
//         people[j] = content[i].split('')
//     }
//     const need = []
//     for (let i = resultNums[0] + 1; i < content.length - 1; i++) {
//         need.push(content[i].split(' '))
//     }
//     const needY = []
//     for (let i = 0; i < need.length; i++) {
//         if (need[i][2] === 'Y') {
//             needY.push(need[i])
//         }
//     }
//     const needN = []
//     for (let i = 0; i < need.length; i++) {
//         if (need[i][2] === 'N') {
//             needN.push(need[i])
//         }
//     }
//     const com = []
//     for (let i = 0; i < needY.length; i++) {
//         const res = [null, null, null]
//         res[Number(needY[i][0]) - 1] = people[Number(needY[i][0]) - 1][Number(needY[i][1]) - 1]
//         res[Number(needY[i][3]) - 1] = people[Number(needY[i][3]) - 1][Number(needY[i][4]) - 1]
//         res.push(needY[i][0] + needY[i][3])
//         com.push(res)
//     }
//     for (let i = 0; i < com.length; i++) {
//         for (let j = i + 1; j < com.length; j++) {
//             if (com[i]) {}
//             if (com[j][0] === com[i][0] || com[j][1] === com[i][0] || com[j][0] === com[i][1] || com[j][1] === com[i][1]) {
//                 com[i] = com[i].concat(com[j])
//                 com.splice(j, 1)
//                 i--
//                 break
//             }
//         }
//     }
//     for (let i = 0; i < com.length; i++) {
//         if (com[i].length > 3) {
//             com[i].splice(2, 1)
//             com[i].splice(4, 1)
//             com[i] = [...new Set(com[i])]
//         }
//     }
//     console.log(result, people, need, needY, needN, com)
// }

// function maxBoxes(boxes) {
//     // write code here
//     boxes = boxes.sort((a, b) => {
//         a = a.reduce((pre, item) => {
//             return pre * item
//         }, 1)
//         b = b.reduce((pre, item) => {
//             return pre * item
//         }, 1)
//         return a - b
//     })
//     let count = []
//     count[0] = 1
//     for (let i = 1; i < boxes.length; i++) {
//         if (boxes[i - 1][0] < boxes[i][0] && boxes[i - 1][1] < boxes[i][1] && boxes[i - 1][2] < boxes[i][2]) {
//             count[i] = count[i - 1] + 1
//         } else {
//             count[i] = count[i - 1]
//             boxes[i] = boxes[i - 1]
//         }
//     }
//     return count.pop()
// }

// console.log(maxBoxes([
//         [5, 6, 3],
//         [5, 4, 6],
//         [6, 6, 6]
//     ]))
// console.log(test('3 4\nABCD\nefgh\nIJKL\n1 1 Y 3 2\n1 2 N 2 2\n2 2 Y 3 4\n1 3 Y 2 3\n1 1 N 2 4\n3 1 Y 1 3\n0 0 N 0 0\n'))

// let input = ''

// while (line = readline()) {
//     input += line + '\n'
// }
// print(test(input))

// while (line = readline()) {
//     var lines = line.split(" ");
//     var a = parseInt(lines[0]);
//     var b = parseInt(lines[1]);
//     print(a + b);
// }

// var n = parseInt(readline());
// var ans = 0;
// for(var i = 0;i < n; i++){
//     lines = readline().split(" ")
//     for(var j = 0;j < lines.length; j++){
//         ans += parseInt(lines[j]);
//     }
// }
// print(ans);

// function test(num1, num2) {
//     const result = Number(num1) + Number(num2) + ''
//     const resultArr = result.split('')
//     let flag = 0
// for (let i = resultArr.length - 1; i >= 0; i--) {
//     resultArr[i] = resultArr[i] + flag
//     flag = 0
//     if (i >= 9) {
//         resultArr[i] = resultArr[i] - 9
//         flag = 1
//     }
//     if (i === 0 && flag === 1) {
//         resultArr.push(1)
//     }
// }
//     return resultArr.join('')
// }

function sumString(a, b) {
    let arrA = a + ''
    let arrB = b + ''
    arrA = arrA.split('')
    arrB = arrB.split('')
    const len = arrA.length - arrB.length
    let carry = 0
    if (len > 0) {
        for (let i = 0; i < len; i++) {
            arrB.unshift('0')
        }
    } else {
        for (let i = 0; i < Math.abs(len); i++) {
            arrA.unshift('0')
        }
    }
    const res = []
    for (let i = arrA.length - 1; i >= 0; i--) {
        let temp = +arrA[i] + (+arrB[i]) + carry
        if (temp >= 9) {
            carry = 1
            res.unshift((temp % 9 + ''))
        } else {
            carry = 0
            res.unshift((temp + ''))
        }
    }
    if (carry) {
        res.unshift(1 + '')
    }

    if (res.length === 1) {
        return res.join('')
    }
    return res.join('').replace(/^0/, '')
}

function add(num1, num2) {
    num1s = num1.split('.')
    num2s = num2.split('.')
    if (num1s[1] && num2s[1]) {
        let resultSm = sumString(num1s[1], num2s[1]).split('')
        let flag1 = '0'
        if (resultSm.length > num1s[1].split('').length && resultSm.length > num2s[1].split('').length) {
            flag1 = '1'
            resultSm.shift()
            resultSm = resultSm.join('')
        }
        let result = sumString(flag1, sumString(num1s[0], num2s[0]))
        console.log(result, resultSm)
        return result + '.' + resultSm
    } else if (num1s[1]) {
        let result = sumString(num1s[0], num2s[0])
        return result + '.' + num1s[1]
    } else if (num2s[1]) {
        let result = sumString(num1s[0], num2s[0])
        console.log(num1s[0], num2s[0])
        return result + '.' + num2s[1]
    } else {
        return sumString(num1s[0], num2s[0])
    }
}
// function test(num1, num2) {
//     const result = sumString(num1, num2)
//     return result
// }
console.log(add('0.1', '0.10'))