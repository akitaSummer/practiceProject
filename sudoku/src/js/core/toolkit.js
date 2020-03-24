// 矩阵和数组工具
matrixToolkit = {
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
    checkFillable() {
        return true
    }
}

// 宫坐标系工具

const boxToolit = {}

module.exports = class Toolkit {

    // 矩阵和数组相关的工具
    static get martix() {
        return matrixToolkit
    }


    // 坐标系相关的工具
    static get box() {
        return boxToolit
    }
}