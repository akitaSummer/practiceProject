// 处理弹出的操作面板
import $ from 'jquery'
export default class PopupNumbers {

    private _$panel: JQuery<HTMLElement>
    private _$targetCell: any

    constructor($panel: JQuery<HTMLElement>) {
        this._$panel = $panel.hide().removeClass('hidden')

        this._$panel.on('click', 'span', e => {
            const $cell = this._$targetCell
            const $span = $(e.target)
            if ($span.hasClass('mark1')) {
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass('mark1')
                } else {
                    $cell.removeClass('mark2').addClass('mark1')
                }
            } else if ($span.hasClass('mark2')) {
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass('mark2')
                } else {
                    $cell.removeClass('mark1').addClass('mark2')
                }
            } else if ($span.hasClass('empty')) {
                $cell.text(0)
                    .removeClass('mark1')
                    .removeClass('mark2')
                    .addClass('empty')
            } else {
                $cell.removeClass('empty').text($span.text())
            }
            this._$panel.hide()
        })
    }

    popup($cell: JQuery<HTMLElement>): void {
        this._$targetCell = $cell
        const { left, top } = $cell.position()
        this._$panel.css({
            left: `${left}px`,
            top: `${top}px`
        }).show()
    }

    hide(): void {
        this._$panel.hide()
    }
}