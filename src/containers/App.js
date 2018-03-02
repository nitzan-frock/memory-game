import React, { Component } from 'react';

import './App.css';
import Tiles from '../components/Tiles/Tiles';
import IMAGES from '../assets/images/images';
import Aux from '../hoc/Auxillary';
import classes from './App.css';
import Score from '../components/PlayerStatus/Score/Score';
import Lives from '../components/PlayerStatus/Lives/Lives';
import GameOver from '../components/UI/GameOver/GameOver';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/UI/Backdrop/Backdrop';

class App extends Component {
  state = {
    // tiles will be initialized on gameStart
    tiles: [],
    numberOfTilesClicked: 0,
    pairsMatched: 0,
    renderTiles: false,
    gameStart: false,
    gameOver: false,
    currentTiles: {
      tile1: null
    },
    lives: 3,
    won: false,
    showBackdrop: false,
  }

  initTiles = () => {
    let numOfTiles = 16;
    const tiles = [];
    for (let i = 0; i < numOfTiles; i++) {
      const tile = {
        id: i,
        img: null,
        checked: false,
        paired: false,
      };
      tiles.push(tile);
    }
    return tiles;
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

  setTileImage = (tiles, images) => {
    const tilesLength = tiles.length;
    const tileIndex = this.shuffleTiles(this.indexTiles(tilesLength));
    let pair = 0;
    let imgIndex = 0;

    for (let i = 0; i < tileIndex.length; i++) {
      tiles[tileIndex[i]].img = images[imgIndex].URL;

      if (pair < 1) {
        pair++;
      } else {
        pair = 0;
        imgIndex++;
      }
    }

    return tiles;
  }

  startGameHandler = () => {
    let tiles = this.initTiles();
    const images = this.shuffleTiles(IMAGES);
    tiles = this.setTileImage(tiles, images);
    this.setState((prevState, props) => {
      return {
        tiles: tiles,
        renderTiles: !prevState.renderTiles,
      }
    });
    this.showTiles(tiles);
  }

  showTiles = (tiles) => {
    for (let i = 0; i < Object.keys(tiles).length; i++){
      tiles[i].checked = !tiles[i].checked;
    }
    // sets the tiles to flipped to give a breif hint then flips them back over
    this.setState(() => {
      return {tiles: tiles}
    }, () => {
      setTimeout(() => {
        this.setState(prevState => {
          let tiles = [...prevState.tiles];

          for (let i = 0; i < tiles.length; i++){
            tiles[i].checked = !tiles[i].checked;
          }

          return {
            tiles: tiles,
            gameStart: !prevState.gameStart
          };
        })
      }, 1500)
    });
  }

  flipTileHandler = (tileID) => {
    const tiles = [...this.state.tiles];
    let currentTiles = {...this.state.currentTiles};

    if (
      !tiles[tileID].paired && 
      this.state.gameStart && 
      this.state.numberOfTilesClicked < 1) {
        
      if (currentTiles.tile1 === null) { // flip over first clicked tile
        currentTiles.tile1 = tileID;
        tiles[tileID].checked = true;
      } else { // another tile has been clicked
        let prevTile = currentTiles.tile1;

        if (prevTile === tileID) { 
          // previous tile and current tile are the same, so flip it back over.
          tiles[prevTile].checked = false;
          currentTiles.tile1 = null;

          this.setState({
            tiles: tiles,
            currentTiles: currentTiles
          });
        } else if (tiles[prevTile].img === tiles[tileID].img) { 
          // tiles match
          tiles[tileID].checked = true;
          tiles[prevTile].paired = true;
          tiles[tileID].paired = true;

          // reset current tiles
          currentTiles = this.resetCurrentTiles(currentTiles);

          this.setState((prevState) => {
            let pairsMatched = prevState.pairsMatched;

            // check number of pairs matched
            let allPairsMatched = tiles.length / ++pairsMatched;
            let gameOver = prevState.gameOver;
            let gameWon = prevState.won;

            // if the number of tiles divided by the total matched pairs is equal to two, then the game is over
            if (allPairsMatched === 2) {
              gameOver = true;
              gameWon = true;
            }

            return {
              tiles: tiles,
              gameOver: gameOver,
              won: gameWon,
              pairsMatched: pairsMatched,
              currentTiles: currentTiles
            }
          });
        } else { // tiles do not match 
          // reset current tiles
          currentTiles.tile1 = null;
          this.setState((prevState) => {
            const tiles = [...prevState.tiles];
            let lives = prevState.lives;
            let gameOver = prevState.gameOver;
            tiles[tileID].checked = !tiles[tileID].checked;
            lives--;

            if (!lives) { // if no lives left...game over
              gameOver = true;
            }

            return {
              tiles: tiles,
              gameOver: gameOver,
              currentTiles: currentTiles,
              numberOfTilesClicked: 2,
              lives: lives
            }
          },() => {
          setTimeout(() => {
            this.setState((prevState) => {
              let tiles = [...prevState.tiles];
              tiles[prevTile].checked = !tiles[prevTile].checked;
              tiles[tileID].checked = !tiles[tileID].checked;
              return {
                tiles: tiles,
                numberOfTilesClicked: 0
              }
            }
            )
          }, 500)
        })
          currentTiles = this.resetCurrentTiles(currentTiles);
        }
      }
    }
    this.setState({
      tiles: tiles,
      currentTiles: currentTiles
    });
  }

  resetCurrentTiles = (currentTiles) => {
    currentTiles.tile1 = null;
    return currentTiles;
  }

  restartGameHandler = () => {
    const defaultState = {
      // tiles will be initialized on gameStart
      tiles: [],
      numberOfTilesClicked: 0,
      pairsMatched: 0,
      renderTiles: false,
      gameStart: false,
      gameOver: false,
      currentTiles: {
        tile1: null
      },
      lives: 3,
      won: false
    };
    this.setState(defaultState);
    this.startGameHandler();
  }

  closeTabHandler = () => {
    window.close();
  }

  render() {
    let tiles = null;
    if (this.state.renderTiles) {
      tiles = 
        <Tiles 
          tiles={this.state.tiles}
          flipped={this.flipTileHandler} 
        />;
    }
    
    return (
      <div className={classes.Wrapper}>
        <Aux>
          <Modal show={this.state.gameOver}>
            <GameOver 
              restartGame={this.restartGameHandler}
              closeTab={this.closeTabHandler}
              won={this.state.won} />
          </Modal>
          <Backdrop show={this.state.gameOver} />
          <div className={classes.App}>
            <button 
              style={{
                margin: "100px",
                display: this.state.renderTiles ? "none" : ""
              }} 
              onClick={this.startGameHandler}>
                Start Game
            </button>
            <div className={classes.Wrapper}>
              <div className={classes.Grid}>
                {tiles}
              </div>
            </div>
            <div style={{visibility: this.state.renderTiles ? "" : "hidden"}} >
              <Score pairsMatched={this.state.pairsMatched} />
              <Lives lives={this.state.lives}/>
            </div>
          </div>
        </Aux>
      </div>
    );
  }
}

export default App;
