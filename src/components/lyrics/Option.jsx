import React, { PropTypes } from 'react';

const Option = ({
    text,
    doClick
}) => (
    <button className='btn btn-lg btn-primary' type='button' onClick={doClick}>
        {text}
    </button>
);

Option.propTypes = {
    text: PropTypes.string.isRequired,
    doClick: PropTypes.func.isRequired
};

export default Option;