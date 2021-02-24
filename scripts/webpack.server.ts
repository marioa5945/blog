import webpack from 'webpack';
import config from './webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    'eslint-loader',
  ],
});
(config.plugins as any).push(
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: 'template/dev.html',
  }),
  new webpack.DefinePlugin({
    remoteServer: '"http://localhost:8080/"',
  })
);
config.entry = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/app.tsx'];
config.externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  _: 'lodash',
};

export default { ...config };
