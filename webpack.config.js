var path = require('path')

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

module.exports = [{
  name: 'example',
  entry: __dirname + '/example/index.js',
  output: {
    path: __dirname + '/example',
    filename: 'build.js',
    publicPath: '/example/'
  },
  devServer: {
    hot: true
  },
  module: webpackModule
}, {
  name: 'lib',
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
}]
