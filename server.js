/**
 * Created by brandon14 on 1/28/17.
 */
/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const _ = require('underscore');
const fs = require('fs');
const config = require('./webpack.config.js');

const isDev = process.env.NODE_ENV !== 'production';
const port = isDev ? 5000 : process.env.PORT;
const app = express();

// If this is a development environment, load the webpack middlewares to serve webpack bundles
if (isDev) {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('/last-modified', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ "last-modified": getMostRecentFile('src') }));
  });

  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else { // End if (isDev)
  // In production environments, set the express app to use the dist/ directory where the webpack bundles and assets are located at
  app.use(express.static(__dirname + '/dist'));

  app.get('/last-modified', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ "last-modified": getMostRecentFile('src') }));
  });

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
} // End if (isDev) {} else {}

// Listen for requests using the express server
app.listen(port, function onStart(err) {
  if (err) { console.log(err); }

  console.info('==> Listening on port %s.', port);
});

const walkSync = function(dir, filelist) {
  filelist = filelist || [];

  fs.readdirSync(dir).forEach(function(file) {
    filelist = fs.statSync(path.join(dir, file)).isDirectory() ? walkSync(path.join(dir, file), filelist) : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

const getMostRecentFile = function(dir) {
  var files = walkSync(dir);

  var max = _.max(files, function (file) {
    return fs.statSync(file).mtime;
  });

  return fs.statSync(max).mtime.toLocaleString('en-US');
}
