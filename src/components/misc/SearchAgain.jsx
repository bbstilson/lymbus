import React from 'react';
import { Link } from 'react-router';
import { space } from 'styles/global';

export default ({ text }) => (
    <Link to='/'>
        <button 
            type='button'
            style={space}>
            {text ? text : 'Search Again'}
        </button>
    </Link>
)