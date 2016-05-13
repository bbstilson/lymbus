import React, { PropTypes } from 'react';
import { SearchAgain } from 'components';

const RequestFailed = ({
    songInfo,
    error 
}) => (
    <div>
        <h3>Oops. There was a problem with your search: <pre>{error.status} : {error.statusText}</pre></h3>
        <h3>Try searching for something different.</h3>
    </div>
);

RequestFailed.propTypes = {
    error: PropTypes.shape({
        status: PropTypes.number,
        statusText: PropTypes.string
    })
}

export default RequestFailed;