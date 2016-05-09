import React, { PropTypes } from 'react';
import { space } from 'styles';

const Option = ({
    text,
    doClick
}) => (
    <button className='btn btn-lg btn-primary' type='button' onClick={doClick} style={space}>
        {text}
    </button>
);

Option.propTypes = {
    text: PropTypes.string.isRequired,
    doClick: PropTypes.func.isRequired
};

export default Option;