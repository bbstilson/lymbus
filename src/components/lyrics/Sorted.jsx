import React, { PropTypes } from 'react'
import { WordCloud, Ordered, Option } from './'

const Sorted = ({
    lyrics,
    view,
    onChangeChildView,
    onChangeOrder
}) => {
    const lyricsObj = {
        byCount: lyrics.byCount, 
        uniqueWords: lyrics.uniqueWords
    }

    return (
        <div>
            <div>
                <Option view={view} text='Word Cloud' doClick={() => {
                    onChangeChildView('WordCloud')
                }}/>
                <Option view={view} text='Ascending' doClick={() => {
                    onChangeChildView('Ascending')
                }} />
                <Option view={view} text='Descending' doClick={() => {
                    onChangeChildView('Descending')
                }} />
            </div>
            {view === 'Ascending' && <Ordered order={true} lyrics={lyricsObj} />}
            {view === 'Descending' && <Ordered order={false} lyrics={lyricsObj} />}
        </div>
    )
}

Sorted.propTypes = {
    lyrics: PropTypes.shape({
        all: PropTypes.array.isRequired,
        byWord: PropTypes.object.isRequired,
        byCount: PropTypes.object.isRequired,
        uniqueWords: PropTypes.number.isRequired
    }),
    onChangeChildView: PropTypes.func.isRequired,
    onChangeOrder: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired // change this when redux is added probably
}

export default Sorted

/*
{view === 'WordCloud' && <WordCloud lyrics={{...lyrics.byWord}} />}

*/