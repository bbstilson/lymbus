export const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        throw error
    }
}

export const processSearchResults = res => {
    return res.data.map((item, idx) => {
        return {
            artist: item.artist,
            track: item.track,
            id: idx
        }
    });
}

export const toCamelCase = (...args) => {
    const split = args.map(val => val.split(' '));
    const fixed = split.reduce((out, arr) => out.concat(arr), []);
       
    return fixed.map((word, idx) => 
            idx > 0 ? 
            word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase() : 
            word.toLowerCase())
        .join('');
};

export const processLyrics = ({ data }) => {
    const all = splitByLine(data);
    const wordArr = generateLyricsArray(data);
    const byWord = filterByWord(wordArr);
    const byCount = filterByCount(byWord);
    const uniqueWords = getUniqueWords(byWord);

    return {
        all,
        byWord,
        byCount,
        uniqueWords
    }
}

// helper functions for processLyrics()
const splitByLine = str => {
    return str.split(/\n/);
}

const generateLyricsArray = str => {
    return removePunctuation(str)
            .split(/\n| /)
            .filter(word => word.length > 0)
            .map(word => word.toLowerCase());
}

const filterByWord = arr => {
    return arr.reduce((wordObj, word) => {
        wordObj[word] ? wordObj[word]++ : wordObj[word] = 1;
        return wordObj;
    }, {});
}

const filterByCount = obj => {
    return Object.keys(obj)
        .reduce((countObj, word) => {
            let amt = obj[word];
            countObj[amt] ? countObj[amt].push(word) : countObj[amt] = [word]
            return countObj;
        }, {});
}

const getUniqueWords = obj => {
    return Object.keys(obj).length;
}


const removePunctuation = str => {
    return str.replace(/[^\w'’]/g, ' ');
}