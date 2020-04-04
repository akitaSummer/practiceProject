"use strict";
// 生成数组游戏
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. 生成完成的解决方案
// 2. 随机去除部分数据
var generator_1 = __importDefault(require("./generator"));
var Sudoku = /** @class */ (function () {
    function Sudoku() {
        var generator = new generator_1.default();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }
    Sudoku.prototype.make = function (level) {
        if (level === void 0) { level = 5; }
        this.puzzleMatrix = this.solutionMatrix.map(function (row) {
            return row.map(function (cell) { return Math.random() * 9 < level ? 0 : cell; });
        });
    };
    return Sudoku;
}());
exports.default = Sudoku;
