import { searchAgain as buttonStyle } from './global'

export const header = {
    fontSize: '2.5em',
    margin: '1.5em auto 0.5em',
    maxWidth: '800px',
}

export const option = (active) => {
    return {
        ...buttonStyle,
        margin: '5px 5px',
        backgroundColor: active ? 'hsla(0, 0%, 100%, 0.25)' : 'transparent'
    }
}

export const fullLyrics = {
    fontSize: '1.5em',
    paddingBottom: '2em'
}

export const ordered = {
    container: {
        width: '80%',
        maxWidth: '1000px',
        margin: '0 auto',
        paddingBottom: '2em'
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
    paddingBottom: '2em'
}
export const childNav = {
    marginBottom: '2em'
}

export const wordcloud = {
    position: 'relative', 
    width: '80%', 
    maxWidth: '800px', 
    margin: '0 auto'
}