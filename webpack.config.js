var webpack = require('webpack');
var url = require('url');

module.exports = {
  entry: "./src/entry.js",
  output: {
    filename: "app.js",
    publicPath: "/"
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