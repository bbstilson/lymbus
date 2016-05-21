import React, { PropTypes } from 'react';
import Result from './Result';
import { SearchAgain, Loading } from 'components';

const Results = ({
    isFetching,
    fetchFailed: { fetchFailed, error },
    results,
    onSelect,
    keyword
}) => (
    isFetching ?
    <Loading /> :
        <div className='col-sm-6 col-sm-offset-3'>
            {
                fetchFailed ?
                <p>Your search failed: <pre>{error.status} : {error.statusText}</pre>. Try searching for something else.</p> :
                <div>
                {
                    results.length > 0 ?
                    <div>
                        <p className='lead'>Select a song</p>
                        {
                            results.map(result => 
                                <Result 
                                    key={result.id} 
                                    songInfo={result}
                                    onSelect={onSelect} />
                            )
                        }
                    </div> :
                    <p>No results for "{keyword}". Try searching for something else.</p>
                }
                </div>
            }
            <SearchAgain />
        </div>
            
);

Results.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetchFailed: PropTypes.shape({
        fetchFailed: PropTypes.bool,
        error: PropTypes.object
    }),
    results: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired,
}

export default Results;