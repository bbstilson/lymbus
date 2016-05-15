String.prototype.removePunctuation = function () {
    return this.replace(/[^\w']/g, ' ');    
}

function cleanArtistInput (str) {
    return decodeURIComponent(str)
        .replace(/\W|(the)/gi, '')
        .toLowerCase()
}

function cleanTrackInput (str) {
    return decodeURIComponent(str)
        .replace(/\W/g, '')
        .toLowerCase();
}

function cleanSearchInput (str) {
    return str.removePunctuation()
        .replace(/\s/g, '+')
        .toLowerCase()
}

function capitalizeFirstLetter (str) {
    const parts = ['I','II','III', 'IV','V','IV','IIV','IIIV','IX','X'];
    return str.split(' ')
        .map(word => {
            // check for 'parts', e.g., 'I', 'II', etc.
            if (!!~parts.indexOf(word)) return word.toUpperCase();

            const firstLetter = word.slice(0, 1);

            // checking for remix parens, e.g., Artist - Song (Person Remix)
            return firstLetter === '(' ? 
                word.slice(0, 2).toUpperCase() + word.slice(2).toLowerCase() :
                firstLetter + word.slice(1).toLowerCase()
        })
        .join(' ');
}

function trimResults (arr) {
    /*
        results include current page and *may* include pagination.

        if there is pagination, i.e., length = 22 (20 results plus current page and pagination)
            trim off the first and last
        else 
            only trim off first
    */
    return arr.length === 22 ? arr.slice(1, arr.length - 1) : arr.slice(1, arr.length);
}

function sanitize (str) {
    return str.replace(/\W/gi, '');
}

module.exports = {
    cleanArtistInput: cleanArtistInput,
    cleanTrackInput: cleanTrackInput,
    cleanSearchInput: cleanSearchInput,
    capitalizeFirstLetter: capitalizeFirstLetter,
    trimResults: trimResults,
    sanitize: sanitize
}