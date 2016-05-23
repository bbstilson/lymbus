import React from 'react'
import { Header, Footer } from 'components'
import { LyricsContainer } from 'containers'

export default (props) => (
    <div>
        <Header />
        <LyricsContainer location={props.location} />
        <Footer />
    </div>
)