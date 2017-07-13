var webpack = require('webpack');
var url = require('url');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    filename: (process.env.NODE_ENV == "production" ? "[name].[chunkhash].js" : "[name].js"),
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      }
   ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: '.',
    // Set up a local proxy for dashboard data, so we don't need to deal with CORS, preflight requests, etc
    proxy: {
      '/data/*': {
        target: process.env.TRIAL_DASHBOARD_ENDPOINT,
        auth: ':' + process.env.TRIAL_DASHBOARD_SECRET,
        changeOrigin: true,
        pathRewrite: { '^/data': '' }
      }
    }
  }
}