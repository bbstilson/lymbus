import React, { PropTypes } from 'react';
import { ordered } from 'styles/lyrics';

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
        <div style={ordered.container}>
            <h2 style={ordered.unique}>Unique Words: {uniqueWords}</h2>
            {sortedKeys(byCount, order).map(num => {
                return (
                    <div key={num}>
                        <h2 style={ordered.wordContainer}>{`${num} ${num === '1' ? 'time' : 'times'}`}
                        </h2>
                        <div style={ordered.container}>{
                            byCount[num].map(word => 
                                <span key={word} style={ordered.wordLabel}>{word}</span>
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