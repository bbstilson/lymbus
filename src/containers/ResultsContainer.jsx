import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Results } from 'components';
import { fetchResultsIfNeeded } from 'redux/modules/search';
import axios from 'axios';

const mapStateToProps = (state) => {
    const { search: { isFetching, results }} = state;
    return {
        isFetching,
        results
    }
};

class ResultsContainer extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleChoice = (song) => {
        const { artist, track } = song;
        this.context.router.push({
            pathname: '/lyrics',
            query: {
                artist,
                track
            }
        });
    }

    componentDidMount() {
        const { dispatch, location: { query: { keyword }}} = this.props;

        dispatch(fetchResultsIfNeeded(keyword));
    }

    render() {
        const { isFetching, results } = this.props;

        return (
            <Results 
                isFetching={isFetching}
                results={results}
                onSelect={this.handleChoice} />
        );
    }
}

export default connect(mapStateToProps)(ResultsContainer);