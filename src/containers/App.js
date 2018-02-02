import React, { Component } from 'react';

import './App.css';
import Tiles from '../components/Tiles/Tiles';
import Aux from '../hoc/Auxillary';
import classes from './App.css';

class App extends Component {
  constructor(props){
    super(props);
    let grid = [];
    let tile = null;

    this.state = {
      tiles: [
        {id: 0, img: null, checked: false},
        // {id: 1, img: null, checked: false},
        // {id: 2, img: null, checked: false},
        // {id: 3, img: null, checked: false},
      ],
      images: [
        {id: 0, timesUsed: 0, URL: "http://i0.kym-cdn.com/photos/images/newsfeed/000/915/652/b49.gif"},
        {id: 1, timesUsed: 0, URL: "http://i0.kym-cdn.com/entries/icons/original/000/020/016/wednesday.jpg"},
      ],
      numberOfTilesClicked: 0,
      gameStart: false,
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
        console.log("times image " + images[imgID].id + " has been used: " + images[imgID].timesUsed);
        return {
          tiles: tiles,
          images: images
        }
      });
    }
  }

  flipTileHandler = (tileID) => {
    const tiles = {...this.state.tiles};
    this.setState((prevState, props) => {
      tiles[tileID].checked = !prevState.tiles[tileID].checked;
      return {
        tiles: tiles,
      }
    });
  }

  startGameHandler = () => {
    this.setState((prevState, props) => {
      return {gameStart: !prevState.gameStart}
    });
  }

  render() {
    let tiles = null;
    if (this.state.gameStart === true) {
      tiles = (
        <Tiles 
          tiles={this.state.tiles} 
          img={this.getImg} 
          clicked={this.flipTileHandler} />
      );
    }
    
    return (
      <button onClick={this.startGameHandler}>Start Game</button>
      <div className={classes.grid}>
        {tiles}
      </div>
    );
  }
}

export default App;
