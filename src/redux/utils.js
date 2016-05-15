export const checkStatus = res => {
    if (res.data.status === 404) {
        throw res.data
    }
    return res;
}

export const processSearchResults = res => {
    return res.data.map((item, idx) => {
        return {
            artist: item.artist,
            track: item.track,
            id: idx
        }
    })
}

export const toCamelCase = (...args) => {
    const split = args.map(val => val.split(' '))
    const flatten = split.reduce((out, arr) => out.concat(arr), [])
       
    return flatten.map((word, idx) => 
            idx > 0 ? 
            word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase() : 
            word.toLowerCase()
        ).join('')
}

export const processLyrics = ({ data }) => {
    const wordArr = generateLyricsArray(data)
    const all = splitByLine(data)
    const byWord = filterByWord(wordArr)
    const byCount = filterByCount(byWord)
    const uniqueWords = getUniqueWords(byWord)

    return { all, byWord, byCount, uniqueWords }
}

// helper functions for processLyrics()

String.prototype.removePunctuation = function () {
    return this.replace(/[^\w'’\[\]-]/g, ' ');
}

String.prototype.removeBrackets = function () {
    return this.replace(/^(\[).+(\])/gm, '');
}

const splitByLine = str => {
    return str.split(/\n/)
}

const generateLyricsArray = str => {
    return str.removeBrackets()
            .removePunctuation()
            .split(/\n| /)
            .filter(word => word.length > 0)
            .map(word => word.toLowerCase())
}

const filterByWord = wordArr => {
    return wordArr.reduce((wordObj, word) => {
        wordObj[word] ? wordObj[word]++ : wordObj[word] = 1
        return wordObj
    }, {})
}

const filterByCount = byWordObj => {
    return Object.keys(byWordObj)
        .reduce((countObj, word) => {
            let amt = byWordObj[word]
            countObj[amt] ? countObj[amt].push(word) : countObj[amt] = [word]
            return countObj
        }, {})
}

const getUniqueWords = byWordObj => {
    return Object.keys(byWordObj).length
}