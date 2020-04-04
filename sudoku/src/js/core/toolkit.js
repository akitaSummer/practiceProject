"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 矩阵和数组工具
matrixToolkit = {
    makeRow: function (v) {
        if (v === void 0) { v = 0; }
        var arr = new Array(9);
        arr.fill(v);
        return arr;
    },
    makeMatrix: function (v) {
        var _this = this;
        if (v === void 0) { v = 0; }
        return Array.from({ length: 9 }, function () { return _this.makeRow(v); });
    },
    shuffle: function (array) {
        var _a;
        for (var i = 0; i < array.length - 1; i++) {
            var j = Math.floor(Math.random() * (array.length - i));
            _a = [array[i], array[j]], array[j] = _a[0], array[i] = _a[1];
        }
        return array;
    },
    checkFillable: function (martix, n, rowIndex, colIndex) {
        var row = martix[rowIndex];
        var column = this.makeRow().map(function (v, i) { return martix[i][colIndex]; });
        var boxIndex = boxToolit.convertToBoxIndex(rowIndex, colIndex).boxIndex;
        var box = boxToolit.getBoxCells(martix, boxIndex);
        for (var i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) {
                return false;
            }
        }
        return true;
    }
};
// 宫坐标系工具
var boxToolit = {
    convertToBoxIndex: function (rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function (boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    },
    getBoxCells: function (matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }
};
var Toolkit = /** @class */ (function () {
    function Toolkit() {
    }
    Object.defineProperty(Toolkit, "martix", {
        // 矩阵和数组相关的工具
        get: function () {
            return matrixToolkit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toolkit, "box", {
        // 坐标系相关的工具
        get: function () {
            return boxToolit;
        },
        enumerable: true,
        configurable: true
    });
    return Toolkit;
}());
exports.default = Toolkit;
