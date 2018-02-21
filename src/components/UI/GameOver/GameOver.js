import React from 'react';

import classes from './GameOver.css';
import RestartButton from './RestartButtons/RestartButton';

const GameOver = (props) => {
    let endText = null;

    if (props.won) {
        endText = "You Won!";
    } else {
        endText = "You Lost";
    }
    return (
        <div className={classes.GameOver}>
            <h1>{endText}</h1>
            <RestartButton {...props}/>
        </div>
    );
};

export default GameOver;