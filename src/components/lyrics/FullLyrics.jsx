import React, { PropTypes } from 'react';

const FullLyrics = ({
    lyrics
}) => (
    <div className='col-sm-12'>
        <div className='col-sm-6 col-sm-offset-3 text-center'>
            {lyrics.map((line, idx) => <p key={line + idx}>{line}</p>)}
        </div>
    </div>
);

FullLyrics.propTypes = {
    lyrics: PropTypes.array.isRequired
};

export default FullLyrics;