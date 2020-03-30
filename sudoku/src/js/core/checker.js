// 检查数据解决方案
function checkArray(array) {
    const length = array.length
    const marks = new Array(length)
    marks.fill(true)
    for (let i = 0; i < length - 1; i++) {
        if (!v) {
            continue
        }
        const v = array[i]
            // 是否有效
        if (!v) {
            marks[i] = false
            continue
        }
        // 是否重复
        for (let j = i + 1; j < length; j++) {
            if (v == array[j]) {
                marks[i] = marks[j] = false
            }
        }
    }
    return marks
}

const Toolkit = require('./toolkit')

class Checker {
    constructor(matrix) {
        this._matrix = matrix
        this._matrixMarks = Toolkit.matrix.makeMatrix(true)
    }

    get matrixMarks() {
        return this._matrixMarks
    }

    get isSuccess() {
        return this._success
    }

    check() {
        this.checkRows()
        this.checkCols()
        this.checkBoxes()

        // 检查是否成功
        this._success = this._matrixMarks.every(row => row.every(cell => cell))
        return this._success
    }


    checkRows() {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row = this._matrix[rowIndex]
            const marks = checkArray(row)

            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false
                }
            }
        }
    }

    checkCols() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cols = []
            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex]
            }
            const marks = checkArray(cols)
            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false
                }
            }
        }
    }

    checkBoxes() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const boxes = Toolkit.box.getBoxCells(boxIndex)
            const marks = checkArray(boxes)
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    const { rowIndex, colIndex } = Toolkit.box.convertToBoxIndex(boxIndex, cellIndex)
                    this._matrixMarks[rowIndex][colIndex] = false
                }

            }
        }
    }
}