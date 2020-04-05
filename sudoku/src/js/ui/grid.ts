// 生成九宫格游戏
import Sudoku from '../core/sudoku'
import Checker from '../core/checker'

import $ from 'jquery'
import PopupNumbers from './popupnumbers'

class Grid {

    private _$container: JQuery<HTMLElement>

    constructor(container: JQuery<HTMLElement>) {
        this._$container = container
    }

    build() {
        // const generator = new Generator()
        // generator.generate()
        // const matrix = generator.matrix

        const sudoku = new Sudoku()
        sudoku.make()
        const matrix = sudoku.puzzleMatrix

        const $cells: Array<Array<JQuery<HTMLElement>>> = matrix.map((rowValues: Array<number>) => rowValues.map(cellValue => $('<span>').addClass(cellValue ? 'fixed' : 'empty').text(cellValue)))

        const $divArray = $cells.map(($spanArray: Array<JQuery<HTMLElement>>) => $('<div>').addClass('row').append($spanArray))

        this._$container.append($divArray)
    }

    layout() {
        const width: number | undefined = $('span:first', this._$container).width()
        if (typeof width === 'number') {
            $('span', this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width/2}px` : ""
            })
        }
    }

    bindPopup(popupNumber: PopupNumbers) {
        this._$container.on("click", "span", (e: Event): void => {
            const target: any = e.target
            const $cell: JQuery<HTMLElement> = $(target)
            if (!$cell.is('.fixed')) {
                popupNumber.popup($cell)
            }
        })
    }

    rebuild() {
        this._$container.empty()
        this.build()
        this.layout()
    }

    check() {
        const $rows = this._$container.children()
        const data = $rows.map((rowIndex, div) => {
            return $(div).children()
                .map((colIndex, span) => parseInt($(span).text())) || 0
        }).toArray().map($data => $data.toArray())

        const checker = new Checker(data)

        if (checker.check()) {
            return true
        } else {
            const marks = checker.matrixMarks
            this._$container.children().each((rowIndex, div) => {
                $(div).children().each((colIndex, span) => {
                    const $span = $(span)
                    if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
                        $(span).removeClass('error')
                    } else {
                        $(span).addClass('error')
                    }
                })
            })
        }
    }

    reset() {
        this._$container.find('span:not(.fixed)')
            .removeClass('error mark1 mark2')
            .addClass('empty')
            .text(0)
    }

    clear() {
        this._$container.find('span.error').removeClass('error').text(0).addClass('empty')
    }
}

export default Grid