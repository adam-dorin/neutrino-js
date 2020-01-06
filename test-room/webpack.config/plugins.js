const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (production)=>{
  return [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'../index.html'),
      minify:false,
      inject: true,
      appMountId: 'app',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: production ? '[chunkhash].css':'[name].css',
      chunkFilename: production ? '[chunkhash].css':'[name].css',

    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/,/en/),
    new LodashModuleReplacementPlugin,
    
  ];
}
