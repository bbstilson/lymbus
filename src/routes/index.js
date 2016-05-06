import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Main } from 'components';
import { SearchContainer, ResultsContainer, LyricsContainer } from 'containers';

export default (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={SearchContainer} />
            <Route path='/search' component={ResultsContainer} />
            <Route path='/cloud' component={LyricsContainer} />
        </Route>
    </Router>
)