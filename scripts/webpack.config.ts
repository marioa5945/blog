import { resolve } from 'path';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { container } from 'webpack';
const { ModuleFederationPlugin } = container;

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
    // new ModuleFederationPlugin({
    //   name: 'app1',
    //   // adds react as shared module
    //   // version is inferred from package.json
    //   // there is no version check for the required version
    //   // so it will always use the higher version found
    //   shared: {
    //     react: {
    //       import: 'react', // the "react" package will be used a provided and fallback module
    //       shareKey: 'react', // under this name the shared module will be placed in the share scope
    //       shareScope: 'default', // share scope with this name will be used
    //       singleton: true, // only a single version of the shared module is allowed
    //     },
    //     'react-dom': {
    //       singleton: true, // only a single version of the shared module is allowed
    //     },
    //   },
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve('.', 'build'),
    publicPath: '/',
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
