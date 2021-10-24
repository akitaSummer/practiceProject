// rollup --config rollup.config.js --environment TEST:123

console.log(process.env.TEST)

export default {
    input: 'index.js',
    output: {
        file: 'dist.js',
        format: 'umd',
        name: 'Index'
    }
}