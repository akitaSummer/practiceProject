function insertSort(ary) {
    let handle = []
    handle.push(ary[0])
    for (let i = 1; i < ary.length; i++) {
        let card = ary[i]
        console.log(card)
        let j = handle.length
        while (j > 0 && handle[j - 1] > card) {
            j--
        }
        handle.splice(j, 0, card)
    }
    return handle
}

console.log(insertSort([91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24]))