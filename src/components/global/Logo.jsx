import React from 'react'
import { Link } from 'react-router'
import { logo } from 'styles/global'

export default (props) => (
    <div>
    {
        props.active ?
        <Link to='/'>
            <img src='public/images/logo.png' style={props.customStyles ? props.customStyles : logo}/>
        </Link> :
        <img src='public/images/logo.png' style={props.customStyles ? props.customStyles : logo}/>
    }
    </div>
)