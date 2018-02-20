import React from 'react';

const score = (props) => {
    let matches;
    if (props.pairsMatched === 1) {
        matches = props.pairsMatched + " pair matched!"
    } else {
        matches = props.pairsMatched + " pairs matched!"
    }
    return (
        <h2>Score: {matches}</h2>
    );
};

export default score;