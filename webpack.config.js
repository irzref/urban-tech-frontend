const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: [
      "./src/index.js"
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
  },
  watch: true,
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: [
        "./dist/*.html",
        "./src/*.css"
      ],
      server: { baseDir: ['dist'] }
    })
  ]
};