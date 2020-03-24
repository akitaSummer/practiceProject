// 生成九宫格游戏
const toolkit = require('../core/toolkit').martix

const $ = require('jquery')

class Grid {
    constructor(container) {
        this._$container = container
    }

    build() {
        const matrix = toolkit.makeMatrix()

        const $cells = matrix.map(rowValues => rowValues.map(cellValue => $('<span>').text(cellValue)))

        const $divArray = $cells.map($spanArray => $('<div>').addClass('row').append($spanArray))

        this._$container.append($divArray)
    }

    layout() {
        const width = $('span:first', this._$container).width()
        $('span', this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width/2}px` : ""
            })
    }
}

module.exports = Grid