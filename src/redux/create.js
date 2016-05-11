import { applyMiddleware, createStore } from 'redux';
// import { syncHistory } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './modules';

export default (history) => {
    // const reduxRouterMiddleware = syncHistory(history);

    // const middleware = [thunkMiddleware, reduxRouterMiddleware];

    // const finalCreateStore = applyMiddleware(...middleware)(createStore);

    const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);

    const store = finalCreateStore(rootReducer);

    // reduxRouterMiddleware.listenForReplays(store);

    return store;
};