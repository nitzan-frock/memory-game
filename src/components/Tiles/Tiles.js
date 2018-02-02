import React, { Component } from 'react';

import Tile from './Tile/Tile';

class Tiles extends Component {
    render () {
        return this.props.tiles.map((tile, index) => {
            return <Tile 
                img={() => this.props.img(tile.id)}
                click={() => this.props.clicked(tile.id)} 
                key={tile.id} 
                checked={tile.checked} />
        });
    }
}

export default Tiles;