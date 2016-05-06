import React from 'react';
import { Link } from 'react-router';

export default () => (
    <Link to='/'>
        <button 
            type='button'
            className='btn btn-lg btn-danger'>
            Search Again
        </button>
    </Link>
)