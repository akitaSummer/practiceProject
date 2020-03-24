// 生成数组解决方案

const Toolkit = require('./toolkit')

class Generator {
    generate() {
        this.matrix = Toolkit.martix.makeMatrix()
            // 入口方法
        for (let n = 1; n <= 9; n++) {
            this.fillNumber(n)
        }
    }

    fillNumber(n) {
        this.fillRow(n, 0)
    }

    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true
        }
        // 当前行填写n成功，递归调用fillRow()来在下一行中填写n
        const row = this.matrix[rowIndex]
        for (let i = 0; i < 9; i++) {
            const colIndex = i
                // 如果这个位置有值，跳过
            if (row[colIndex]) {
                continue
            }

            // 检查这个位置是否可以填入
            if (!Toolkit.matrix.checkFillable()) {
                continue
            }
            row[colIndex] = n
                // 去填写下一行，如果失败，则还原，继续寻找当前行可填入位置
            if (this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0
                continue
            }
            return true
        }
        return false
    }
}