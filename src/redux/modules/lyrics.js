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
    const decArtist = decodeURIComponent(artist);
    const decTrack = decodeURIComponent(track);

    return (dispatch, getState) => {
        dispatch(fetchingLyrics());

        if (shouldFetchResults(getState(), decArtist, decTrack)) {
            dispatch(fetchLyrics(artist, track));
        } else {
            dispatch(returnPreviousLyrics(getState(), decArtist, decTrack));
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

const fetchLyrics = (a, t) => {
    const artist = decodeURIComponent(a);
    const track = decodeURIComponent(t);

    const url = `/api/lyrics?artist=${a}&track=${t}`;

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
            .catch(err => {
                const { status, statusText } = err;
                console.warn('Error in fetchLyrics:', err);
                dispatch(fetchFailed(artist, track, { status, statusText }));
            });
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

const fetchFailed = (a, t, error) => {
    const artist = decodeURIComponent(a);
    const track = decodeURIComponent(t);
    return {
        type: LYRICS_FETCH_FAILED,
        songInfo: { artist, track },
        error
    }
}

// reducer
const initialState = {
    history: {},
    info: {},
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
                ...state,
                isFetching: false,
                fetchFailed: true,
                error: action.error,
                info: {
                    songInfo: action.songInfo
                }
            }
        default:
            return state;
    }
}