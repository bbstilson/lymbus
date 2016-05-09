import React from 'react';
import { Link } from 'react-router';
import { space } from 'styles';

export default () => (
    <Link to='/'>
        <button 
            type='button'
            className='btn btn-lg btn-danger'
            style={space}>
            Search Again
        </button>
    </Link>
)