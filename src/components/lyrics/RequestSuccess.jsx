import React, { PropTypes } from 'react';
import { Option, FullLyrics, Sorted } from './';

const RequestSuccess = ({
    mainView,
    childView,
    onChangeMainView,
    onChangeChildView,
    onChangeOrder,
    lyrics,
    order
}) => (
    <div>
        <div>
            <Option 
                text='Sorted' 
                view={mainView} 
                doClick={onChangeMainView.bind(null, 'Sorted')} />
            <Option 
                text='Full Lyrics' 
                view={mainView} 
                doClick={onChangeMainView.bind(null, 'FullLyrics')} />
        </div>
        {mainView === 'FullLyrics' && 
            <FullLyrics lyrics={lyrics.all} />}
        {mainView === 'Sorted' && 
            <Sorted 
                order={order} 
                lyrics={lyrics} 
                view={childView} 
                onChangeChildView={onChangeChildView} 
                onChangeOrder={onChangeOrder} />}
    </div>
);

RequestSuccess.propTypes = {
    childView: PropTypes.string.isRequired, // change this probably
    mainView: PropTypes.string.isRequired, // change this probably
    order: PropTypes.bool.isRequired,
    onChangeMainView: PropTypes.func.isRequired,
    onChangeChildView: PropTypes.func.isRequired,
    onChangeOrder: PropTypes.func.isRequired,
    lyrics: PropTypes.shape({
        all: PropTypes.array,
        byWord: PropTypes.object,
        byCount: PropTypes.object,
        uniqueWords: PropTypes.number
    }),
    order: PropTypes.bool.isRequired
}

export default RequestSuccess;