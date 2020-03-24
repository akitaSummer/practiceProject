import '../scss/main.scss'

import $ from 'jquery'
const Grid = require('./ui/grid')

const grid = new Grid($('#container'))
grid.build()
grid.layout()