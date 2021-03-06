// 生成数组解决方案
import Toolkit from './toolkit'

export default class Generator {

    public matrix: Array<Array<number>> = [[0]]
    public orders: Array<Array<number>> = [[0]]

    generate() {
        while (!this.internalGenerate()) {}
    }

    internalGenerate() {
        this.matrix = Toolkit.martix.makeMatrix()
        this.orders = Toolkit.martix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.martix.shuffle(row))
            // 入口方法
        for (let n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) {
                return false
            }
        }
        return true
    }

    private fillNumber(n: number) {
        return this.fillRow(n, 0)
    }

    private fillRow(n: number, rowIndex: number) {
        if (rowIndex > 8) {
            return true
        }
        // 当前行填写n成功，递归调用fillRow()来在下一行中填写n
        const row = this.matrix[rowIndex]
        const orders = this.orders[rowIndex]
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            // const colIndex = i
            // 如果这个位置有值，跳过
            if (row[colIndex]) {
                continue
            }
            // 检查这个位置是否可以填入
            if (!Toolkit.martix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue
            }
            row[colIndex] = n
                // 去填写下一行，如果失败，则还原，继续寻找当前行可填入位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0
                continue
            }

            return true
        }
        return false
    }
}