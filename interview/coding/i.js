function flatArr(arr, n = 1) {
    let result = [...arr]
    const arrs = []
    if (n <= 0) {
        return result
    } else {
        for (let i = 0; i < result.length; i++) {
            if (Array.isArray(result[i])) {
                const left = result.splice(0, i)
                const middle = result.shift()
                arrs.push(left)
                arrs.push(middle)
                i = -1
            }
        }
        result = arrs.reduce((pre, item) => {
            return pre.concat(item)
        }, [])

        if (!result.some((item) => Array.isArray(item))) {
            return result
        }

        return flatArr(result, n - 1)
    }
}



console.log(flatArr([1, 2, 3, [11, 22, [33]],
    [111, 222, [333]]
], 1))