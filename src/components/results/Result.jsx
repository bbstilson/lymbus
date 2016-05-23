import React, { PropTypes } from 'react';

const Result = ({
    songInfo,
    onSelect
}) => (
    <li style={{}}>
        <p>{songInfo.artist} - {songInfo.track}</p>
        <div>
            <button type='button' onClick={() => { onSelect(songInfo) }}>Select</button>
        </div>
    </li>
);

Result.propTypes = {
    songInfo: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default Result;