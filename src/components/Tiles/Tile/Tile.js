import React from 'react';

import classes from './Tile.css';

const Tile = (props) => {
    let tile = (
        <p>?</p>
    );

    if (props.checked === true) {
        tile = (
            <img className="image" src={props.img} alt="" />
        );
    }
    
    return (
        <div className={classes.Tile} onClick={props.flipped}>
            {tile}
        </div>
    );
}

export default Tile;