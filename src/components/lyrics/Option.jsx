import React, { PropTypes } from 'react';
import { space } from 'styles/global';

const getStyles = (active) => {
    return {
        ...space,
        backgroundColor: active ? 'firebrick' : 'lightblue'
    }
}
const Option = ({
    text,
    view,
    doClick
}) => {
    const styles = getStyles(view === text.replace(' ', ''))
    return (
        <button className='btn btn-lg btn-primary' type='button' onClick={doClick} style={styles}>
            {text}
        </button>
    )
}

Option.propTypes = {
    text: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    doClick: PropTypes.func.isRequired
};

export default Option;