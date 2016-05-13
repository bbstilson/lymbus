import React, { PropTypes } from 'react';
import { RequestFailed, RequestSuccess } from './';
import { SearchAgain, Loading } from 'components';

const Lyrics = ({
    isFetching,
    fetchFailed: { 
        fetchFailed, 
        error 
    },
    lyrics,
    order,
    songInfo,
    mainView,
    childView,
    onChangeMainView,
    onChangeChildView,
    onChangeOrder
}) => (
    isFetching ?
    <Loading /> :
    <div className='col-sm-12'>
        <p className='lead'>{songInfo.artist} - {songInfo.track}</p>
        <SearchAgain />
        {
            fetchFailed ?
            <RequestFailed error={error} /> :
            <RequestSuccess 
                mainView={mainView}
                childView={childView}
                onChangeMainView={onChangeMainView}
                onChangeChildView={onChangeChildView}
                onChangeOrder={onChangeOrder}
                lyrics={lyrics}
                order={order} />
        }
        </div>
)

Lyrics.propTypes = {
    childView: PropTypes.string.isRequired, // change this probably
    isFetching: PropTypes.bool.isRequired,
    fetchFailed: PropTypes.shape({
        fetchFailed: PropTypes.bool,
        error: PropTypes.object
    }),
    lyrics: PropTypes.shape({
        all: PropTypes.array,
        byWord: PropTypes.object,
        byCount: PropTypes.object,
        uniqueWords: PropTypes.number
    }),
    mainView: PropTypes.string.isRequired, // change this probably
    order: PropTypes.bool.isRequired,
    onChangeMainView: PropTypes.func.isRequired,
    onChangeChildView: PropTypes.func.isRequired,
    onChangeOrder: PropTypes.func.isRequired,
    songInfo: PropTypes.shape({
        track: PropTypes.string,
        artist: PropTypes.string
    })
};

export default Lyrics;