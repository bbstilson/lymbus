import React from 'react'
import { Header, Footer } from 'components'
import { ResultsContainer } from 'containers'
import { page as styles } from 'styles/global'

export default (props) => (
    <div style={styles}>
        <Header />
        <ResultsContainer location={props.location} />
        <Footer />
    </div>
)