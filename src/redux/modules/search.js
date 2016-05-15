import axios from 'axios';
import { checkStatus, processSearchResults, toCamelCase } from 'redux/utils';

// constants
const FETCHING_SEARCH_RESULTS = 'FETCHING_SEARCH_RESULTS';
const SEARCH_FETCH_SUCCESS = 'SEARCH_FETCH_SUCCESS';
const SEARCH_FETCH_FAILED = 'SEARCH_FETCH_FAILED';
const RETURN_PREVIOUS_SEARCH = 'RETURN_PREVIOUS_SEARCH';
const ADD_TO_SEARCH_HISTORY = 'ADD_TO_SEARCH_HISTORY';

// actions
export const fetchSearchResultsIfNeeded = (str) => {
    return (dispatch, getState) => {
        dispatch(fetchingSearchResults());
        
        if (shouldFetchResults(getState(), str)) {
            dispatch(fetchSearchResults(str));
        } else {
            dispatch(returnPreviousSearch(getState(), str));
        }
    }
};

const fetchingSearchResults = () => {
    return {
        type: FETCHING_SEARCH_RESULTS
    };
}

const shouldFetchResults = ({ search }, str) => {
    const searchStr = toCamelCase(str);
    const results = search.history[searchStr] || false;

    if (!results) {
        return true
    }
    return false
};

const fetchSearchResults = (search) => {
    const url = `/api/search?keyword=${search}`;

    return dispatch => {
        return axios(url) 
            .then(checkStatus)
            .then(processSearchResults)
            .then(results => {
                dispatch(addToHistory(search, results));
                dispatch(fetchSuccess(results));
            })
            .catch(err => {
                dispatch(fetchFail(err));
                console.warn('Error in componentDidMount of ResultsContainer', err)
            });
    }
}



const returnPreviousSearch = ({ search }, str) => {
    const searchStr = toCamelCase(str);
    const data = search.history[searchStr];

    return {
        type: RETURN_PREVIOUS_SEARCH,
        data
    }
}

const fetchSuccess = (data) => {
    return {
        type: SEARCH_FETCH_SUCCESS,
        data
    }
}

const addToHistory = (str, data) => {
    const search = toCamelCase(str);

    return {
        type: ADD_TO_SEARCH_HISTORY,
        search,
        data
    };
}

const fetchFail = (error) => {
    return {
        type: SEARCH_FETCH_FAILED,
        error
    }
}

// reducer
const initialState = {
    isFetching: true,
    results: [],
    history: {}
};

export default (
    state = initialState, 
    action = {}
) => {
    switch(action.type) {
        case FETCHING_SEARCH_RESULTS:
            return {
                ...state,
                isFetching: true
            }
        case SEARCH_FETCH_SUCCESS:
        case RETURN_PREVIOUS_SEARCH:
            return {
                ...state,
                isFetching: false,
                results: action.data
            };
        case SEARCH_FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
                fetchFailed: true,
                error: action.error
            };
        case ADD_TO_SEARCH_HISTORY:
            return {
                ...state,
                history: {
                    ...state.history,
                    [action.search]: action.data
                }
            };
        default: 
            return state;
    }
}