let bubbleSort = (content) => {
    let arr = [...content]
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

let arr = [3, 4, 1, 2]
console.log(bubbleSort(arr))