import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import lyrics from './lyrics';
import search from './search';

export default combineReducers({
    routing: routerReducer,
    lyrics,
    search
});