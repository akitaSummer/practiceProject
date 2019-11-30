const quickSort = (arr) => {
    if (arr.length < 2) {
        return arr
    }
    const arrCopy = [...arr]
    const middle = arrCopy.splice(Math.floor(arr.length / 2), 1)
    const left = [],
        right = []
    for (let i = 0; i < arrCopy.length; i++) {
        if (arrCopy[i] > middle) {
            right.push(arrCopy[i])
        } else {
            left.push(arrCopy[i])
        }
    }
    return quickSort(left).concat(middle, quickSort(right))
}