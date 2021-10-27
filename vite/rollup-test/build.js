let exampleOnLoadPlugin = {
    name: 'example',
    setup(build) {
        let fs = require('fs')

        console.log(build.initialOptions)

        // build.initialOptions.outdir = 'lib' // 有效

        build.onStart(() => {
            build.initialOptions.outdir = 'lib' // 无效
        })

        build.onResolve({
            filter: /\.txt$/
        }, async(args) => {
            return {
                path: args.path,
                namespace: 'txt'
            }
        })

        build.onLoad({ filter: /\./, namespace: 'txt' }, async(args) => {
            // build.onLoad({ filter: /\.txt$/ }, async(args) => {
            let text = await fs.promises.readFile(args.path, 'utf8')
                // return {
                //   contents: JSON.stringify(text.split(/\s+/)),
                //   loader: 'json',
                // }
            return {
                contents: `export default ${JSON.stringify(text.split(/\s+/))}`,
            }
        })
    },
}

require('esbuild').build({
    entryPoints: ['es.js'],
    bundle: true,
    outdir: 'dist',
    plugins: [exampleOnLoadPlugin],
    loader: {
        '.png': "dataurl"
    }
}).catch(() => process.exit(1))