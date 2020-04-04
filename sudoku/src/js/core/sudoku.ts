// 生成数组游戏

// 1. 生成完成的解决方案
// 2. 随机去除部分数据

import Generator from './generator'

export default class Sudoku {
    constructor() {
        const generator = new Generator()
        generator.generate()
        this.solutionMatrix = generator.matrix
    }

    make(level = 5) {
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell)
        })
    }
}