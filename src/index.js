import React from 'react';
import { render } from 'react-dom';
import routes from './routes';
// import { Provider } from 'react-redux';

const root = document.getElementById('root');

render(
    routes, 
    root
);