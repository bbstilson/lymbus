import React, { Component } from 'react';
import { Lyrics } from 'components';

const DATA = {
    all: [
        "Some people say I look like me dad",
        "What Are you serious?",
        "Ah Ohh Hey Hey",
        "Ah Ohh Ah Ohh", 
        "I said hey boy sittin in your tree",
        "Mummy always wants you to come for tea",
        "Don't be shy straighten up your tie",
        "Get down from your tree house sittin in the sky",
        "I wanna know just what to do",
        "Is it very big is there room for two",
        "I got a house with windows and doors",
        "I'll show you mine if you show me yours",
        "Gotta let me in hey hey hey",
        "Let the fun begin hey",
        "I'm the wolf today hey hey hey",
        "I'll huff I'll puff",
        "I'll huff I'll puff I'll blow you away",
        "Say you will say you won't",
        "Say you'll do what I don't",
        "Say you're true say to me",
        "c'est la vie",
        "Do you play with the girls play with the boys",
        "Do you ever get lonely playing with your toys",
        "We can talk we can sing",
        "I'll be the queen and you'll be the king",
        "Hey boy in your tree",
        "Throw down your ladder make a room for me",
        "I got a house with windows and doors",
        "I'll show you mine if you show me yours",
        "Gotta let me in hey hey hey",
        "Let the fun begin hey",
        "I'm the wolf today hey hey hey",
        "I'll huff I'll puff",
        "I'll huff I'll puff and blow you away",
        "Say you will say you won't",
        "Say you'll do what I don't",
        "Say you're true say to me",
        "c'est la vie",
        "Say you will say you won't",
        "Say you'll do what I don't",
        "Say you're true say to me",
        "c'est la vie",
        "Hey Hey Na Na Na",
        "Hey Na Na Na Ho",
        "Na Na Na Hey Hey Hey Hey",
        "Say you will say you won't",
        "Say you'll do what I don't",
        "Say you're true say to me",
        "c'est la vie",
        "Say you will say you won't",
        "Say you'll do what I don't",
        "Say you're true say to me",
        "c'est la vie",
        "Na Na Na Ho",
        "Na Na Na Hey",
        "Hey Hey Hey"],
    byWord: {
        "a": 3,
        "ah": 3,
        "always": 1,
        "and": 4,
        "are": 1,
        "away": 2,
        "be": 3,
        "begin": 2,
        "big": 1,
        "blow": 2,
        "boy": 2,
        "boys": 1,
        "c'est": 5,
        "can": 2,
        "come": 1,
        "dad": 1,
        "do": 8,
        "don't": 6,
        "doors": 2,
        "down": 2,
        "ever": 1,
        "for": 3,
        "from": 1,
        "fun": 2,
        "get": 2,
        "girls": 1,
        "got": 2,
        "gotta": 2,
        "hey": 29,
        "ho": 2,
        "house": 3,
        "huff": 4,
        "i": 10,
        "i'll": 12,
        "i'm": 2,
        "if": 2,
        "in": 5,
        "is": 2,
        "it": 1,
        "just": 1,
        "king": 1,
        "know": 1,
        "la": 5,
        "ladder": 1,
        "let": 4,
        "like": 1,
        "lonely": 1,
        "look": 1,
        "make": 1,
        "me": 11,
        "mine": 2,
        "mummy": 1,
        "na": 15,
        "ohh": 3,
        "people": 1,
        "play": 2,
        "playing": 1,
        "puff": 4,
        "queen": 1,
        "room": 2,
        "said": 1,
        "say": 26,
        "serious": 1,
        "show": 4,
        "shy": 1,
        "sing": 1,
        "sittin": 2,
        "sky": 1,
        "some": 1,
        "straighten": 1,
        "talk": 1,
        "tea": 1,
        "the": 9,
        "there": 1,
        "throw": 1,
        "tie": 1,
        "to": 7,
        "today": 2,
        "toys": 1,
        "tree": 3,
        "true": 5,
        "two": 1,
        "up": 1,
        "very": 1,
        "vie": 5,
        "wanna": 1,
        "wants": 1,
        "we": 2,
        "what": 7,
        "will": 5,
        "windows": 2,
        "with": 5,
        "wolf": 2,
        "won't": 5,
        "you": 20,
        "you'll": 6,
        "you're": 5,
        "your": 6,
        "yours": 2
    },
    byCount: {
        "1": ["some", "people", "look", "like", "dad", "are", "serious", "said", "mummy", "always", "wants", "come", "tea", "shy", "straighten", "up", "tie", "from", "sky", "wanna", "know", "just", "it", "very", "big", "there", "two", "girls", "boys", "ever", "lonely", "playing", "toys", "talk", "sing", "queen", "king", "throw", "ladder", "make"],
        "10": ["i"],
        "11": ["me"],
        "12": ["i'll"],
        "15": ["na"],
        "2": ["boy", "sittin", "get", "down", "is", "room", "got", "windows", "doors", "mine", "if", "yours", "gotta", "fun", "begin", "i'm", "wolf", "today", "blow", "away", "play", "we", "can", "ho"],
        "20": ["you"],
        "26": ["say"],
        "29": ["hey"],
        "3": ["ah", "ohh", "tree", "for", "be", "house", "a"],
        "4": ["and", "show", "let", "huff", "puff"],
        "5": ["in", "with", "will", "won't", "you're", "true", "c'est", "la", "vie"],
        "6": ["your", "don't", "you'll"],
        "7": ["what", "to"],
        "8": ["do"],
        "9": ["the"]
    },
    uniqueWords: 99 };

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
        console.log('handleChangeMainView called with', view)
        this.setState({
            mainView: view
        });
    }

    handleChangeChildView = (view) => {
        console.log('handleChangeChildView called with', view)
        this.setState({
            childView: view
        });
    }

    handleChangeOrder = (bool) => {
        console.log('handleChangeOrder called with', bool)
        this.setState({
            order: bool
        });
    }

    componentDidMount() {
        // dispatch lyrics search
        const { artist, track } = this.props.location.query;
        
        // fake api w/ data
        setTimeout(() => {
            this.setState({
                isLoading: false,
                lyrics: DATA,
                songInfo: { artist, track }
            });
        }, 100);
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