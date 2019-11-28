let insertSort = (arr) => {
    let handle = []
    handle.push(arr[0])
    for (let i = 1; i < arr.length; i++) {
        let card = arr[i]
        let j = handle.length
        while (j > 0 && handle[j - 1] > card) {
            j--
        }
        handle.splice(j, 0, card)
    }
    return handle
}