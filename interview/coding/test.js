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