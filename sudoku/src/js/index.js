"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../scss/main.scss");
var jquery_1 = __importDefault(require("jquery"));
var grid_1 = __importDefault(require("./ui/grid"));
var popupnumbers_1 = __importDefault(require("./ui/popupnumbers"));
var grid = new grid_1.default(jquery_1.default('#container'));
grid.build();
grid.layout();
var popupnumbers = new popupnumbers_1.default(jquery_1.default('#popupNumbers'));
grid.bindPopup(popupnumbers);
jquery_1.default('#check').on('click', function (e) {
    if (grid.check()) {
        alert('成功');
    }
});
jquery_1.default('#reset').on('click', function (e) {
    grid.reset();
});
jquery_1.default('#clear').on('click', function (e) {
    grid.clear();
});
jquery_1.default('#rebuild').on('click', function (e) {
    grid.rebuild();
});
