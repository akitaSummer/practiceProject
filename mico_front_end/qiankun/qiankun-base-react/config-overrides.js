module.exports = {
    webpack(config) {
        config.externals = process.env.NODE_ENV === 'production' ? {
            react: 'React'
        } : {}
        return config
    },
}