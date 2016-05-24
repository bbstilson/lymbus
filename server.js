const path = require('path')
const express = require('express')
const utils = require('./serverUtils')
const axios = require('axios')

// MusixMatch info
const base = 'http://api.musixmatch.com/ws/1.1/'
const apikey = '125994dd5cc978a0f031aca6e65a0cbf'

/*
    SERVER SETUP
*/
const app = express()
const port = (process.env.PORT || 4000)
const indexPath = path.join(__dirname, 'index.html')
const distPath = express.static(path.join(__dirname, 'dist'))
const publicPath = express.static(path.join(__dirname, 'public'))


app.use('/dist', distPath)
app.use('/public', publicPath)

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
    const resultsAmount = 'page_size=20'
    const url = `${base}track.search?apikey=${apikey}&q=${search}&f_has_lyrics=1&${resultsAmount}`
    
    axios(url)
        .then(utils.checkStatus)
        .then(res => {
            response.json(res.data.message.body.track_list)
        })
        .catch(error => {
            console.log('Error in /search', error, error.status, error.statusText)
            
            response.json({ 
                status: error.status,
                statusText: error.statusText,
            })
        })
})

app.get('/api/lyrics', (request, response) => {
    const id = request.query.id

    const url = `${base}track.lyrics.get?apikey=${apikey}&track_id=${id}`

    axios(url)
        .then(utils.checkStatus)
        .then(res => {
            response.json(res.data.message.body.lyrics)
        })
        .catch(error => {
            console.log('Error in /lyrics', error, error.status, error.statusText)
            response.json({ 
                status: error.status,
                statusText: error.statusText,
            })
        })
})

app.get('*',(_, res) => {
    res.sendFile(indexPath)
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