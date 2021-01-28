import config from './webpack.config';

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
    {
      loader: 'eslint-loader',
    },
  ],
});

export default { ...config };
