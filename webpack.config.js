var path = require('path')
var IS_DEV_MODE = process.env.NODE_ENV !== 'production'

var config
var webpackModule = {
  preLoaders: [{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader'
  }],
  loaders: [{
    test: /\.js$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/
  }]
}

if (IS_DEV_MODE) {
  config = {
    entry: __dirname + '/example/index.js',
    output: {
      filename: 'build.js',
      publicPath: '/example/'
    },
    devServer: {
      hot: true
    },
    module: webpackModule
  }
} else {
  config = {
    entry: __dirname + '/src/index.js',
    output: {
      path: __dirname + '/dist',
      filename: 'react-rater.js',
      library: 'ReactRater',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: {
      react: "React"
    },
    module: webpackModule,
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js']
    }
  }
}

module.exports = config
