import React, { PropTypes } from 'react';

const Search = ({
    onSubmitSearch,
    onUpdateSearch,
    search
}) => (
    <div className="col-sm-6 col-sm-offset-3">
        <h1 className='lead'>Lymbus</h1>

        <form onSubmit={onSubmitSearch}>
            <div className='form-group'>
                <input 
                    className="form-control" 
                    placeholder="Dance Gavin Dance" 
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

Search.propTypes = {
    onUpdateSearch: PropTypes.func.isRequired,
    onSubmitSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired
};

export default Search;