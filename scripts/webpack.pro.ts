import config from './webpack.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as CopyPlugin from 'copy-webpack-plugin';

config.mode = 'production';
config.devtool = false;
(config.output as any).filename = '[name].[contenthash].bundle.js';
(config.module as any).rules.push({
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node-modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false,
      },
    },
  ],
});
(config.plugins as any).push(new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }));
(config.plugins as any).push(
  new CopyPlugin({
    patterns: [{ from: './public', to: './' }],
  })
);

export default { ...config };
