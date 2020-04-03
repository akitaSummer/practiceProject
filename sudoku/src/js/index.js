import '../scss/main.scss'

import $ from 'jquery'
const Grid = require('./ui/grid')
const PopupNumbers = require('./ui/popupnumbers')

const grid = new Grid($('#container'))
grid.build()
grid.layout()

const popupnumbers = new PopupNumbers($('#popupNumbers'))
grid.bindPopup(popupnumbers)