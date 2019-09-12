// 判断一个数是否是素数
function isPrime(num) {
    if (num <= 1) {
        return false
    }
    const n = Math.floor(Math.sqrt(num))
    for (let i = 2; i <= n; i++) {
        if (num % i === 0) {
            return false
        }
    }
    return true
}