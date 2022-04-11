const path = require('path')

const webpackModule = {
  rules: [{
    test: /\.js$/,
    use: {
      loader: 'babel-loader'
    },
    exclude: /(node_modules|bower_components)/,
  }, {
    test: /\.scss$|\.css$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }, {
    test: /\.svg$/,
    use: 'file-loader'
  }
  ]
}

module.exports = [{
  name: 'example',
  entry: ['react-hot-loader/patch', __dirname + '/example/index.js'],
  output: {
    path: __dirname + '/example',
    filename: 'build.js',
    publicPath: '/example/'
  },
  devtool: 'cheap-module-source-map',
  module: webpackModule,
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
  },
}]
