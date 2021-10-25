// rollup --config rollup.config.js --environment TEST:123
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import ts from '@rollup/plugin-typescript'
import image from '@rollup/plugin-image'
import strip from '@rollup/plugin-strip'

console.log(process.env.TEST)

// export default {
//     input: 'index.js',
//     output: {
//         file: 'dist.js',
//         format: 'umd',
//         name: 'Index'
//     }
// }

export default [{
    input: 'index.js',
    external: ['react'],
    // external: {
    //     'react': 'React'
    // },
    plugins: [resolve(), alias({
        entries: {
            a: "./a"
        }
    }), commonjs(), replace({
        __TEST__: 1234
    }), image(), strip(), ts(), json()],
    output: [{
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'Index',
        plugins: [terser()],
        banner: "/** Hello This is Banner **/"
    }, {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        name: 'Index',
        plugins: [terser()],
        banner: "/** Hello This is Banner **/"
    }]
}, {
    input: 'index.js',
    external: ['react'],
    plugins: [resolve(), commonjs(), replace({
        __TEST__: 1234
    }), image(), strip(), ts(), json()],
    output: {
        file: 'dist/index.es.js',
        format: 'es',
        name: 'Index',
        plugins: [terser()],
        banner: "/** Hello This is Banner **/"
    }
}]