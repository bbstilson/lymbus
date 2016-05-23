import React from 'react'
import { Header } from 'components'
import { LyricsContainer } from 'containers'

export default (props) => (
    <div>
        <Header />
        <LyricsContainer location={props.location} />
    </div>
)