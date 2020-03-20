import '../scss/main.scss'

const makeMatrixToolkit = require('./toolkit')

console.log(makeMatrixToolkit.shuffle(Array.from({ length: 9 }, (v, i) => i)))