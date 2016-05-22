const dim = '45px'
const path = 'public/images'
const borderColor = 'hsla(0, 0%, 60%, 1)'

export const container = {
    margin: '0 auto',
    width: '80%',
    maxWidth: '800px',
    height: dim
}

export const logo = {
    height: '100px',
    background: `transparent url(${path}/logo.png) no-repeat center top`,
    backgroundSize: 'contain',
    margin: '5em'
}

export const input = {
    width: '90%',
    maxWidth: 'calc(100% - 80px)',
    height: '100%',
    fontSize: '1.5em',
    boxSizing: 'border-box',
    background: 'transparent',
    border: 'none',
    borderBottom: `2px solid ${borderColor}`,
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center'
}

export const search = {
    width: dim,
    height: '100%',
    float: 'right',
    background: 'transparent',
    borderRadius: '5px',
    border: `1px solid ${borderColor}`,
    padding: '0'
}

export const icon = {
    height: '100%',
    width: '100%',
    backgroundImage: `url(${path}/search-icon.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '50%'
}