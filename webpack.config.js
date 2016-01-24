var webpack = require('webpack')
var path = require('path')

var config = {
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
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
}

module.exports = config
