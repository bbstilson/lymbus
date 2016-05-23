import { wrapper } from './global'
import { paddingBottomLg, paddingBottomMd, marginBottomMd } from './global'
import { searchAgain as buttonStyle } from './global'

export const header = {
    fontSize: '2.5em',
    margin: '1.5em auto 0.5em',
    width: '90%',
    maxWidth: '800px'
}

export const option = (active) => {
    return {
        ...buttonStyle,
        margin: '5px',
        backgroundColor: active ? 'hsla(0, 0%, 100%, 0.25)' : 'transparent'
    }
}

export const fullLyrics = {
    ...paddingBottomMd,
    fontSize: '1.5em',
}

export const ordered = {
    container: {
        ...wrapper,
        ...paddingBottomMd,
        maxWidth: '1000px'
    },
    unique: {
        fontSize: '1.75em'
    },
    amount: {
        fontSize: '1.5em',
        textDecoration: 'underline'
    },
    wordContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
    },
    wordLabel: {
        padding: '15px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: 'hsla(0, 0%, 100%, 0.5)',
        fontWeight: '700',
        lineHeight: '1',
        textAlign: 'center',
        verticalAlign: 'baseline',
        borderRadius: '5px',
        margin: '0.5em',
        display: 'inline-block'
    }
}

export const sorted = {
    ...paddingBottomLg
}
export const childNav = {
    ...marginBottomMd
}

export const wordcloud = {
    ...wrapper,
    position: 'relative'
}