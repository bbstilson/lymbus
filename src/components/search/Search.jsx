import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import * as STYLES from 'styles/search';

class Search extends Component {
    focus = () => {
        findDOMNode(this._input).focus()
    }

    componentDidMount() {
        this.focus()
    }

    componentDidUpdate() {
        this.focus()
    }

    render() {
        const { onSubmitSearch, onUpdateSearch, search, placeholder } = this.props

        return (
            <div>
                <img src='public/images/logo.png' style={STYLES.logo}/>

                <form onSubmit={onSubmitSearch}>
                    <div style={STYLES.container}>
                        <input 
                            ref={n => this._input = n}
                            placeholder={placeholder} 
                            type="text"
                            value={search}
                            onChange={onUpdateSearch} 
                            style={STYLES.input} />
                        <button type="submit" style={STYLES.search}>
                            <div style={STYLES.icon} />
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Search.propTypes = {
    onUpdateSearch: PropTypes.func.isRequired,
    onSubmitSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default Search