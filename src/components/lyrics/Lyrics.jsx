import React, { PropTypes } from 'react'
import { RequestFailed, RequestSuccess, Tracking } from './'
import { SearchAgain, Loading } from 'components'
import * as STYLES from 'styles/lyrics'


const Lyrics = ({
    isFetching,
    fetchFailed: { 
        fetchFailed, 
        error 
    },
    data,
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
    <div>
        <h1 style={STYLES.header}>{songInfo.artist} - {songInfo.track}</h1>
        {
            fetchFailed ?
            <RequestFailed error={error} /> :
            <RequestSuccess 
                mainView={mainView}
                childView={childView}
                onChangeMainView={onChangeMainView}
                onChangeChildView={onChangeChildView}
                onChangeOrder={onChangeOrder}
                data={data}
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
    data: PropTypes.shape({
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
}

export default Lyrics