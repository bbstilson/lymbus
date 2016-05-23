import React, { PropTypes } from 'react'
import { fullLyrics as styles } from 'styles/lyrics'

const FullLyrics = ({
    lyrics
}) => (
    <div style={styles}>
        {lyrics.map((line, idx) => <p key={line + idx}>{line}</p>)}
    </div>
)

FullLyrics.propTypes = {
    lyrics: PropTypes.array.isRequired
}

export default FullLyrics