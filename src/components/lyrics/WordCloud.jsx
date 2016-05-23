import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import WordCloud from 'lib/wordcloud'
import { wordcloud } from 'styles/lyrics'

export default class WordCloudContainer extends Component {
    componentDidMount() {
        const lyrics = this.props.lyrics
        const container = findDOMNode(this.cloud)

        const styles = window.getComputedStyle(container)
        const width = styles.width.slice(0, -2)
        container.style.height = `${width * 0.65}px`

        const opts = {
            list: (function () {
                const unordered = Object.keys(lyrics).reduce((list, word) => {
                    list.push([word, lyrics[word]])
                    return list
                }, [])

                return unordered.sort((a, b) => b[1] - a[1])
            })(),
            gridSize: (function () {
                return Math.round(16 * width / 1024)
            })(),
            weightFactor: function (size) {
                return (size + 2) * 4
            },
            rotateRatio: 0.5,
            color: function (word, weight, fontSize) {
                let w = weight > 50 ? 50 : weight
                let color = weight < 3 ? 'white' : `hsla(${200 + (w * 2)}, 80%, 60%, 1)`
                // console.log('w = ', w)
                // console.log('hue = ', `${80 + (w * 5)}`)
                // console.log('sat = ', `${25 + w}%`)
                return color
            },
            fontFamily: '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
            backgroundColor: 'transparent'
        }

        WordCloud(container, opts)
    }

    render() {
        return <div style={wordcloud} ref={node => this.cloud = node} />
    }
}