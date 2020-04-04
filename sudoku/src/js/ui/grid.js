"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 生成九宫格游戏
var sudoku_1 = __importDefault(require("../core/sudoku"));
var checker_1 = __importDefault(require("../core/checker"));
var jquery_1 = __importDefault(require("jquery"));
var Grid = /** @class */ (function () {
    function Grid(container) {
        this._$container = container;
    }
    Grid.prototype.build = function () {
        // const generator = new Generator()
        // generator.generate()
        // const matrix = generator.matrix
        var sudoku = new sudoku_1.default();
        sudoku.make();
        var matrix = sudoku.puzzleMatrix;
        var $cells = matrix.map(function (rowValues) { return rowValues.map(function (cellValue) { return jquery_1.default('<span>').addClass(cellValue ? 'fixed' : 'empty').text(cellValue); }); });
        var $divArray = $cells.map(function ($spanArray) { return jquery_1.default('<div>').addClass('row').append($spanArray); });
        this._$container.append($divArray);
    };
    Grid.prototype.layout = function () {
        var width = jquery_1.default('span:first', this._$container).width();
        jquery_1.default('span', this._$container)
            .height(width)
            .css({
            "line-height": width + "px",
            "font-size": width < 32 ? width / 2 + "px" : ""
        });
    };
    Grid.prototype.bindPopup = function (popupNumber) {
        this._$container.on("click", "span", function (e) {
            var $cell = jquery_1.default(e.target);
            if (!$cell.is('.fixed')) {
                popupNumber.popup($cell);
            }
        });
    };
    Grid.prototype.rebuild = function () {
        this._$container.empty();
        this.build();
        this.layout();
    };
    Grid.prototype.check = function () {
        var $rows = this._$container.children();
        var data = $rows.map(function (rowIndex, div) {
            return jquery_1.default(div).children()
                .map(function (colIndex, span) { return parseInt(jquery_1.default(span).text()); }) || 0;
        }).toArray().map(function ($data) { return $data.toArray(); });
        var checker = new checker_1.default(data);
        if (checker.check()) {
            return true;
        }
        else {
            var marks_1 = checker.matrixMarks;
            this._$container.children().each(function (rowIndex, div) {
                jquery_1.default(div).children().each(function (colIndex, span) {
                    var $span = jquery_1.default(span);
                    if ($span.is('.fixed') || marks_1[rowIndex][colIndex]) {
                        jquery_1.default(span).removeClass('error');
                    }
                    else {
                        jquery_1.default(span).addClass('error');
                    }
                });
            });
        }
    };
    Grid.prototype.reset = function () {
        this._$container.find('span:not(.fixed)')
            .removeClass('error mark1 mark2')
            .addClass('empty')
            .text(0);
    };
    Grid.prototype.clear = function () {
        this._$container.find('span.error').removeClass('error').text(0).addClass('empty');
    };
    return Grid;
}());
exports.default = Grid;
