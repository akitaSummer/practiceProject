interface IBoxCoord {
    boxIndex: number,
    cellIndex: number
}

interface IRowColCoord {
    rowIndex: number,
    colIndex: number
}


// 矩阵和数组工具
class matrixToolkit {

    static makeRow(): number[]
    static makeRow<T>(v: T): T[]
    static makeRow(v: any = 0): any[] {
        const arr = new Array(9)
        arr.fill(v)
        return arr
    }

    static makeMatrix(): number[][]
    static makeMatrix<T>(v: T): T[][]
    static makeMatrix(v: any = 0) {
        return Array.from({ length: 9 }, () => this.makeRow(v))
    }

    static shuffle<T>(array: T[]): T[] {
        for (let i = 0; i < array.length - 1; i++) {
            const j = Math.floor(Math.random() * (array.length - i));
            [array[j], array[i]] = [array[i], array[j]]
        }
        return array
    }


    static checkFillable(martix: Array<Array<number>>, n: number, rowIndex: number, colIndex: number): boolean {
        const row = martix[rowIndex]
        const column = this.makeRow().map((v, i) => martix[i][colIndex])
        const { boxIndex } = boxToolit.convertToBoxIndex(rowIndex, colIndex)
        const box = boxToolit.getBoxCells(martix, boxIndex)
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) {
                return false
            }

        }
        return true
    }
}

// 宫坐标系工具

class boxToolit {
    static convertToBoxIndex(rowIndex: number, colIndex: number): IBoxCoord {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    }
    static convertFromBoxIndex(boxIndex: number, cellIndex: number): IRowColCoord {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
    static getBoxCells(matrix: Array<Array<number>>, boxIndex: number): number[] {
        const startRowIndex = Math.floor(boxIndex / 3) * 3
        const startColIndex = boxIndex % 3 * 3
        const result = []
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3)
            const colIndex = startColIndex + cellIndex % 3
            result.push(matrix[rowIndex][colIndex])
        }
        return result
    }
}

export default class Toolkit {

    // 矩阵和数组相关的工具
    static get martix() {
        return matrixToolkit
    }


    // 坐标系相关的工具
    static get box() {
        return boxToolit
    }
}

