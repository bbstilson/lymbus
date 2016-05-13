import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Main } from 'components';
import { SearchContainer, ResultsContainer, LyricsContainer } from 'containers';

export default (
    <Route path='/' component={Main}>
        <IndexRoute component={SearchContainer} />
        <Route path='/search' component={ResultsContainer} />
        <Route path='/lyrics' component={LyricsContainer} />
    </Route>
)