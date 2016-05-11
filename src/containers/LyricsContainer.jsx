import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Lyrics } from 'components';
import { fetchLyricsIfNeeded } from 'redux/modules/lyrics'

const mapStateToProps = (state) => {
    const { lyrics: { isFetching, info }} = state;

    return {
        isFetching,
        info
    };
}

class LyricsContainer extends Component {
    constructor() {
        super();
        this.state = {
            order: true,
            mainView: 'Sorted',
            childView: 'WordCloud'
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
        const { dispatch, location: { query: { artist, track }}} = this.props;
        dispatch(fetchLyricsIfNeeded(artist, track));
    }

    render() {
        const { childView, mainView, order } = this.state;
        const { isFetching, info: { songInfo, ...data }} = this.props;
        const TEMP = {
            isFetching: false,
            info: {
                songInfo: {
                    artist: 'Dance Farty Dance',
                    track: 'BUBBLE BUBBLE'
                },
                all: [
                    "I'm sick of twisting the knobs, your little baby's a slob",
                    "I wanna love you but this house ain't built for two",
                    "I think I panic a lot, not really sure what I've got",
                    "I wanna love you but this house ain't built for two",
                    "I'm sick of twisting the knobs",
                    "(So where's my sweet love)",
                    "I think I've hidden from myself, but there's too many layers",
                    "I turn my head and cough",
                    "Like I'm calling the cops",
                    "Is there something more to you than just bible study?",
                    "",
                    "Turn your camera on",
                    "You don't wanna miss this",
                    "The way lighting shifts",
                    "As it reflects off the water",
                    "Below this sinking ship",
                    "I feel your fingertips.. slipping away",
                    "Can't shake the feeling now",
                    "How far we've fallen down",
                    "Like our best days are behind us",
                    "You're the revisionist",
                    "And I'm the narcissist.. drifting away",
                    "",
                    "To my sunstroke ghost dance gold corona",
                    "Did I crack that lens, put my weight upon ya",
                    "Does the manifest dictate to love and honor",
                    "Can the creed uphold, can we repeat our mantra",
                    "",
                    "Trust my luck and show my feelings",
                    "Cross my fingers, cards are dealing",
                    "Busting out my skull shaped ceiling",
                    "Hold my fucking body back",
                    "",
                    "I'm still raging from the sanction you placed upon the impoverished nations",
                    "Delusions of grandeur, have some patience",
                    "Hold my fucking body back",
                    "",
                    "I can't predict the future",
                    "And I can't forget the past",
                    "Can't focus any longer",
                    "Desperate to make this last",
                    "Keep us from going under",
                    "Won't waste all that we have",
                    "You called it in November",
                    "And it burned up in a flash",
                    "",
                    "Burned up in a flash",
                    "",
                    "Feel the hangover in my mind",
                    "But this one's a different kind",
                    "Losing touch of the concept of time",
                    "My senses are frozen",
                    "Losing touch with my concept of time",
                    "My senses are frozen",
                    "",
                    "I'm sick of twisting the knobs, your little baby's a slob",
                    "I wanna love you but this house ain't built for two",
                    "I think I panic a lot, not really sure what I've got",
                    "I wanna love you but this house ain't built for two",
                    "I'm sick of twisting the knobs",
                    "(So where's my sweet love)",
                    "I think I've hidden from myself, but there's too many layers",
                    "I turn my head and cough",
                    "Like I'm calling the cops",
                    "Is there something more to you than just bible study?",
                    ""
                ],
                uniqueWords: 181,
                byCount: {
                    1: [ "camera", "on", "don't", "miss", "way", "lighting", "shifts", "as", "reflects", "off", "water", "below", "sinking", "ship", "fingertips", "slipping", "shake", "feeling", "now", "how", "far", "we've", "fallen", "down", "best", "days", "behind", "you're", "revisionist", "narcissist", "drifting", "sunstroke", "ghost", "dance", "gold", "corona", "did", "crack", "lens", "put", "weight", "ya", "does", "manifest", "dictate", "honor", "creed", "uphold", "repeat", "mantra", "trust", "luck", "show", "feelings", "cross", "fingers", "cards", "dealing", "busting", "out", "skull", "shaped", "ceiling", "still", "raging", "sanction", "placed", "impoverished", "nations", "delusions", "grandeur", "some", "patience", "predict", "future", "forget", "past", "focus", "any", "longer", "desperate", "make", "last", "keep", "going", "under", "won't", "waste", "all", "called", "november", "hangover", "mind", "one's", "different", "kind", "with"],
                    2: [ "little", "baby's", "slob", "panic", "lot", "not", "really", "sure", "what", "got", "so", "where's", "sweet", "hidden", "myself", "there's", "too", "many", "layers", "head", "cough", "calling", "cops", "is", "there", "something", "more", "than", "just", "bible", "study", "feel", "away", "our", "us", "that", "upon", "can", "we", "hold", "fucking", "body", "back", "have", "burned", "up", "flash", "losing", "touch", "concept", "time", "senses", "frozen" ],
                    3: ["turn", "like", "it"],
                    4: ["sick", "twisting", "knobs", "your", "house", "ain't", "built", "for", "two", "think", "i've", "from", "can't", "are", "in"],
                    5: ["wanna", "to"],
                    7: [ "a", "love", "but", "and" ],
                    8: [ "i'm", "of", "this"],
                    9: ["you"],
                    16: ["i", "my"],
                    19: ["the"],
                },
                byWord: {
                    "a": 7,
                    "ain't" : 4,
                    "all" : 1,
                    "and" : 7,
                    "any" : 1,
                    "are" : 4,
                    "as" : 1,
                    "away" : 2,
                    "baby's" : 2,
                    "back" : 2,
                    "behind" : 1,
                    "below" : 1,
                    "best" : 1,
                    "bible" : 2,
                    "body" : 2,
                    "built" : 4,
                    "burned" : 2,
                    "busting" : 1,
                    "but" : 7,
                    "called" : 1,
                    "calling" : 2,
                    "camera" : 1,
                    "can" : 2,
                    "can't" : 4,
                    "cards" : 1,
                    "ceiling" : 1,
                    "concept" : 2,
                    "cops" : 2,
                    "corona" : 1,
                    "cough" : 2,
                    "crack" : 1,
                    "creed" : 1,
                    "cross" : 1,
                    "dance" : 1,
                    "days" : 1,
                    "dealing" : 1,
                    "delusions" : 1,
                    "desperate" : 1,
                    "dictate" : 1,
                    "did" : 1,
                    "different" : 1,
                    "does" : 1,
                    "don't" : 1,
                    "down" : 1,
                    "drifting" : 1,
                    "fallen" : 1,
                    "far" : 1,
                    "feel" : 2,
                    "feeling" : 1,
                    "feelings" : 1,
                    "fingers" : 1,
                    "fingertips" : 1,
                    "flash" : 2,
                    "focus" : 1,
                    "for" : 4,
                    "forget" : 1,
                    "from" : 4,
                    "frozen" : 2,
                    "fucking" : 2,
                    "future" : 1,
                    "ghost" : 1,
                    "going" : 1,
                    "gold" : 1,
                    "got" : 2,
                    "grandeur" : 1,
                    "hangover" : 1,
                    "have" : 2,
                    "head" : 2,
                    "hidden" : 2,
                    "hold" : 2,
                    "honor" : 1,
                    "house" : 4,
                    "how" : 1,
                    "i" : 16,
                    "i'm ": 8,
                    "i've" : 4,
                    "impoverished" : 1,
                    "in" : 4,
                    "is" : 2,
                    "it" : 3,
                    "just" : 2,
                    "keep" : 1,
                    "kind" : 1,
                    "knobs" : 4,
                    "last" : 1,
                    "layers" : 2,
                    "lens" : 1,
                    "lighting" : 1,
                    "like" : 3,
                    "little" : 2,
                    "longer" : 1,
                    "losing" : 2,
                    "lot" : 2,
                    "love" : 7,
                    "luck" : 1,
                    "make" : 1,
                    "manifest" : 1,
                    "mantra" : 1,
                    "many" : 2,
                    "mind" : 1,
                    "miss" : 1,
                    "more" : 2,
                    "my" : 16,
                    "myself" : 2,
                    "narcissist" : 1,
                    "nations" : 1,
                    "not" : 2,
                    "november" : 1,
                    "now" : 1,
                    "of" : 8,
                    "off" : 1,
                    "on" : 1,
                    "one's" : 1,
                    "our" : 2,
                    "out" : 1,
                    "panic" : 2,
                    "past" : 1,
                    "patience" : 1,
                    "placed" : 1,
                    "predict" : 1,
                    "put" : 1,
                    "raging" : 1,
                    "really" : 2,
                    "reflects" : 1,
                    "repeat" : 1,
                    "revisionist" : 1,
                    "sanction" : 1,
                    "senses" : 2,
                    "shake" : 1,
                    "shaped" : 1,
                    "shifts" : 1,
                    "ship" : 1,
                    "show" : 1,
                    "sick" : 4,
                    "sinking" : 1,
                    "skull" : 1,
                    "slipping" : 1,
                    "slob" : 2,
                    "so" : 2,
                    "some" : 1,
                    "something" : 2,
                    "still" : 1,
                    "study" : 2,
                    "sunstroke" : 1,
                    "sure" : 2,
                    "sweet" : 2,
                    "than" : 2,
                    "that" : 2,
                    "the" : 19,
                    "there" : 2,
                    "there's ": 2,
                    "think" : 4,
                    "this" : 8,
                    "time" : 2,
                    "to" : 5,
                    "too" : 2,
                    "touch" : 2,
                    "trust" : 1,
                    "turn" : 3,
                    "twisting" : 4,
                    "two" : 4,
                    "under" : 1,
                    "up" : 2,
                    "uphold" : 1,
                    "upon" : 2,
                    "us" : 2,
                    "wanna" : 5,
                    "waste" : 1,
                    "water" : 1,
                    "way" : 1,
                    "we" : 2,
                    "we've ": 1,
                    "weight" : 1,
                    "what" : 2,
                    "where's" : 2,
                    "with" : 1,
                    "won't ": 1,
                    "ya" : 1,
                    "you" : 9,
                    "you're" : 1,
                    "your" : 4,
                }
            }
        }
        // const { isFetching, info: { songInfo, ...data }} = TEMP;
        return (
            <Lyrics 
                isFetching={isFetching}
                lyrics={data}
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

export default connect(mapStateToProps)(LyricsContainer);