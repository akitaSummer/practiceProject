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
            arrB.unshift('0')
        }
    }
    const res = []
    for (let i = arrA.length - 1; i >= 0; i--) {
        let temp = +arrA[i] + (+arrB[i]) + carry
        if (temp >= 10) {
            carry = 1
            res.unshift((temp + '')[1])
        } else {
            carry = 0
            res.unshift((temp + ''))
        }
    }
    return res.join('').replace(/^0/, '')
}