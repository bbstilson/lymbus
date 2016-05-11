import axios from 'axios';
import { checkStatus, processLyrics, toCamelCase } from 'redux/utils';

// constants

const FETCHING_LYRICS = 'FETCHING_LYRICS';
const LYRICS_FETCH_SUCCESS = 'LYRICS_FETCH_SUCCESS';
const LYRICS_FETCH_FAILED = 'LYRICS_FETCH_FAILED';
const RETURN_PREVIOUS_LYRICS = 'RETURN_PREVIOUS_LYRICS';
const ADD_TO_LYRICS_HISTORY = 'ADD_TO_LYRICS_HISTORY';

// actions

export const fetchLyricsIfNeeded = (artist, track) => {
    return (dispatch, getState) => {
        dispatch(fetchingLyrics());

        if (shouldFetchResults(getState(), artist, track)) {
            console.log('fetching lyrics...');
            dispatch(fetchLyrics(artist, track));
        } else {
            console.log('returning previous lyrics...');
            dispatch(returnPreviousLyrics(getState(), artist, track));
        }
    }
}

const fetchingLyrics = () => {
    return {
        type: FETCHING_LYRICS
    }
}

const shouldFetchResults = ({ lyrics }, artist, track) => {
    const historyStr = toCamelCase(artist, track);
    const results = lyrics.history[historyStr] || false;

    if (!results) {
        return true;
    }
    return false;
}

const fetchLyrics = (artist, track) => {
    const url = `/api/lyrics?artist=${artist}&track=${track}`;

    return dispatch => {
        axios(url) 
            .then(checkStatus)
            .then(processLyrics)
            .then(lyrics => {
                const data = {
                    songInfo: { artist, track },
                    ...lyrics,
                };
                dispatch(addToHistory(artist, track, data));
                dispatch(fetchSuccess(artist, track, data));
            })
            .catch(err => dispatch(fetchFailed(err)));
    }
}

const returnPreviousLyrics = ({ lyrics }, artist, track) => {
    const historyStr = toCamelCase(artist, track);
    const data = lyrics.history[historyStr];
    const songInfo = { artist, track };

    return {
        type: RETURN_PREVIOUS_LYRICS,
        data,
        songInfo
    }
}

const fetchSuccess = (artist, track, data) => {
    const songInfo = { artist, track };
    return {
        type: LYRICS_FETCH_SUCCESS,
        data,
        songInfo
    }
}

const addToHistory = (artist, track, data) => {
    const key = toCamelCase(artist, track);

    return {
        type: ADD_TO_LYRICS_HISTORY,
        key,
        data
    }
}

const fetchFailed = (error) => {
    return {
        type: LYRICS_FETCH_FAILED,
        error
    }
}

// reducer
const initialState = {
    history: {},
    info: {},
    isFetching: true
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
                info: {
                    ...action.data,
                    songInfo: action.songInfo,
                }
            }
        case ADD_TO_LYRICS_HISTORY:
            return {
                ...state,
                history: {
                    ...state.history,
                    [action.key]: action.data
                }
            }
        case LYRICS_FETCH_FAILED:
            return {
                isFetching: false,
                fetchFailed: true,
                error: action.error
            }
        default:
            return state;
    }
}