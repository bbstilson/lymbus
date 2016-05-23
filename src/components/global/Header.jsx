import React from 'react'
import { Logo } from 'components'
import { SearchContainer } from 'containers'
import { header } from 'styles/global'

export default () => (
    <header style={header.container}>
        <div style={header.wrapper}>
            <Logo active={true} customStyles={header.logo} />
            <SearchContainer 
                placeholder='search again'
                customStyles={header.search} />
        </div>
    </header>
)