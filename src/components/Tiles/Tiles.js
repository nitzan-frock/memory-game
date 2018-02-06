import React from 'react';

import Tile from './Tile/Tile';

const Tiles = (props) => {
    return props.tiles.map((tile) => {
        return <Tile 
            img={tile.img}
            flipped={() => props.flipped(tile.id)} 
            key={tile.id} 
            checked={tile.checked} />;
    });
}

export default Tiles;