const express = require('express');
import tomlJson from 'toml-json';
import webpack from 'webpack';
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-Hot-middleware');
import dev from './webpack.dev';
const { exec } = require('child_process');

const app = express();
const compiler = webpack(dev);
const config = tomlJson({ fileUrl: './config.toml' });

app.use(express.static('public')); // static

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: (dev.output as any).publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

app.listen((config.server as any).port, function () {
  console.log(`starting at http://localhost:${(config.server as any).port}`);
});

// press enter to update api json
process.stdin.on('data', (data) => {
  if (data.toString() === '\n') {
    exec('npm run api');
    console.log('api update');
  }
});
