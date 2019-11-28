let merge = (left, right) => {
    const result = []
    while (left.length && right.length) {
        if (left[0] > right[0]) {
            result.push(right.shift())
        } else {
            result.push(left.shift())
        }
    }
    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }
}

let mergeSort = (arr) => {
    if (arr.length < 2) {
        return arr
    }
    const middle = Math.floor(arr.length / 2)
    const left = arr.splice(0, middle)
    const right = arr.splice(middle)
    return merge(mergeSort(left), mergeSort(right))
}