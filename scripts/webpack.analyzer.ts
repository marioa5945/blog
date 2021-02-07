import config from './webpack.pro';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

(config.plugins as any).push(new BundleAnalyzerPlugin());

export default { ...config };
