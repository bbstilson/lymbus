import React, { PropTypes } from 'react'
import Result from './Result'
import { SearchAgain, Loading } from 'components'
import * as STYLES from 'styles/results'

const Results = ({
    isFetching,
    fetchFailed: { fetchFailed, error },
    results,
    onSelect,
    keyword
}) => (
    isFetching ?
    <Loading /> :
        <div>
            {
                fetchFailed ?
                <p>Oops, your search failed. Try searching for something else.</p> :
                <div>
                {
                    results.length > 0 ?
                    <div>
                        <h1 style={STYLES.header}>Select a song</h1>
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
            
)

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

export default Results