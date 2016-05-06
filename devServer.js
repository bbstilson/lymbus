var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var axios = require('axios');
var cheerio = require('cheerio');

var port = process.env.PORT || 8080;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public')); // for static files

app.get('/api/search', (request, response) => {
    const search = cleanSearchInput(request.query.keyword);
    const url = `http://www.lyrics.com/search.php?keyword=${search}&what=all`;

    axios(url)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.data;
            } else {
                const error = new Error(res.statusText);
                throw errcor;
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            const results = [];

            // converts each result in the html to an array of objects: { artist: '', track: '' }
            $('#rightcontent > .row').each((resIdx, el) => {
                const res = {};
                $(el).find('.left a').each((idx, a) => {
                    idx === 0 ? res.track = $(a).text() : res.artist = $(a).text()
                });
                results.push(res);
            });

            response.json(results);
        })
        .catch(error => { console.log('request failed: ', error) });
});

app.get('/api/lyrics', (request, response) => {
    const artist = cleanSingleInput(request.query.artist),
        track = cleanSingleInput(request.query.track);

    const url = `http://www.lyrics.com/${track}-lyrics-${artist}.html`;

    axios(url)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.data;
            } else {
                const error = new Error(res.statusText);
                throw errcor;
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            const lyrics = $('#lyrics').text();
            const submitter = lyrics.indexOf('---');

            response.send(lyrics.slice(0 , submitter));
        })
        .catch(error => { console.log('request failed: ', error) });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(port, 'localhost', err => {
    if (err) {
        console.warn('Error in app.listen:', err);
        return;
    }

    console.log('Listening at http://localhost:' + port);
});


// helpers
const removePunctuation = (str) => str.replace(/[^\w']/g, ' ');

const cleanSingleInput = (str) => {
    return removePunctuation(str)
        .toLowerCase()
        .replace(/\s/g, '-')
        .replace(/--/g, '-'); // double dashes can appear from abbreviations like "Mr."
}

const cleanSearchInput = (str) => {
    return removePunctuation(str)
        .toLowerCase()
        .replace(/\s/g, '+');
}