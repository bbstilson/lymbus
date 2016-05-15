import React from 'react';
import { render } from 'react-dom';
import routes from 'routes';
import createStore from 'redux/create';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import { whyDidYouUpdate } from 'why-did-you-update';

// whyDidYouUpdate(React, { ignore: /^Connect/ });

const store = createStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

const root = document.getElementById('root');

render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>, 
    root
);