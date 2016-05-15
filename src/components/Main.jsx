import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transparentBg } from 'styles';

export default (props) => (
    <div className='jumbotron col-sm-12 text-center' style={transparentBg}>
        {props.children}
    </div>
)

/*
<ReactCSSTransitionGroup
    transitionName="appear"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}>
        {React.cloneElement(props.children, { key: props.location.pathname })}
</ReactCSSTransitionGroup>
*/