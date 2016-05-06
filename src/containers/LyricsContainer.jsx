import React, { Component } from 'react';
import axios from 'axios';
import { Lyrics } from 'components';

export default class LyricsContainer extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            lyrics: { all: [''], byWord: {}, byCount: {}, uniqueWords: 0 },
            order: true,
            songInfo: { track: '', artist: '' },
            mainView: 'Sorted',
            childView: 'Cloud'
        }
    }

    handleChangeMainView = (view) => {
        // console.log('handleChangeMainView called with', view)
        this.setState({
            mainView: view
        });
    }

    handleChangeChildView = (view) => {
        // console.log('handleChangeChildView called with', view)
        this.setState({
            childView: view
        });
    }

    handleChangeOrder = (bool) => {
        // console.log('handleChangeOrder called with', bool)
        this.setState({
            order: bool
        });
    }

    componentDidMount() {
        const { artist, track } = this.props.location.query;
        const url = `/api/lyrics?artist=${artist}&track=${track}`;

        axios(url) 
            .then(checkStatus)
            .then(processLyrics)
            .then(lyrics => {
                this.setState({
                    isLoading: false,
                    lyrics,
                    songInfo: { artist, track }
                });
            })
            .catch(err => console.warn('Error in componentDidMount of LyricsContainer:', err));

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }

        function processLyrics ({ data }) {
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

        function splitByLine (str) {
            return str.split(/\n/);
        }

        function generateLyricsArray (str) {
            return removePunctuation(str)
                    .split(/\n| /)
                    .filter(word => word.length > 0)
                    .map(word => word.toLowerCase());
        }

        function filterByWord (arr) {
            return arr.reduce((wordObj, word) => {
                wordObj[word] ? wordObj[word]++ : wordObj[word] = 1;
                return wordObj;
            }, {});
        }

        function filterByCount (obj) {
            return Object.keys(obj)
                .reduce((countObj, word) => {
                    let amt = obj[word];
                    countObj[amt] ? countObj[amt].push(word) : countObj[amt] = [word]
                    return countObj;
                }, {});
        }

        function getUniqueWords (obj) {
            return Object.keys(obj).length;
        }

        
        function removePunctuation (str) {
            return str.replace(/[^\w'’]/g, ' ');
        }
    }

    render() {
        const { isLoading, lyrics, childView, mainView, order, songInfo } = this.state;

        return (
            <Lyrics 
                isLoading={isLoading}
                lyrics={lyrics}
                childView={childView}
                mainView={mainView}
                order={order}
                onChangeMainView={this.handleChangeMainView}
                onChangeChildView={this.handleChangeChildView}
                onChangeOrder={this.handleChangeOrder}
                songInfo={songInfo} />
        );
    }
}