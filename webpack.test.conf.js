const webpack = require('webpack')
const path = require('path')

module.exports = {
  cache: true,
  devtool: 'source-map',
  context: path.join(__dirname, './src'),
  entry: {
    test: [path.join(__dirname, 'webpack.test.bootstrap.js')]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/[name].bundle.js',
    sourceMapFilename: 'js/maps/[name].map',
    chunkFilename: 'js/chunks/[name].chunk.js',
    publicPath: 'http://localhost:3000/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          // 'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader'
        ]
      },
      {
        test: /(\.scss|\.css)$/,
        loader: [
          'disappear-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve('./client'),
      'node_modules',
      'node_modules/@cycle/most-adapter'
    ]
  },
  resolveLoader: {
    alias: {
      'disappear-loader': path.join(__dirname, 'src/utils/disappear.loader.js'),
      'mock-module-styles-loader': path.join(__dirname, 'src/utils/mockModulesStylesLoader')
    }
  },
  plugins: [
    new webpack.IgnorePlugin(/^(\.scss|\.css)$/)
  ],
  node: {
    fs: 'empty'
  }
}
