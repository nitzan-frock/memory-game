import React from 'react';

import styleClasses from './Tile.css';
import Aux from '../../../hoc/Auxillary';

const Tile = (props) => {
    let tile = (
        <Aux>
            <div className={styleClasses.Tile} onClick={props.click}>
                <p>?</p>
            </div>
        </Aux>
    );

    if (props.checked === true) {
        console.log("tile checked");
        tile = (
            <Aux>
                <div className={styleClasses.Tile}>
                    <img className="image" src={props.img} alt="" />
                </div>
            </Aux>
        );
    }
    
    return (tile);
}

export default Tile;