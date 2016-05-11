const state = {
    // search reducer
    search: {
        history: {
            searchString: [
                {
                    track: '',
                    artist: ''
                },
                // ...
            ]
        },
        fetching: true,
        results: [
            {
                track: '',
                artist: ''
            }
        ]
    },
    // lyrics reducer
    lyrics: {
        history: {
            artistSong: {
                songInfo: {
                    track: '',
                    artist: ''
                },
                byWord: {},
                byCount: {},
                all: [],
                uniqueWords: 0
            }
        },
        fetching: true,
        info: {
            songInfo: {
                track: '',
                artist: ''
            },
            byWord: {},
            byCount: {},
            all: [],
            uniqueWords: 0
        }
    }
};