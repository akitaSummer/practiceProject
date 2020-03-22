import '../scss/main.scss'

import $ from 'jquery'

const toolkit = require('./toolkit')

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

const grid = new Grid($('#container'))
grid.build()
grid.layout()