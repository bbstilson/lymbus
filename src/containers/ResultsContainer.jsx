import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Results } from 'components';
import { fetchSearchResultsIfNeeded } from 'redux/modules/search';

const mapStateToProps = (state) => {
    const { search: { isFetching, results, fetchFailed, error }} = state;
    return {
        isFetching,
        results,
        fetchFailed, 
        error
    }
};

class ResultsContainer extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleChoice = (e, { id, artist, track }) => {
        e.preventDefault();
        
        this.context.router.push({
            pathname: '/lyrics',
            query: {
                id
            },
            state: {
                artist,
                track
            }
        })
    }

    componentDidMount() {
        const { dispatch, location: { query: { keyword }}} = this.props;

        dispatch(fetchSearchResultsIfNeeded(keyword));
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, location: { query: { keyword }}} = this.props
        const nextKeyword = nextProps.location.query.keyword;

        if (nextKeyword !== keyword) {
            dispatch(fetchSearchResultsIfNeeded(nextKeyword))
        }
    }

    render() {
        const { isFetching, results, location: { query: { keyword }}, fetchFailed, error} = this.props;

        return (
            <Results 
                isFetching={isFetching}
                fetchFailed={{ fetchFailed, error }}
                results={results}
                keyword={keyword}
                onSelect={this.handleChoice} />
        );
    }
}

export default connect(mapStateToProps)(ResultsContainer);