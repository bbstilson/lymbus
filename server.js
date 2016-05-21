const path = require('path')
const express = require('express')
const utils = require('./serverUtils')
const axios = require('axios')
const cheerio = require('cheerio')

/*
    SERVER SETUP
*/
const app = express()
const port = (process.env.PORT || 8080)
const indexPath = path.join(__dirname, 'index.html')
const publicPath = express.static(path.join(__dirname, 'public'))

app.use('/public', publicPath)

app.get('/',(_, res) => {
    res.sendFile(indexPath)
})

/*
    WEBPACK DEV ENVIRONMENT
*/
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const config = require('./webpack.dev.config.js')
    const compiler = webpack(config)

    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }))
}

/*
    API
*/
app.get('/api/search', (request, response) => {
    const search = utils.cleanSearchInput(request.query.keyword)
    const url = `http://search.azlyrics.com/search.php?q=${search}&p=0&w=songs`
    
    axios(url)
        .then(utils.checkStatus)
        .then(html => {
            const $ = cheerio.load(html)
            const maxResultsCount = 20
            const results = []

            // converts each result in the html to an array of objects: { artist: '', track: '' }
            $('.table.table-condensed > tr').each((resId, row) => {
                const newRes = {
                    track: utils.capitalizeFirstLetter($(row).find('a > b').text()),
                    artist: utils.capitalizeFirstLetter($(row).find('td > b:first-of-type').text())
                }
                results.push(newRes)
            })

            response.json(utils.trimResults(results))
        })
        .catch(error => {
            console.log('Error in /search', error.status, error.statusText, new Date())
            response.json({ 
                status: error.status,
                statusText: error.statusText,
            })
        })
})

app.get('/api/lyrics', (request, response) => {
    const artist = utils.cleanArtistInput(request.query.artist),
        track = utils.cleanTrackInput(request.query.track)

    console.log('artist = ', artist, ' | track = ', track)

    const url = `http://www.azlyrics.com/lyrics/${artist}/${track}.html`

    axios(url)
        .then(utils.checkStatus)
        .then(html => {
            const $ = cheerio.load(html)
            
            // lyrics are in first div after div.ringtone
            const lyrics = $('.ringtone').nextAll('div').eq(0).text()
            
            response.send(lyrics)
        })
        .catch(error => {
            console.log('Error in /lyrics', error.status, error.statusText, new Date())
            response.json({ 
                status: error.status,
                statusText: error.statusText,
            })
        })
})

/*
    RUN SERVER
*/
app.listen(port, err => {
    if (err) {
        console.warn(`Error in app.listen: ${err}`)
        return
    }

    console.log(`Listening at http://localhost:${port}`)
})