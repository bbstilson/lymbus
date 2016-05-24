import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { Main, NotFound } from 'components'
import { HomePage, ResultsPage, LyricsPage } from 'pages'

export default (
    <Route path='/' component={Main}>
        <IndexRoute component={HomePage} />
        <Route path='search' component={ResultsPage} />
        <Route path='lyrics' component={LyricsPage} />
        <Route path='*' component={NotFound} />
    </Route>
)