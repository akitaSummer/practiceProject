function quickSort(arr) {
    if (arr.length <= 1) return arr
    const arrCopy = [...arr]
    const middle = arrCopy.splice(Math.floor(arrCopy.length / 2), 1)
    const right = [],
        left = []
    for (let i = 0; i < arrCopy.length; i++) {
        const test = arrCopy[i]
        if (test < middle[0]) {
            left.push(test)
        } else {
            right.push(test)
        }
    }
    return quickSort(left).concat(middle, quickSort(right))
}
console.log(quickSort([5, 7, 2, 9, 3, 8, 4, 7, 1]))