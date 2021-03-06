// 检查数据解决方案

import Toolkit from './toolkit'
function checkArray(array: Array<number>): boolean[] {
    const length = array.length
    const marks = new Array(length)
    marks.fill(true)
    for (let i = 0; i < length - 1; i++) {
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


export default class Checker {

    private _matrix: Array<Array<number>>
    private _matrixMarks: boolean[][]
    private _success: boolean = false

    constructor(matrix: Array<Array<number>>) {
        this._matrix = matrix
        this._matrixMarks = Toolkit.martix.makeMatrix(true)
    }

    get matrixMarks(): boolean[][] {
        return this._matrixMarks
    }

    get isSuccess(): boolean {
        return this._success
    }

    check(): boolean {
        this.checkRows()
        this.checkCols()
        this.checkBoxes()

        // 检查是否成功
        this._success = this._matrixMarks.every((row: Array<Boolean>) => row.every((cell: Boolean) => cell))
        return this._success
    }


    private checkRows() {
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

    private checkCols() {
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

    private checkBoxes() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex)
            const marks = checkArray(boxes)
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex)
                    this._matrixMarks[rowIndex][colIndex] = false
                }

            }
        }
    }
}