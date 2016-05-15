import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

class Search extends Component {
    focus = () => {
        findDOMNode(this._input).focus();
    }

    componentDidMount() {
        this.focus();
    }

    componentDidUpdate() {
        this.focus();
    }

    render() {
        const { onSubmitSearch, onUpdateSearch, search, placeholder } = this.props;

        return (
            <div className="col-sm-6 col-sm-offset-3">
                <h1 className='lead'>Lymbus</h1>

                <form onSubmit={onSubmitSearch}>
                    <div className='form-group'>
                        <input 
                            ref={n => this._input = n}
                            className="form-control" 
                            placeholder={placeholder} 
                            type="text"
                            value={search}
                            onChange={onUpdateSearch} />
                    </div>
                    <div className='form-group'>
                        <button className="btn btn-lg btn-success" type="submit">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}

Search.propTypes = {
    onUpdateSearch: PropTypes.func.isRequired,
    onSubmitSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
};

export default Search;