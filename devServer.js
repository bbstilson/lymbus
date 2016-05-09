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
    publicPath: config.output.publicPath,
    // hot: true,
    // stats: { colors: true }
}));

// app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public')); // for static files

app.get('/api/search', (request, response) => {
    const search = cleanSearchInput(request.query.keyword);
    const url = `http://search.azlyrics.com/search.php?q=${search}&p=0&w=songs`;
    console.log('url =', url);
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
                    track: capitalizeFirstLetter($(row).find('a > b').text()),
                    artist: capitalizeFirstLetter($(row).find('td > b:first-of-type').text())
                };
                results.push(newRes);
            });
            
            function trimResults (arr) {
                /*
                    results include current page and *may* include pagination.
                    if there is pagination (20 results plus current page and pagination)
                        trim off the first and last
                    else 
                        only trim off first
                */
                return arr.length === 22 ? arr.slice(1, arr.length - 1) : arr.slice(1, arr.length);
            }
            console.log(trimResults(results));
            response.json(trimResults(results));
        })
        .catch(error => { console.log('request failed: ', error) });
});

app.get('/api/lyrics', (request, response) => {
    const artist = cleanSingleInput(request.query.artist),
        track = cleanSingleInput(request.query.track);

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
        .replace(/\s/g, '')
};

const cleanSearchInput = (str) => {
    return removePunctuation(str)
        .toLowerCase()
        .replace(/\s/g, '+');
};

const capitalizeFirstLetter = (str) => {
    const parts = ['I','II','III', 'IV','V','IV','IIV','IIIV','IX','X'];
    return str.split(' ')
        .map(word => {
            // check for 'parts', e.g., 'I', 'II', etc.
            if (!!~parts.indexOf(word)) return word.toUpperCase();

            const firstLetter = word.slice(0, 1);

            // checking for remix parens, e.g., Artist - Song (Person Remix)
            return firstLetter === '(' ? 
                word.slice(0, 2).toUpperCase() + word.slice(2).toLowerCase() :
                firstLetter + word.slice(1).toLowerCase()
        })
        .join(' ');
};