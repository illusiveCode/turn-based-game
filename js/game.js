import { weapons, barrier } from "./assets";

class Game {
  constructor(players) {
    this.players = players;
    this.gridSquares = document.querySelectorAll(".grid-item");
    this.currentPlayer = null;
  }
  // creating the function to reset the game
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

  // calling function to reset the game
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
  };

  // creating the map of the game
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
        this.players[item.id - 1].location = { column, row };

        this.gridSquares[randomSquare].innerHTML = item.image;
      } else {
        this.gridSquares[randomSquare].innerHTML = item;
        this.gridSquares[randomSquare].classList.add(cls);
      }
    }
  };

  // highlight tiles for valid moves for current player
  highlightMoves = () => {
    const { row, column } = this.currentPlayer.location;
    console.log("highlightMoves", row, column);
    const element = (direction, num) => {
      switch (direction) {
        case "north":
          return document.querySelector(
            `[data-row="${row - num}"][data-column="${column}"]`
          );
        case "south":
          return document.querySelector(
            `[data-row="${Number(row) + num}"][data-column="${column}"]`
          );
        case "west":
          return document.querySelector(
            `[data-row="${row}"][data-column="${Number(column) - num}"]`
          );
        case "east":
          return document.querySelector(
            `[data-row="${row}"][data-column="${Number(column) + num}"]`
          );
        default:
          break;
      }
    };

    const availability = (direction) => {
      const move1 = element(direction, 1);
      const move2 = element(direction, 2);
      const move3 = element(direction, 3);

      if (!move1) return;
      if (
        move1.classList.contains("barrier") ||
        move1.classList.contains("player")
      )
        return;
      move1.classList.add("highlight");
      move1.addEventListener("click", (e) => this.movePlayer(e, move1));

      if (!move2) return;
      if (
        move2.classList.contains("barrier") ||
        move2.classList.contains("player")
      )
        return;
      move2.classList.add("highlight");
      move2.addEventListener("click", (e) => this.movePlayer(e, move2));

      if (!move3) return;
      if (
        move3.classList.contains("barrier") ||
        move3.classList.contains("player")
      )
        return;
      move3.classList.add("highlight");
      move3.addEventListener("click", this.movePlayer);
    };

    availability("north");
    availability("south");
    availability("west");
    availability("east");
  };

  movePlayer = (e) => {
    console.log(e);
    const { row, column } = e.target.dataset;

    document.querySelector(
      `[data-row="${this.currentPlayer.location.row}"][data-column="${this.currentPlayer.location.column}"]`
    ).innerHTML = "";

    e.target.innerHTML = this.currentPlayer.image;

    this.players[this.currentPlayer.id - 1].location = { row, column };

    for (const elm of document.querySelectorAll(".highlight")) {
      elm.classList.remove("highlight");
    }

    this.changeTurn();
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

  changeTurn = () => {
    for (const elm of document.querySelectorAll(".sidebar")) {
      elm.classList.remove("current");
    }

    //this.currentPlayer = this.players[this.currentPlayer.id]

    if (this.currentPlayer.id === 1) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }

    this.detectTurn();
  };
}

export default Game;
