import React, { Component, PropTypes } from 'react';
import { Search } from 'components';

export default class SearchContainer extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor() {
        super();
        this.state = {
            search: '',
            placeholder: 'e.g., Kendrick Lamar'
        }
    }

    handleSubmitSearch = (e) => {
        e.preventDefault();

        const search = this.state.search.trim();
        
        if (search) {
            this.context.router.push({
                pathname: '/search',
                query: {
                    keyword: search
                }
            });

            this.setState({
                search: ''
            });
        } else {
            this.setState({
                placeholder: 'Please enter a search',
                search: ''
            })
        }
    }

    handleUpdateSearch = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    render() {
        const { search, placeholder } = this.state;
        
        return (
            <Search
                onSubmitSearch={this.handleSubmitSearch}
                onUpdateSearch={this.handleUpdateSearch}
                search={search}
                placeholder={placeholder} />
        )
    }
}