import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { Main, NotFound } from 'components'
import { LyricsContainer, ResultsContainer } from 'containers'
import { HomePage, ResultsPage } from 'pages'

export default (
    <Route path='/' component={Main}>
        <IndexRoute component={HomePage} />
        <Route path='/search' component={ResultsPage} />
        <Route path='/lyrics' component={LyricsContainer} />
        <Route path='*' component={NotFound} />
    </Route>
)