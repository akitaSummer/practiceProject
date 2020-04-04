"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 检查数据解决方案
function checkArray(array) {
    var length = array.length;
    var marks = new Array(length);
    marks.fill(true);
    for (var i = 0; i < length - 1; i++) {
        var v = array[i];
        // 是否有效
        if (!v) {
            marks[i] = false;
            continue;
        }
        // 是否重复
        for (var j = i + 1; j < length; j++) {
            if (v == array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}
var Toolkit = require('./toolkit');
var Checker = /** @class */ (function () {
    function Checker(matrix) {
        this._matrix = matrix;
        this._matrixMarks = Toolkit.martix.makeMatrix(true);
    }
    Object.defineProperty(Checker.prototype, "matrixMarks", {
        get: function () {
            return this._matrixMarks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checker.prototype, "isSuccess", {
        get: function () {
            return this._success;
        },
        enumerable: true,
        configurable: true
    });
    Checker.prototype.check = function () {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();
        // 检查是否成功
        this._success = this._matrixMarks.every(function (row) { return row.every(function (cell) { return cell; }); });
        return this._success;
    };
    Checker.prototype.checkRows = function () {
        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
            var row = this._matrix[rowIndex];
            var marks = checkArray(row);
            for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    };
    Checker.prototype.checkCols = function () {
        for (var colIndex = 0; colIndex < 9; colIndex++) {
            var cols = [];
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }
            var marks = checkArray(cols);
            for (var rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    };
    Checker.prototype.checkBoxes = function () {
        for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
            var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
            var marks = checkArray(boxes);
            for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    var _a = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex), rowIndex = _a.rowIndex, colIndex = _a.colIndex;
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    };
    return Checker;
}());
exports.default = Checker;
