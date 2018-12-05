const path = require('path')

var webpackModule = {
  rules: [{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: 'eslint-loader',
    enforce: 'pre'
  },{
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: ["react", "env", "stage-2"],
        plugins: ["react-hot-loader/babel"],
      },
    },
    exclude: /(node_modules|bower_components)/,
  },{
    test: /\.scss$|\.css$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  },{
    test: /\.svg$/,
    use: 'file-loader'
  }
  ]
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
