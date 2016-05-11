import React from 'react';
import { render } from 'react-dom';
import routes from 'routes';
import createStore from 'redux/create';
import { Provider } from 'react-redux';

const store = createStore();

const root = document.getElementById('root');

render(
    <Provider store={store}>
        {routes}
    </Provider>, 
    root
);