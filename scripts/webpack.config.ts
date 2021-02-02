import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

export default {
  mode: 'development',
  entry: ['./src/app.tsx'],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@src': resolve('./src'),
      '@components': resolve('./src/components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: resolve('.', 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
} as Configuration;
