const R = require('ramda')

// 多次聚合
const average = R.converge(R.divide, [R.sum, R.length])
average([1, 2, 3, 4, 5, 6, 7])

const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
strangeConcat('Yodel')