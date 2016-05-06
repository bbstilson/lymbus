import React, { Component, PropTypes } from 'react';
import { Search } from 'components';

export default class SearchContainer extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor() {
        super();
        this.state = {
            search: ''
        }
    }

    handleSubmitSearch = (e) => {
        e.preventDefault();
        
        this.context.router.push({
            pathname: '/search',
            query: {
                keyword: this.state.search
            }
        });

        this.setState({
            search: ''
        });
    }

    handleUpdateSearch = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    render() {
        return (
            <Search 
                onSubmitSearch={this.handleSubmitSearch}
                onUpdateSearch={this.handleUpdateSearch}
                search={this.state.search} />
        )
    }
}