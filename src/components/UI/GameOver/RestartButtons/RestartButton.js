import React from 'react';

import classes from './RestartButtons.css';

const RestartButton = (props) => {
    return (
        <div className={classes.Buttons}>
            <button onClick={props.restartGame}>Restart</button>
        </div>
    );
};

export default RestartButton;