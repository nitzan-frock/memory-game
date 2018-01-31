import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tiles: [
        {id: 0, img: null, checked: false},
        {id: 1, img: null, checked: false},
        {id: 2, img: null, checked: false},
        {id: 3, img: null, checked: false},
      ],
      images: [
        {id: 0, timesUsed: 0, URL: "http://i0.kym-cdn.com/photos/images/newsfeed/000/915/652/b49.gif"},
        {id: 1, timesUsed: 0, URL: "http://i0.kym-cdn.com/entries/icons/original/000/020/016/wednesday.jpg"},
      ],
      numberOfTilesClicked: 0,
    }
  }

  getImg = (tileID) => {
    const imgID = Math.floor(Math.random()*2);
    const images = {...this.state.images};
    const tiles = {...this.state.tiles};

    if (images[imgID].timesUsed < 2) {
      tiles[tileID].img = images[imgID].URL;
      
      this.setState((prevState, props) => {
        images[imgID].timesUsed = prevState.images[imgID].timesUsed + 1;
        return {
          tiles: tiles,
          images: images
        }
      });
    }
  }

  flipTileHandler = () => {
    this.setState((prevState, props) => {
      return {

      }
    });
  }

  render() {
    let tiles = (
      <Tiles 
        tiles={this.state.tiles} 
        img={this.getImg} 
        clicked={this.flipTileHandler} />
    );

    return (
      <>
        {tiles}
      </>
    );
  }
}

export default App;
