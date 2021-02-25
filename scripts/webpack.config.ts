import { resolve } from 'path';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      publicPath: '/',
    }),
  ],
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve('.', 'build'),
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (process.env.NODE_ENV === 'development') {
                  return 'img/[path][name].[ext]';
                }
                return 'img/[contenthash].[ext]';
              },
              limit: false,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
} as Configuration;
