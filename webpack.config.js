var path = require('path')

var webpackModule = {
  rules: [{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader',
    enforce: 'pre'
  },{
    test: /\.js$/,
    loader: 'babel-loader',
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
    modules: [path.resolve('./src'), "node_modules"],
    extensions: ['.js']
  }
}]
