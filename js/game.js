import { weapons, barrier } from "./assets";

class Game {
  constructor(players) {
    this.players = players;
    this.gridSquares = document.querySelectorAll(".grid-item");
    this.currentPlayer = null;
  }

  reset = () => {
    this.gridSquares.forEach((tile) => {
      tile.innerHTML = "";
      tile.removeAttribute("class");
    });

    this.players.map((player) => {
      document.querySelector(`#name${player.id}`).innerHTML = player.name;

      document.querySelector(`#health${player.id}`).innerHTML =
        player.lifePoints;

      document.querySelector(`#weapon${player.id}`).innerHTML =
        player.weapon.image;

      document.querySelector(`#damage${player.id}`).innerHTML =
        player.weapon.damage;

      document.querySelector(`#shield${player.id}`).innerHTML = player.weapon
        .shield
        ? "Protected"
        : "Unprotected";
    });
  };

  newGame = () => {
    this.reset();

    this.currentPlayer = this.players[
      Math.floor(Math.random() * this.players.length)
    ];

    this.detectTurn();

    for (let i = 0; i < 15; i++) {
      this.placeItem("barrier", `<img src=${barrier} alt="" />`);
    }

    for (const weapon of weapons) {
      this.placeItem("weapon", `<img src=${weapon} alt="" />`);
    }

    this.players.map((player) => {
      this.placeItem("player", player);
    });

    console.log(this.players);
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

    const classList = this.gridSquares[randomSquare].classList;

    const { column, row } = this.gridSquares[randomSquare].dataset;

    if (
      classList.contains("barrier") ||
      classList.contains("weapon") ||
      classList.contains("player")
    ) {
      this.placeItem(cls, item);
    } else {
      if (cls === "player") {
        this.players[item.id - 1].location = { col: column, row };

        this.gridSquares[randomSquare].innerHTML = item.image;
      } else {
        this.gridSquares[randomSquare].innerHTML = item;
        this.gridSquares[randomSquare].classList.add(cls);
      }
    }
  };

  highlightMoves = () => {
    const moves = (direction, operator) => {
      const { row, column } = this.currentPlayer.location;
      console.log({ row, column, currentPlayer });
      const north1 = document.querySelector(
        `[data-column="${column}"][data-row="${row - 1}"]`
      );
      const north2 = document.querySelector(
        `[data-column="${column}"][data-row="${row - 2}"]`
      );
      const north3 = document.querySelector(
        `[data-column="${column}"][data-row="${row - 3}"]`
      );
      const east1 = document.querySelector(
        `[data-column="${column + 1}"][data-row="${row}"]`
      );
      const east2 = document.querySelector(
        `[data-column="${column + 2}"][data-row="${row}"]`
      );
      const east3 = document.querySelector(
        `[data-column="${column + 3}"][data-row="${row}"]`
      );

      // if (!east1.classList.contains("occupied")) {
      //   east1.classList.add("highlight");
      // }
      // if (!east2.classList.contains("occupied")) {
      //   east2.classList.add("highlight");
      // }
      // if (!east3.classList.contains("occupied")) {
      //   east3.classList.add("highlight");

      if (!north1.classList.contains("occupied")) {
        north1.classList.add("highlight");

        if (!north2.classList.contains("occupied")) {
          north2.classList.add("highlight");

          if (!north3.classList.contains("occupied")) {
            north3.classList.add("highlight");
          }
        }
      }
    };
  };

  detectTurn = () => {
    document.querySelectorAll(".sidebar").forEach((sidebar) => {
      sidebar.classList.remove("current");
    });

    document
      .querySelector(`#player${this.currentPlayer.id}`)
      .classList.add("current");

    setTimeout(this.highlightMoves, 500);
  };

  //  changeTurn = () =>  {
  //   if (currentPlayer === player1) {
  //     currentPlayer = player1;
  //   } else {
  //     currentPlayer = player1;
  //   }
  // }
}

export default Game;
