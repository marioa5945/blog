const express = require('express');
import { createProxyMiddleware } from 'http-proxy-middleware';
import tomlJson from 'toml-json';
import * as webpack from 'webpack';
const webpackDevMiddleware = require('webpack-dev-middleware');
import dev from './webpack.dev';
const { exec } = require('child_process');

const app = express();
const compiler = webpack(dev);
const config = tomlJson('./config.toml');

app.use(express.static('public')); // static

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: (dev.output as any).publicPath,
  })
);

app.listen(config.port, function () {
  console.log(`starting at http://localhost:${config.port}`);
});

process.stdin.on('data', (data) => {
  if (data.toString() === '\n') {
    exec('npm run api');
    console.log('api update');
  }
});
