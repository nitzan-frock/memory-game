import React from 'react';

import styleClasses from './Tile.css';

const Tile = (props) => {
    let tile = (
            <div className={styleClasses.Tile} onClick={props.click}>
                <p>?</p>
            </div>
    );

    if (props.checked === true) {
        console.log("tile checked");
        tile = (
                <div className={styleClasses.Tile}>
                    <img className="image" src={props.img} alt="" />
                </div>
        );
    }
    
    return (tile);
}

export default Tile;