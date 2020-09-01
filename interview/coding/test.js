const turn2Coder = (arr) => {
    let coderList = []
    let count = 0
    const com = (i, j) => {
        if (arr[i - 1] && arr[i - 1][j]) arr[i - 1][j] = arr[i - 1][j] === 0 ? 0 : 2
        if (arr[i + 1] && arr[i + 1][j]) arr[i + 1][j] = arr[i + 1][j] === 0 ? 0 : 2
        if (arr[i][j - 1]) arr[i][j - 1] = arr[i][j - 1] === 0 ? 0 : 2
        if (arr[i][j + 1]) arr[i][j + 1] = arr[i][j + 1] === 0 ? 0 : 2
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 1) {
                let left = true
                let top = true
                let right = true
                let bottom = true
                if (arr[i - 1] && arr[i - 1][j]) left = arr[i - 1][j] === 0
                if (arr[i + 1] && arr[i + 1][j]) left = arr[i + 1][j] === 0
                if (arr[i][j - 1]) top = arr[i][j - 1] === 0
                if (arr[i][j + 1]) bottom = arr[i][j + 1] === 0
                if (top && right && left && bottom) return -1
            }
        }
    }
    while (arr.map(item => item.some(people => people === 1)).some(item => item)) {
        count++
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === 2) {
                    coderList.push({ i, j })
                }
            }
        }
        coderList.forEach(obj => com(obj.i, obj.j))
        coderList = []
    }
    return count
}
console.log(turn2Coder([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
]))