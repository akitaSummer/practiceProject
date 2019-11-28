let selectionSort = (arr) => {
    let minIndex, temp
    for (let i = 0; i < arr.length; i++) {
        minIndex = arr[i]
        for (let j = i + 1; j < arr.length; j++) {
            if (minIndex > arr[j]) {
                minIndex = arr[j]
            }
        }
        temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
    }
    return arr
}