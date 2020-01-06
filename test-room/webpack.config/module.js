const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (production) =>{
  return {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader',options: { url: false,sourceMap: true } },
          { loader: 'sass-loader',options: { sourceMap: true } }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname,'../front/src/assets')
        ],

      },
      {
        test: /\.svg$/,
        use: 'file-loader',
        include: [
          path.resolve(__dirname,'../front/src/assets')
        ]
      },
      {
        test: /\.png$/,
        include: [
          path.resolve(__dirname,'../front/src/assets')
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  };
}
