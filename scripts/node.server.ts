import express from 'express';
import tomlJson from 'toml-json';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.server';
import util from 'util';
import serverPrint from 'server-print';

const exec = util.promisify(require('child_process').exec);
const app = express();
const compiler = webpack(webpackConfig);
const config = tomlJson({ fileUrl: './config.toml' });

app.use(express.static('public')); // static

// Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: (webpackConfig.output as any).publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

const port = (config.server as any).port;
app.listen(port, function () {
  serverPrint(port);
});

const execCmd = async (cmd: string) => {
  const { stdout, stderr } = await exec(cmd);
  console.log(stderr === '' ? stdout : stderr);
};

process.stdin.on('data', (data) => {
  if (data.toString() === '\n') {
    // press enter to update api json
    console.log('api update...');
    execCmd('yarn blog');
  }
});
