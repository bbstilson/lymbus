import React from 'react'
import { SearchAgain } from 'components';

const styles = {
    display: 'block'
}

export default () => (
    <div>
        <h1>404</h1>
        <p style={styles}>I'm not sure what you're looking for...</p>
        <div style={styles}>
        <iframe src="//giphy.com/embed/gpufDFw0sPBYY" width="480" height="202" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        <p style={styles}>but it's not here.</p>
        <SearchAgain text='Back to Main Search' />
    </div>
)