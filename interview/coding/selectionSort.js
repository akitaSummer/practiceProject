let selectionSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j])[arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    return arr
}

console.log(selectionSort([7, 5, 3, 9, 1, 11]))