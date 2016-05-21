import React from 'react';
import Loading from 'react-simple-loading';

const styles = { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 };

export default () => (
    <div style={styles}>
        <Loading 
            stroke={'3px'} 
            size={'80px'} />
    </div>
);