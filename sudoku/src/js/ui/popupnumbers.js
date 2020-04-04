"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 处理弹出的操作面板
var $ = require('jquery');
var PopupNumbers = /** @class */ (function () {
    function PopupNumbers($panel) {
        var _this = this;
        this._$panel = $panel.hide().removeClass('hidden');
        this._$panel.on('click', 'span', function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass('mark1')) {
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass('mark1');
                }
                else {
                    $cell.removeClass('mark2').addClass('mark1');
                }
            }
            else if ($span.hasClass('mark2')) {
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass('mark2');
                }
                else {
                    $cell.removeClass('mark1').addClass('mark2');
                }
            }
            else if ($span.hasClass('empty')) {
                $cell.text(0)
                    .removeClass('mark1')
                    .removeClass('mark2')
                    .addClass('empty');
            }
            else {
                $cell.removeClass('empty').text($span.text());
            }
            _this._$panel.hide();
        });
    }
    PopupNumbers.prototype.popup = function ($cell) {
        this._$targetCell = $cell;
        var _a = $cell.position(), left = _a.left, top = _a.top;
        this._$panel.css({
            left: left + "px",
            top: top + "px"
        }).show();
    };
    PopupNumbers.prototype.hide = function () {
        this._$panel.hide();
    };
    return PopupNumbers;
}());
exports.default = PopupNumbers;
