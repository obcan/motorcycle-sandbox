const webpack = require('webpack')
const path = require('path')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  cache: true,
  devtool: 'cheap-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    js: './index.js'
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          // 'react-hot',
          'babel-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('./client'),
      'node_modules'
    ]
  },
  plugins: [
    new NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  devServer: {
    outputPath: 'dist',
    port: 3000,
    host: 'localhost',
    compress: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: {
      colors: true,
      errors: true,
      errorDetails: false,
      reasons: true,
      publicPath: false,
      version: true,
      timings: true,
      assets: false,
      modules: false,
      source: true,
      children: true,
      hash: false,
      chunks: false,
      warnings: false
    }
  }
}
