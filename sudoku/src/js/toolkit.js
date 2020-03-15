module.exports = {
    makeRow(v = 0) {
        const arr = new Array(9)
        arr.fill(v)
        return arr
    },

    makeMatrix(v = 0) {
        return Array.from({ length: 9 }, () => this.makeRow(v))
    },

    shuffle(array) {
        for (let i = 0; i < array.length - 1; i++) {
            const j = Math.floor(Math.random() * (array.length - i));
            [array[j], array[i]] = [array[i], array[j]]
        }
        return array
    },
    check(arr, x, y) {
        const rowArr = arr[y]
        const colArr = []
        for (let i = 0; i < 9; i++) {
            colArr.push(arr[i][x])
        }
        const sudokuArr = []
        const x0 = Math.floor(x / 3) * 3
        const y0 = Math.floor(y / 3) * 3
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                sudokuArr.push(arr[y0 + j][x0 + i])
            }
        }
    }
}