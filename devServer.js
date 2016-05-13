var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var axios = require('axios');
var cheerio = require('cheerio');
var utils = require('./serverUtils');

var port = process.env.PORT || 8080;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    hot: true,
    stats: { colors: true }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public')); // for static files

app.get('/api/search', (request, response) => {
    const search = utils.cleanSearchInput(request.query.keyword);
    const url = `http://search.azlyrics.com/search.php?q=${search}&p=0&w=songs`;
    
    axios(url)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.data;
            } else {
                const error = new Error(res.statusText);
                throw error;
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            var maxResultsCount = 20;
            const results = [];

            // converts each result in the html to an array of objects: { artist: '', track: '' }
            $('.table.table-condensed > tr').each((resId, row) => {
                const newRes = {
                    track: utils.capitalizeFirstLetter($(row).find('a > b').text()),
                    artist: utils.capitalizeFirstLetter($(row).find('td > b:first-of-type').text())
                };
                results.push(newRes);
            });

            response.json(utils.trimResults(results));
        })
        .catch(error => {
            console.log('Error in /search', error.status, error.statusText, new Date());
            response.json({ 
                status: error.status,
                statusText: error.statusText,
            });
        });
});

app.get('/api/lyrics', (request, response) => {
    const artist = utils.cleanSingleInput(request.query.artist),
        track = utils.cleanSingleInput(request.query.track);

    console.log('artist = ', artist, ' | track = ', track);

    const url = `http://www.azlyrics.com/lyrics/${artist}/${track}.html`;

    axios(url)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.data;
            } else {
                const error = new Error(res.statusText);
                throw error;
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            
            // lyrics are in first div after div.ringtone
            const lyrics = $('.ringtone').nextAll('div').eq(0).text();
            
            response.send(lyrics);
        })
        .catch(error => {
            console.log('Error in /lyrics', error.status, error.statusText, new Date());
            response.json({ 
                status: error.status,
                statusText: error.statusText,
            });
        });
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