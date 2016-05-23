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
    <div style={STYLES.container}>
        {
            fetchFailed ?
            <h1 style={STYLES.header}>Oops, your search failed. Try searching for something else.</h1> :
            <div>
            {
                results.length > 0 ?
                <div>
                    <h1 style={STYLES.header}>Results for: <span style={STYLES.keyword}>{keyword}</span></h1>
                    <div style={STYLES.list}>
                    {
                        results.map(result => 
                            <Result 
                                key={result.id} 
                                songInfo={result}
                                onSelect={onSelect} />
                        )
                    }
                    </div>
                </div> :
                <h1 style={STYLES.header}>No results for: <span style={STYLES.keyword}>{keyword}</span>. Try searching for something else.</h1>
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