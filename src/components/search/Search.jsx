import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import { findDOMNode } from 'react-dom'
import * as STYLES from 'styles/search'

const Search = ({
    onSubmitSearch, 
    onUpdateSearch, 
    search, 
    placeholder,
    customStyles
}) => (
    <form onSubmit={onSubmitSearch}>
        <div style={customStyles ? customStyles.container : STYLES.container}>
            <input 
                type="text"
                placeholder={placeholder} 
                value={search}
                onChange={onUpdateSearch} 
                style={customStyles ? {...STYLES.input, ...customStyles.input} : STYLES.input} />
            <button type="submit" style={customStyles ? {...STYLES.search, ...customStyles.search} : STYLES.search}>
                <div style={STYLES.icon} />
            </button>
        </div>
    </form>
)

Search.propTypes = {
    onUpdateSearch: PropTypes.func.isRequired,
    onSubmitSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default Radium(Search)