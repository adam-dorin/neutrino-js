const path = require('path');
const isProduction = false;

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = env => {
 
  var configuration =  {
    // webpack-dev-server configuration
    mode:'development',
    devServer: require('./webpack.config/server')(isProduction),
    module: require('./webpack.config/module')(isProduction),
    plugins: require('./webpack.config/plugins')(isProduction),
    optimization: require('./webpack.config/optimization')(isProduction),
    entry: [
      path.resolve(__dirname,'index.js'),
    ],
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname,'public')
    },
  }


  return configuration
}

module.exports = config;
