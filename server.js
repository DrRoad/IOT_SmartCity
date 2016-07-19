'use strict';
/**
 * Created by Ben Hu on 2016/3/2.
 */
require('babel-register')({
  presets: ['es2015']
});

const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const server = require('http').createServer(app);

const LISTEN_PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
  let config = require('./webpack/webpack.dev.config.js');
  let compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler,
    {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    }
  ));

  app.use(webpackHotMiddleware(compiler));
} else if (NODE_ENV === 'production') {
  let config = require('./webpack/webpack.config.js');
  let compiler = webpack(config);

  compiler.run(function (err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log('[Production] Compile done.');
  });
}

app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
  if (req.url.match(/\/api\/.*/)) {
    next();
  } else {
    res.sendFile(__dirname + '/index.html')
  }
});

server.listen(LISTEN_PORT, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("[%s Mode] Server listening on port %d.", NODE_ENV, LISTEN_PORT)
  }
});

require('./socket')(server);
require('./api')(app);


