import React from 'react'
import { Header, Footer } from 'components'
import { LyricsContainer } from 'containers'
import { page as styles } from 'styles/global'

export default (props) => (
    <div style={styles}>
        <Header />
        <LyricsContainer location={props.location} />
        <Footer />
    </div>
)