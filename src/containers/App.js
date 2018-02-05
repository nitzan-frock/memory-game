import React, { Component } from 'react';

import './App.css';
import Tiles from '../components/Tiles/Tiles';
import Aux from '../hoc/Auxillary';
import classes from './App.css';

const IMAGES = [
  {URL: "http://i0.kym-cdn.com/photos/images/newsfeed/000/915/652/b49.gif"},
  {URL: "http://i0.kym-cdn.com/entries/icons/original/000/020/016/wednesday.jpg"},
  {URL: "https://thumbs-prod.si-cdn.com/yvyBUlWt-LPMnhEbBLV5gpX0vhQ=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/0c/5f/0c5fc6f8-1b9b-4510-8b15-163482a3e041/istock_6413768_medium.jpg"},
  {URL: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5Ny8wNzQvb3JpZ2luYWwvbW9ua2V5LWNvdW50aW5nLmpwZw=="},
  {URL: "https://images.pexels.com/photos/236230/pexels-photo-236230.jpeg?h=350&auto=compress&cs=tinysrgb"},
  {URL: "https://www.wpcc.org.uk/images/nature/mammals/header-squirrel.jpg"},
  {URL: "https://cnet3.cbsistatic.com/img/FS1oJLl_P4eOmsXtJW4iy8mBSVA=/fit-in/970x0/2017/12/04/15331940-54a1-48c8-beb9-c7f6d1d29d71/gettyimages-590647279.jpg"},
  {URL: "https://www.hindimeaning.com/pictures/animals/bear.png"}
]

class App extends Component {
  state = {
    tiles: [
      {id: 0, img: null, checked: false},
      {id: 1, img: null, checked: false},
      {id: 2, img: null, checked: false},
      {id: 3, img: null, checked: false},
    ],
    numberOfTilesClicked: 0,
    gameStart: false,
  }

  shuffleTiles = (array) => {
    let m = array.length, t, i;

    // while there are elements to shuffle
    while (m) {
      // pick a remaining element
      i = Math.floor(Math.random()* m--);

      // replace current element with shuffled element
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  indexTiles = (length) => {
    let index = [];
    for (let i = 0; i < length; i++) {
      index.push(i);
    }
    return index;
  }

  setTileImage = (images) => {
    console.log("in setTileImage");
    const tiles = {
      ...this.state.tiles
    };
    const tilesLength = Object.keys(tiles).length;
    const tileIndex = this.shuffleTiles(this.indexTiles(tilesLength));
    let pair = 0;
    let img = 0;
    for (let i = 0; i < tileIndex.length; i++) {
      tiles[tileIndex[i]].img = images[img].URL;
      if (pair < 2) {
        pair++;
      }
      else {
        img++;
      }
    }
    console.log(tiles);
    return tiles;
  }

  flipTileHandler = (tileID) => {
    console.log("in flipTileHandler");
    const tiles = {
      ...this.state.tiles
    };
    console.log(tiles);
    this.setState((prevState, props) => {
      tiles[tileID].checked = !prevState.tiles[tileID].checked;
      console.log(tiles[tileID].checked);
      return {
        tiles: tiles,
      }
    });
  }

  startGameHandler = () => {
    console.log("inside startGameHandler");
    const images = this.shuffleTiles(IMAGES);
    const tiles = this.setTileImage(images);
    console.log("after setTileImage");
    console.log(tiles);
    this.setState((prevState, props) => {
      return {
        //tiles: tiles,
        gameStart: !prevState.gameStart
      }
    });
  }

  render() {
    let tiles = null;
    if (this.state.gameStart) {
      tiles = 
        <Tiles 
          tiles={this.state.tiles} 
          clicked={this.flipTileHandler} 
        />;
    }
    
    return (
      <Aux>
        <button onClick={this.startGameHandler}>Start Game</button>
        <div className={classes.grid}>
          {tiles}
        </div>
      </Aux>
    );
  }
}

export default App;
