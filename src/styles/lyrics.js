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

export const word = {
    container: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'   
    },
    label: {
        padding: '15px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#777',
        fontWeight: '700',
        lineHeight: '1',
        textAlign: 'center',
        verticalAlign: 'baseline',
        borderRadius: '.25em',
        margin: '0.5em',
        display: 'inline-block'
    }
}

export const fullLyrics = {
    fontSize: '1.5em',
    paddingBottom: '2em'
}