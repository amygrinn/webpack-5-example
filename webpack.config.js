const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[contenthash].js',
  },
  plugins: [new CleanWebpackPlugin()],
};
