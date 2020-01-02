/** @type import('webpack').Configuration */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const mode = argv.mode;
  const isProduction = mode === 'production';

  return {
    mode: mode,
    entry: './src/main.tsx',
    output: {
      path: `${__dirname}/dist`,
      filename: 'main.[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: isProduction ? './index.html' : './dev.html',
      }),
      new webpack.DefinePlugin({
        'process.env.API_END_POINT': JSON.stringify(process.env.API_END_POINT),
      }),
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist'],
      }),
    ],
    devServer: {
      open: true,
    },
    devtool: "source-map"
  };
};
