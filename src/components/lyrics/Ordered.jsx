import React, { PropTypes } from 'react';
import { word } from 'styles/lyrics';

function sortedKeys (obj, order) {
    return order ? Object.keys(obj) : Object.keys(obj).reverse();
}

const Ordered = ({
    order,
    lyrics: {
        byCount,
        uniqueWords
    }
}) => {
    return (
        <div>
            <h2>Unique Words: {uniqueWords}</h2>
            {sortedKeys(byCount, order).map(num => {
                return (
                    <div key={num}>
                        <h2 >{num}</h2>
                        <div style={word.container}>{
                            byCount[num].map(word => 
                                <span key={word} style={word.label}>{word}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

Ordered.propTypes = {
    order: PropTypes.bool.isRequired,
    lyrics: PropTypes.shape({
        byCount: PropTypes.object.isRequired,
        uniqueWords: PropTypes.number.isRequired
    })
};

export default Ordered;