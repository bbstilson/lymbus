import React from 'react';
import { render } from 'react-dom';
import routes from 'routes';
import createStore from 'redux/create';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'

// import { whyDidYouUpdate } from 'why-did-you-update';
// whyDidYouUpdate(React, { ignore: /^Connect/ });

import { SearchAgain } from 'components'

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const root = document.getElementById('root');

render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>, 
    root
)