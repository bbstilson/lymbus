export const transparentBg = { background: 'transparent' }
export const spaceBottom = { marginBottom: '10px' }
export const space = { margin: '5px' }
export const textCenter = { textAlign: 'center' }

export const mainContainer = {
    background: 'linear-gradient(hsla(200, 25%, 22%, 1), hsla(230, 17%, 22%, 1))',
    height: '100%',
    color: 'white',
    overflow: 'auto',
    ...textCenter
}

export const loading = {
    height: '100%',
    width: '100%'
}

export const logo = {
    height: '80px',
    margin: '5em',
    paddingRight: '30px'
}

export const searchAgain = {
    borderRadius: 5,
    padding: '10px 15px',
    margin: '1em 0',
    color: 'white',
    backgroundColor: 'transparent',
    border: '1px solid white',
    cursor: 'pointer',
    fontSize: '1.25em',
    transition: 'background-color 0.1s',
    ':hover': {
        backgroundColor: 'hsla(0, 0%, 100%, 0.1)'
    }
}

export const header = {
    container: {
        height: '50px',
        width: '100%',
    },
    wrapper: {
        width: '100%',
        height: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px 0 0'
    },
    logo: {
        height: '35px',
        float: 'left'
    },
    search: {
        container: {
            float: 'right',
            height: '35px',
            width: '33.3%',
            minWidth: '300px',
            margin: 0,
        },
        input: {
            fontSize: '1em'
        },
        search: {
            width: '35px',
            height: '35px'
        }
    }
}