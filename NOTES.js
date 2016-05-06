const lyrics = "Some people say I look like me dad What Are you serious Ah Ohh Hey Hey Ah Ohh Ah Ohh I said hey boy sittin in your tree Mummy always wants you to come for tea Don't be shy straighten up your tie Get down from your tree house sittin in the sky I wanna know just what to do Is it very big is there room for two I got a house with windows and doors I'll show you mine if you show me yours Gotta let me in hey hey hey Let the fun begin hey I'm the wolf today hey hey hey I'll huff I'll puff I'll huff I'll puff I'll blow you away Say you will say you won't Say you'll do what I don't Say you're true say to me c'est la vie Do you play with the girls play with the boys Do you ever get lonely playing with your toys We can talk we can sing I'll be the queen and you'll be the king Hey boy in your tree Throw down your ladder make a room for me I got a house with windows and doors I'll show you mine if you show me yours Gotta let me in hey hey hey Let the fun begin hey I'm the wolf today hey hey hey I'll huff I'll puff I'll huff I'll puff and blow you away Say you will say you won't Say you'll do what I don't Say you're true say to me c'est la vie Say you will say you won't Say you'll do what I don't Say you're true say to me c'est la vie Hey Hey Na Na Na Hey Na Na Na Ho Na Na Na Hey Hey Hey Hey Say you will say you won't Say you'll do what I don't Say you're true say to me c'est la vie Say you will say you won't Say you'll do what I don't Say you're true say to me c'est la vie Na Na Na Ho Na Na Na Hey Hey Hey Hey";


const lyricFrequency = lyrics.split(' ').reduce((lyrics, word) => {
    word = word.toLowerCase();
    lyrics[word] ? lyrics[word]++ : lyrics[word] = 1;
    return lyrics;
}, {});

const lyricFrequencyKeys = Object.keys(lyricFrequency);
const uniqueWords = lyricFrequencyKeys.length;

const filteredByCount = lyricFrequencyKeys.reduce((countObj, word) => {
    let amt = lyricFrequency[word];
    if (countObj[amt]) {
        countObj[amt] = [
            ...countObj[amt],
            word
        ];
    } else {
        countObj[amt] = [word];
    }
    return countObj;
}, {});


console.log('Unique words : ' + uniqueWords);
const sortedKeys = Object.keys(filteredByCount).sort((a, b) => a > b);

function printWordsInOrder(obj, keys) {
    keys.forEach(count => {
        if (count == 1) {
            console.log(count + ' time : ' + obj[count].join(', '));
        } else {
            console.log(count + ' times : ' + obj[count].join(', '));
        }
    });
}

printWordsInOrder(filteredByCount, sortedKeys);