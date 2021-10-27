// npx esbuild es.js
// npx esbuild es.js --outfile=dist.js
// npx esbuild es.js --outfile=dist.js --bundle
// npx esbuild es.js --outfile=dist.js --bundle --target=esnext
// npx esbuild es.js --outfile=dist.js  --target=esnext --platform=node
// npx esbuild es.js --outfile=dist.js  --target=esnext --platform=node --format=cjs
// npx esbuild es.js --outfile=dist.js  --target=esnext --platform=node --format=cjs --watch
// npx esbuild es.js --outfile=dist.js  --target=esnext --platform=node --format=cjs --define:TEST=12
// npx esbuild es.js --outfile=dist.js  --bundle --target=esnext --platform=browser --format=iife --define:TEST=12 --loader:.png=dataurl
// npx esbuild es.js --outdir=dist  --bundle --target=esnext --platform=browser --format=iife --define:TEST=12 --loader:.png=dataurl



import React from 'react'
import './index.css'
import logo from './logo.png'
import test from './test.txt'

const hello = () => {
    console.log('hello esbuild')
}

hello()

React.createElement("div")

console.log(test)

export default hello