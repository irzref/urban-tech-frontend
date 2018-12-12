const path = require('path');
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: {
    index: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/index.js"
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //plugins: [new webpack.HotModuleReplacementPlugin()],  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};