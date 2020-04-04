"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 生成数组解决方案
var toolkit_1 = __importDefault(require("./toolkit"));
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.generate = function () {
        while (!this.internalGenerate()) { }
    };
    Generator.prototype.internalGenerate = function () {
        this.matrix = toolkit_1.default.martix.makeMatrix();
        this.orders = toolkit_1.default.martix.makeMatrix()
            .map(function (row) { return row.map(function (v, i) { return i; }); })
            .map(function (row) { return toolkit_1.default.martix.shuffle(row); });
        // 入口方法
        for (var n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) {
                return false;
            }
        }
        return true;
    };
    Generator.prototype.fillNumber = function (n) {
        return this.fillRow(n, 0);
    };
    Generator.prototype.fillRow = function (n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }
        // 当前行填写n成功，递归调用fillRow()来在下一行中填写n
        var row = this.matrix[rowIndex];
        var orders = this.orders[rowIndex];
        for (var i = 0; i < 9; i++) {
            var colIndex = orders[i];
            // const colIndex = i
            // 如果这个位置有值，跳过
            if (row[colIndex]) {
                continue;
            }
            // 检查这个位置是否可以填入
            if (!toolkit_1.default.martix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }
            row[colIndex] = n;
            // 去填写下一行，如果失败，则还原，继续寻找当前行可填入位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;
    };
    return Generator;
}());
exports.default = Generator;
