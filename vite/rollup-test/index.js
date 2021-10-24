// rollup -i index.js rollup -i index.js --file dist.js
// rollup -i index.js -i a.js --dir dist --format cjs --watch
import path from 'path'
import { funcA } from './a'

import pkg from './package.json'

console.log(pkg)

funcA()
console.log('Hello Rollup', path.join("", "/hello"))