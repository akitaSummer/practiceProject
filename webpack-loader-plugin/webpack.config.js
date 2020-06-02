const path = require('path')
const CopyRightWebpackPlugin = require('./plugins/coypright-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  resolveLoader:  {
    modules: ['node_modules', './loaders'] // 未写路径时，loader查找的目录
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [{
          // loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
          loader: 'replaceLoader',
          options: {
            name: 'akita'
          }
        },
          {
            loader: 'replaceLoaderAsync',
            options: {
              name: 'akitaSummer'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyRightWebpackPlugin({name: 'akitaSummer'})
  ]
}
