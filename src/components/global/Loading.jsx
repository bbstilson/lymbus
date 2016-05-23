import React from 'react';
import Loading from 'react-simple-loading';
import { loading as styles } from 'styles/global';

export default () => (
    <div style={styles}>
        <Loading 
            color={'white'}
            stroke={'3px'} 
            size={'80px'} />
    </div>
);