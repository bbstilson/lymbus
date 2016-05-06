import React, { PropTypes } from 'react';
import { space } from 'styles';

const Result = ({
    songInfo,
    onSelect
}) => (
    <li className='col-sm-12 text-left list-group-item' style={space}>
        <div className='col-sm-10'>{songInfo.artist} - {songInfo.track}</div>
        <div className='col-sm-2'>
            <button type='button' className='btn btn-md btn-primary' onClick={() => { onSelect(songInfo) }}>Select</button>
        </div>
    </li>
);

Result.propTypes = {
    songInfo: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default Result;