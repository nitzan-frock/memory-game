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
      {id: 0, img: null, checked: false, paired: false},
      {id: 1, img: null, checked: false, paired: false},
      {id: 2, img: null, checked: false, paired: false},
      {id: 3, img: null, checked: false, paired: false},
      {id: 4, img: null, checked: false, paired: false},
      {id: 5, img: null, checked: false, paired: false},
      {id: 6, img: null, checked: false, paired: false},
      {id: 7, img: null, checked: false, paired: false},
    ],
    numberOfTilesClicked: 0,
    gameStart: false,
    pairCheck: {
      tile1: null,
      tile2: null,
    },
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
    const tiles = [
      ...this.state.tiles
    ];
    const tilesLength = Object.keys(tiles).length;
    const tileIndex = this.shuffleTiles(this.indexTiles(tilesLength));
    let pair = 0;
    let imgIndex = 0;
    for (let i = 0; i < tileIndex.length; i++) {
      tiles[tileIndex[i]].img = images[imgIndex].URL;
      if (pair < 1) {
        pair++;
      }
      else {
        pair = 0;
        imgIndex++;
      }
    }
    console.log(tiles);
    return tiles;
  }

  flipTileHandler = (tileID) => {
    console.log("in flipTileHandler");
    console.log("tileID: " + tileID);
    this.setState((prevState, props) => {
      const tiles = [...prevState.tiles];
      if (!tiles[tileID].paired) {
        tiles[tileID].checked = !tiles[tileID].checked;
        const pairCheck = {...prevState.pairCheck};
        let tilesChecked = null;
        if (tiles[tileID].checked) {
          if (pairCheck.tile1 === null) {
            pairCheck.tile1 = tiles[tileID];
            console.log("tile1 checked");
            console.log(tiles[tileID]);
          }
          else {
            pairCheck.tile2 = tiles[tileID];
            console.log("tile2 checked : ");
            console.log(tiles[tileID]);
            tilesChecked = this.tilesClickedHandler(tiles, pairCheck);
            console.log(tilesChecked);
            console.log("returning tilesChecked");
            return {
              tiles: tilesChecked.tiles,
              pairCheck: tilesChecked.pairCheck
            }
          }
        }
        console.log("returning tiles and paircheck");
        return {
          tiles: tiles,
          pairCheck: pairCheck,
        }
      }
    });
  }

  startGameHandler = () => {
    console.log("in startGameHandler");
    const images = this.shuffleTiles(IMAGES);
    const tiles = this.setTileImage(images);
    this.setState((prevState, props) => {
      return {
        tiles: tiles,
        gameStart: !prevState.gameStart
      }
    });
  }

  tilesClickedHandler = (tiles, pairCheck) => {
    console.log("in tilesClickedHandler");
    if (pairCheck.tile1.img === pairCheck.tile2.img) {
      console.log("img are equal");
      tiles[pairCheck.tile1.id].paired = true;
      tiles[pairCheck.tile2.id].paired = true;
      pairCheck.tile1 = null;
      pairCheck.tile2 = null;
      return ({
        tiles: tiles,
        pairCheck: pairCheck,
      });
    }
    else {
      console.log("Tiles are not pairs");
      tiles[pairCheck.tile1.id].checked = false;
      tiles[pairCheck.tile2.id].checked = false;
      pairCheck.tile1 = null;
      pairCheck.tile2 = null;
      return ({
        tiles:tiles,
        pairCheck: pairCheck
      })
    }
  }

  render() {
    let tiles = null;
    if (this.state.gameStart) {
      tiles = 
        <Tiles 
          tiles={this.state.tiles} 
          flipped={this.flipTileHandler} 
        />;
    }
    
    return (
      <Aux>
        <div className={classes.App}>
          <button onClick={this.startGameHandler}>Start Game</button>
          <div className={classes.Grid}>
            {tiles}
          </div>
        </div>
      </Aux>
    );
  }
}

export default App;
