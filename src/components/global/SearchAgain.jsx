import React from 'react'
import { Link } from 'react-router'
import { searchAgain } from 'styles/global'
import Radium from 'radium'

const SearchAgain = ({ text }) => (
    <Link to='/'>
        <button 
            type='button'
            style={searchAgain}>
            {text ? text : 'Search Again'}
        </button>
    </Link>
)

export default Radium(SearchAgain)