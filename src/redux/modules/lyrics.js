import axios from 'axios';
import { checkStatus, processLyrics } from 'redux/utils';

// constants
const FETCHING_LYRICS = 'FETCHING_LYRICS';
const LYRICS_FETCH_SUCCESS = 'LYRICS_FETCH_SUCCESS';
const LYRICS_FETCH_FAILED = 'LYRICS_FETCH_FAILED';
const RETURN_PREVIOUS_LYRICS = 'RETURN_PREVIOUS_LYRICS';
const ADD_TO_LYRICS_HISTORY = 'ADD_TO_LYRICS_HISTORY';

// actions
export const fetchLyricsIfNeeded = (id) => {
    return (dispatch, getState) => {
        dispatch(fetchingLyrics());

        if (shouldFetchResults(getState(), id)) {
            dispatch(fetchLyrics(id));
        } else {
            dispatch(returnPreviousLyrics(getState(), id));
        }
    }
}

const fetchingLyrics = () => {
    return {
        type: FETCHING_LYRICS
    }
}

const shouldFetchResults = ({ lyrics }, id) => {
    const results = lyrics.history[id] || false;

    if (!results) {
        return true;
    }
    return false;
}

const fetchLyrics = (id) => {
    const url = `/api/lyrics?id=${id}`;

    return dispatch => {
        axios(url) 
            .then(checkStatus)
            .then(processLyrics)
            .then(data => {
                dispatch(addToHistory(id, data));
                dispatch(fetchSuccess(data));
            })
            .catch(err => {
                console.warn('Error in fetchLyrics:', err);
                dispatch(fetchFailed(artist, track, err));
            });
    }
}

const returnPreviousLyrics = ({ lyrics }, id) => {
    return {
        type: RETURN_PREVIOUS_LYRICS,
        data: lyrics.history[id]
    }
}

const fetchSuccess = (data) => {
    return {
        type: LYRICS_FETCH_SUCCESS,
        data
    }
}

const addToHistory = (id, data) => {
    return {
        type: ADD_TO_LYRICS_HISTORY,
        id,
        data
    }
}

const fetchFailed = (data, error) => {
    return {
        type: LYRICS_FETCH_FAILED,
        data
    }
}

// reducer
const initialState = {
    history: {},
    data: {},
    isFetching: true,
}

export default (
    state = initialState,
    action = {}
) => {
    switch (action.type) {
        case FETCHING_LYRICS:
            return {
                ...state,
                isFetching: true
            };
        case RETURN_PREVIOUS_LYRICS:
        case LYRICS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                fetchFailed: false,
                data: action.data
            }
        case ADD_TO_LYRICS_HISTORY:
            return {
                ...state,
                history: {
                    ...state.history,
                    [action.id]: action.data
                }
            }
        case LYRICS_FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
                fetchFailed: true,
                error: action.error,
            }
        default:
            return state;
    }
}