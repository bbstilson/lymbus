import React from 'react'
import { Header } from 'components'
import { ResultsContainer } from 'containers'

export default (props) => (
    <div>
        <Header />
        <ResultsContainer location={props.location} />
    </div>
)