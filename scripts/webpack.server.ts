import webpack from 'webpack';
import config from './webpack.config';

(config.module as any).rules.push({
  test: /\.(ts|tsx)$/,
  exclude: /node-modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false,
      },
    },
    '@marioa/import-lodash-loader',
    'eslint-loader',
  ],
});
(config.plugins as any).push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    apiPath: '""',
  })
);
config.entry = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/app.tsx'];

export default { ...config };
