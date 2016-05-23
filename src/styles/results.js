import { paddingBottomLg } from './global'

export const header = {
    fontSize: '2.5em',
    margin: '1.5em auto 1em',
    width: '90%',
    maxWidth: '800px',
}

export const container = {
    ...paddingBottomLg,
    width: '90%',
    margin: '0 auto'
}

export const keyword = {
    fontStyle: 'italic'
}
export const list = {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
}

export const result = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '1.5em',
    marginBottom: '1.25em',
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline'
    }
}