const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  plugins : [
    new webpack.DefinePlugin({
      "process.env": {
          BROWSER: JSON.stringify(true)
        }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
}