import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Lyrics } from 'components';
import { fetchLyricsIfNeeded } from 'redux/modules/lyrics'

const mapStateToProps = (state) => {
    const { lyrics: { isFetching, info, fetchFailed, error }} = state;

    return {
        isFetching,
        info,
        fetchFailed,
        error
    };
}

class LyricsContainer extends Component {
    constructor() {
        super();
        this.state = {
            order: true,
            mainView: 'Sorted',
            childView: 'WordCloud'
        }
    }

    handleChangeMainView = (view) => {
        this.setState({
            mainView: view
        });
    }

    handleChangeChildView = (view) => {
        this.setState({
            childView: view
        });
    }

    handleChangeOrder = (bool) => {
        this.setState({
            order: bool
        });
    }

    componentDidMount() {
        const { dispatch, location: { query: { artist, track }}} = this.props;
        dispatch(fetchLyricsIfNeeded(artist, track));
    }

    render() {
        const { childView, mainView, order } = this.state;
        const { isFetching, info: { songInfo, ...data }, fetchFailed, error} = this.props;
    
        return (
            <Lyrics 
                isFetching={isFetching}
                fetchFailed={{ fetchFailed, error }}
                lyrics={data}
                childView={childView}
                mainView={mainView}
                order={order}
                onChangeMainView={this.handleChangeMainView}
                onChangeChildView={this.handleChangeChildView}
                onChangeOrder={this.handleChangeOrder}
                songInfo={songInfo} />
        );
    }
}

export default connect(mapStateToProps)(LyricsContainer);