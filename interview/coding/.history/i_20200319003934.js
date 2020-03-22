function test(arr) {
    if (arr.length <= 1) {
        return arr
    }
    const middle = arr.splice(Math.floor(arr.length / 2), 1)
    const left = []
    const right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= middle[0]) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return test(left).concat(middle, test(right))
}

console.log(test([1, 23, 12, 34, 2423, 32, 44]))