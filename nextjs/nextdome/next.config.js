// const withLess = require('@zeit/next-less')

// module.exports = withLess({
//     cssModules: true
// })

module.exports = {
    webpack: (config, options) => {
        config.resolve.alias['@'] = __dirname

        return config
    }
}