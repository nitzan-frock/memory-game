import React from 'react';

import Tile from './Tile/Tile';

const Tiles = (props) => {
    console.log("in Tiles component");
    console.log(props.tiles);
    return props.tiles.map((tile) => {
        return <Tile 
            img={tile.img}
            click={() => props.clicked(tile.id)} 
            key={tile.id} 
            checked={tile.checked} />;
    });
}

export default Tiles;