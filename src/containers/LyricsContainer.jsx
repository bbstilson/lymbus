import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Lyrics } from 'components'
import { fetchLyricsIfNeeded } from 'redux/modules/lyrics'

const mapStateToProps = (state) => {
    const { lyrics: { isFetching, data, fetchFailed, error }} = state

    return {
        isFetching,
        data,
        fetchFailed,
        error
    }
}

class LyricsContainer extends Component {
    constructor() {
        super()
        this.state = {
            order: true,
            mainView: 'Sorted',
            childView: 'WordCloud'
        }
    }

    handleChangeMainView = (view) => {
        this.setState({
            mainView: view
        })
    }

    handleChangeChildView = (view) => {
        this.setState({
            childView: view
        })
    }

    handleChangeOrder = (bool) => {
        this.setState({
            order: bool
        })
    }

    componentDidMount() {
        const { dispatch, location: { query: { id }}} = this.props
        dispatch(fetchLyricsIfNeeded(id))
    }

    render() {
        const { childView, mainView, order } = this.state
        const { isFetching, data, fetchFailed, error, location: { state }} = this.props
    
        return (
            <Lyrics 
                isFetching={isFetching}
                fetchFailed={{ fetchFailed, error }}
                data={data}
                childView={childView}
                mainView={mainView}
                order={order}
                onChangeMainView={this.handleChangeMainView}
                onChangeChildView={this.handleChangeChildView}
                onChangeOrder={this.handleChangeOrder}
                songInfo={state} />
        )
    }
}


const puke = (data) => <pre style={{textAlign: 'left'}}>{JSON.stringify(data, null, 4)}</pre>

export default connect(mapStateToProps)(LyricsContainer)