var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');

var port = process.env.PORT || 8080;
var app = express();
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));

app.get('/search', function (req, res) {
    console.log('Hit the search endpoint');
    // respond to request with fetch promise
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.warn('Error on listen', err);
    }
    console.log('Server running on port', port);
});