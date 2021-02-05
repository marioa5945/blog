import express from 'express';
import tomlJson from 'toml-json';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.server';
import open from 'open';
import util from 'util';

const exec = util.promisify(require('child_process').exec);
const app = express();
const compiler = webpack(webpackConfig);
const config = tomlJson({ fileUrl: './config.toml' });

app.use(express.static('public')); // static

// app.get('*', function (req: any, res: unknown, next: any) {
//   req.url = req.url === '/main.bundle.js' ? req.url : '/';
//   next();
// });

// Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: (webpackConfig.output as any).publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

const port = (config.server as any).port;
app.listen(port, function () {
  console.log(`starting at http://localhost:${port}`);
});

const execCmd = async (cmd: string) => {
  const { stdout, stderr } = await exec(cmd);
  console.log(stderr === '' ? stdout : stderr);
};

process.stdin.on('data', (data) => {
  if (data.toString() === '\n') {
    // press enter to update api json
    console.log('api update...');
    execCmd('yarn api');
  } else if (data.toString() === '-o\n') {
    // open url to view it in the browser
    open(`http://localhost:${port}`);
  }
});
