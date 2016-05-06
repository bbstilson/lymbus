import React, { Component, PropTypes } from 'react';
import { Results } from 'components';
import axios from 'axios';

export default class ResultsContainer extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor() {
        super();
        this.state = {
            isLoading: true,
            results: [],
        }
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
        // dispatch search action
        const search = this.props.location.query.keyword;
        const url = `/api/search?keyword=${search}`;

        axios(url) 
            .then(checkStatus)
            .then(processResults)
            .then(results => {
                this.setState({
                    isLoading: false,
                    results
                });
            })
            .catch(err => console.warn('Error in componentDidMount of ResultsContainer', err));

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }

        function processResults (res) {
            return res.data.map((item, idx) => {
                return {
                    artist: item.artist,
                    track: item.track,
                    id: idx
                }
            })
        }
    }

    render() {
        const { isLoading, results } = this.state;

        return (
            <Results 
                isLoading={isLoading}
                results={results}
                onSelect={this.handleChoice} />
        );
    }
}