// rollup -i index.js rollup -i index.js --file dist.js
// rollup -i index.js -i a.js --dir dist --format cjs --watch
import path from 'path'
import { funcA } from 'a'
import React from 'react'
import { add } from './b'

import url from './logo.png'

import pkg from './package.json'

console.log(pkg)
console.log(React)
console.log(add(1, 2))
console.log(__TEST__)

console.log(url)

funcA()
console.log('Hello Rollup', path.join("", "/hello"))