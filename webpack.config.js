const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Dotenv = require('dotenv-webpack');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const env = process.env.NODE_ENV;

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    publicPath: 'dist/',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv({
      path: `./.env.${env === "production" ? "production" : "development"}`,
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jper|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
}