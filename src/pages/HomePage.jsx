import React from 'react'
import { Logo, Footer } from 'components'
import { SearchContainer } from 'containers'
import { page as styles } from 'styles/global'

export default () => (
    <div style={styles}>
        <Logo />
        <SearchContainer />
        <Footer />
    </div>
)