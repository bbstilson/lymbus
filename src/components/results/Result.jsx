import React, { PropTypes } from 'react'
import Radium from 'radium'
import { result } from 'styles/results'

const Result = ({
    songInfo,
    onSelect
}) => (
    <a 
        href='#'
        style={result}
        onClick={(e) => { onSelect(e, songInfo) }}>{songInfo.artist} - {songInfo.track}</a>
)

Result.propTypes = {
    songInfo: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default Radium(Result)