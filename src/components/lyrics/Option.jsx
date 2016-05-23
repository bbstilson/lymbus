import React, { PropTypes } from 'react'
import Radium from 'radium'
import { option } from 'styles/lyrics'

const Option = ({
    text,
    view,
    doClick
}) => (
    <button type='button' onClick={doClick} style={option(view === text.replace(' ', ''))}>
        {text}
    </button>
)

Option.propTypes = {
    text: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    doClick: PropTypes.func.isRequired
}

export default Radium(Option)