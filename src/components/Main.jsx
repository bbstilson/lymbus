import React from 'react';
import { mainContainer } from 'styles/global';

export default (props) => (
    <div style={mainContainer}>
        {props.children}
    </div>
)