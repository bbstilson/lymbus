import React, { PropTypes } from 'react';

const Cloud = ({
    lyrics
}) => (
    <div className='col-sm-12'>
        <h3>I'm the D3 Cloud component</h3>
    </div>
)

Cloud.propTypes = {
    lyrics: PropTypes.object.isRequired
};

export default Cloud;