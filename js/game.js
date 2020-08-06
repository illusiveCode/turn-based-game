import { weapons, barrier } from "./assets";

class Game {
  constructor(players) {
    this.players = players;
    this.gridSquares = document.querySelectorAll(".grid-item");
  }

  reset = () => {
    this.gridSquares.forEach((tile) => {
      tile.innerHTML = "";
      tile.classList.remove("occupied");
    });
  };

  newGame = () => {
    this.reset();

    weapon.map((weapon) => {
      this.placeItem("weapon", `<img src=${weapon} alt="" />`);
    });
    this.players.map((player) => {
      this.placeItem("player", player.image);
    });

    for (let i = 0; i < 15; i++) {
      this.placeItem("barrier", `<img src=${barrier} alt="" />`);
    }
  };

  static generateMap = () => {
    let col = 0;
    let row = 1;

    for (let column = 0; column < 81; column++) {
      col++;
      document.querySelector(
        "#game-board"
      ).innerHTML += `<div class='grid-item' data-row=${row} data-column=${col}></div>`;

      if (col === 9) {
        col = 0;
        row++;
      }
    }
  };

  placeItem = (cls, item) => {
    const randomSquare = Math.floor(Math.random() * this.gridSquares.length);

    const { row, column } = this.gridSquares[randomSquare].dataset;

    const randomElm = document.querySelector(
      `[data-row="${row}"][data-column="${column}"]`
    );

    let isOccupied = randomElm.classList.contains("occupied");
    if (isOccupied) {
      return this.placeItem(cls);
    } else {
      randomElm.innerHTML = item;
      return randomElm.classList.add(cls, "occupied");
    }
  };
}

export default Game;
