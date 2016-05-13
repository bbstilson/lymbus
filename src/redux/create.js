import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './modules';

export default (history) => {
    const routingMiddleware = routerMiddleware(history);

    const middleware = [thunkMiddleware, routingMiddleware];

    return applyMiddleware(...middleware)(createStore)(rootReducer);
};