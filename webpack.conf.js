const webpack = require('webpack')
const path = require('path')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  cache: true,
  devtool: 'source-map',
  context: path.join(__dirname, './src'),
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
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
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass']
        })
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
  plugins: [
    new ExtractTextPlugin({ filename: 'css/[name]-style.css', disable: false, allChunks: true }),
    new NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'app.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  devServer: {
    outputPath: 'dist',
    port: 3000,
    host: 'localhost',
    compress: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    // headers: { 'Access-Control-Allow-Origin': '*' },
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
