import React, { PropTypes } from 'react';
import Loading from 'react-simple-loading';
import { FullLyrics, Sorted, Option } from './';

const Lyrics = ({
    isLoading,
    lyrics,
    order,
    songInfo,
    mainView,
    childView,
    onChangeMainView,
    onChangeChildView,
    onChangeOrder
}) => (
    isLoading ?
    <Loading /> :
    <div className='col-sm-12'>
        <p className='lead'>{songInfo.artist} - {songInfo.track}</p>
        <div className='col-sm-12'>
            <div className='col-sm-6 col-sm-offset-3'>
                <Option text='Sorted' doClick={onChangeMainView.bind(null, 'Sorted')} />
                <Option text='Full Lyrics' doClick={onChangeMainView.bind(null, 'FullLyrics')} />
            </div>
            {mainView === 'FullLyrics'  && <FullLyrics lyrics={lyrics.all} />}
            {mainView === 'Sorted'      && <Sorted order={order} lyrics={lyrics} view={childView} onChangeChildView={onChangeChildView} onChangeOrder={onChangeOrder} />}
        </div>
    </div>
);

Lyrics.propTypes = {
    childView: PropTypes.string.isRequired, // change this probably
    isLoading: PropTypes.bool.isRequired,
    lyrics: PropTypes.shape({
        all: PropTypes.array.isRequired,
        byWord: PropTypes.object.isRequired,
        byCount: PropTypes.object.isRequired,
        uniqueWords: PropTypes.number.isRequired
    }),
    mainView: PropTypes.string.isRequired, // change this probably
    order: PropTypes.bool.isRequired,
    onChangeMainView: PropTypes.func.isRequired,
    onChangeChildView: PropTypes.func.isRequired,
    onChangeOrder: PropTypes.func.isRequired,
    songInfo: PropTypes.shape({
        track: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired
    })
};

export default Lyrics;