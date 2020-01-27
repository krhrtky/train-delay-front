/** @type import('webpack').Configuration */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const webpack = require('webpack');
const { resolve } = require('path');

module.exports = (env, argv) => {
  const mode = argv.mode;
  const isProduction = mode === 'production';

  const smp = new SpeedMeasurePlugin({ disable: !isProduction });

  return smp.wrap({
    mode: mode,
    entry: './src/main.tsx',
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].[hash].js'
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
      alias: {
        '@': resolve(__dirname, 'src'),
      }
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
      new BundleAnalyzerPlugin(),
    ],
    devServer: {
      open: true,
    },
    devtool: isProduction ? false : 'source-map',
  });
};
