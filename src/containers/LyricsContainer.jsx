import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Lyrics } from 'components';
import { fetchLyricsIfNeeded } from 'redux/modules/lyrics'

const mapStateToProps = (state) => {
    const { lyrics: { isFetching, info }} = state;

    return {
        isFetching,
        info
    };
}

class LyricsContainer extends Component {
    constructor() {
        super();
        this.state = {
            order: true,
            mainView: 'Sorted',
            childView: 'Cloud'
        }
    }

    handleChangeMainView = (view) => {
        // console.log('handleChangeMainView called with', view)
        this.setState({
            mainView: view
        });
    }

    handleChangeChildView = (view) => {
        // console.log('handleChangeChildView called with', view)
        this.setState({
            childView: view
        });
    }

    handleChangeOrder = (bool) => {
        // console.log('handleChangeOrder called with', bool)
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
        const { isFetching, info: { songInfo, ...data }} = this.props;

        return (
            <Lyrics 
                isFetching={isFetching}
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