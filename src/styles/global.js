export const paddingBottomSm = { paddingBottom: '1em' }
export const paddingBottomMd = { paddingBottom: '2em' }
export const paddingBottomLg = { paddingBottom: '4em' }
export const marginBottomSm = { marginBottom: '1em' }
export const marginBottomMd = { marginBottom: '2em' }
export const textCenter = { textAlign: 'center' }

export const wrapper = {
    margin: '0 auto',
    width: '90%',
    maxWidth: '800px'
}

export const mainContainer = {
    background: 'linear-gradient(hsla(200, 25%, 22%, 1), hsla(230, 17%, 22%, 1))',
    height: '100%',
    color: 'white',
    overflow: 'auto',
    ...textCenter
}

export const loading = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
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
        width: '90%',
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
            minWidth: '250px',
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

export const footer = {
    container: {
        ...header.container,
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    wrapper: {
        ...header.wrapper,
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px 0'
    },
    anchor: {
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline'
        }
    }
}

export const page = {
    minHeight: '100%',
    position: 'relative'
}