import React, { Component, PropTypes } from 'react';
import { Results } from 'components';

const DATA = [ 
    { id: 1, track: 'I Will Survive', artist: 'Cake' },
    { id: 2, track: 'Distance', artist: 'Cake' },
    { id: 3, track: 'Short Skirt/Long Jacket', artist: 'Cake' },
    { id: 4, track: 'Never There', artist: 'Cake' },
    { id: 5, track: 'Friend Is a Four Letter Word', artist: 'Cake' },
    { id: 6, track: 'Perhaps, Perhaps, Perhaps', artist: 'Cake' },
    { id: 7, track: 'Love You Madly', artist: 'Cake' },
    { id: 8, track: 'Comfort Eagle', artist: 'Cake' },
    { id: 9, track: 'Race Car Ya-Yas', artist: 'Cake' },
    { id: 10, track: 'Friend Is a Four Letter Word', artist: 'Cake' },
    { id: 11, track: 'Frank Sinatra', artist: 'Cake' },
    { id: 12, track: 'Mahna Mahna', artist: 'Cake' },
    { id: 13, track: 'Never There', artist: 'Cake' },
    { id: 14, track: 'Nugget', artist: 'Cake' },
    { id: 15, track: 'Perhaps, Perhaps, Perhaps', artist: 'Cake' },
    { id: 16, track: 'Commissioning a Symphony in C', artist: 'Cake' },
    { id: 17, track: 'Distance', artist: 'Cake' },
    { id: 18, track: 'Cake', artist: 'Lloyd Banks' },
    { id: 19, track: 'Let Me Go', artist: 'Cake' },
    { id: 20, track: 'Stickshifts and Safetybelts', artist: 'Cake' } ];

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
            pathname: '/cloud',
            query: {
                artist,
                track
            }
        });
    }

    componentDidMount() {
        // dispatch search action
        const search = this.props.location.query.keyword;

        // fake api delay w/ fake data
        setTimeout(() => {
            this.setState({
                isLoading: false,
                results: DATA
            });
        }, 1000)
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