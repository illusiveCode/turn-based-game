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

    for (let i = 0; i < 12; i++) {
      this.placeItem("barrier", `<img src=${barrier} alt="" />`);
    }

    let damage = 10;
    for (const weapon of weapons) {
      damage += 5;
      this.placeItem(
        "weapon",
        `<img src=${weapon} alt="" data-damage="${damage}" />`
      );
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
      }

      this.gridSquares[randomSquare].classList.add(cls);
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
      move1.addEventListener("click", this.movePlayer);

      if (!move2) return;
      if (
        move2.classList.contains("barrier") ||
        move2.classList.contains("player")
      )
        return;
      move2.classList.add("highlight");
      move2.addEventListener("click", this.movePlayer);

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

  detectRetaliation = (column, row) => {
    const north = document.querySelector(
      `[data-row="${row - 1}"][data-column="${column}"]`
    );
    const south = document.querySelector(
      `[data-row="${Number(row) + 1}"][data-column="${column}"]`
    );
    const east = document.querySelector(
      `[data-row="${row}"][data-column="${Number(column) + 1}"]`
    );
    const west = document.querySelector(
      `[data-row="${row}"][data-column="${column - 1}"]`
    );

    if (north) {
      if (north.classList.contains("player")) {
        console.log("retaliation:", "north");
        this.retaliation();
      }
    }

    if (south) {
      if (south.classList.contains("player")) {
        console.log("retaliation:", "south");
        this.retaliation();
      }
    }

    if (east) {
      if (east.classList.contains("player")) {
        console.log("retaliation:", "east");
        this.retaliation();
      }
    }

    if (west) {
      if (west.classList.contains("player")) {
        console.log("retaliation:", "west");
        this.retaliation();
      }
    }
  };

  retaliation = () => {
    console.log("Start a fight");
    // 1. find current player weapon damage
    if (this.currentPlayer.id === 1) {
      const health = this.players[1].shield
        ? this.players[1].lifePoints - this.currentPlayer.weapon.damage / 2
        : this.players[1].lifePoints - this.currentPlayer.weapon.damage;

      this.players[1].lifePoints = health;

      document.getElementById("health2").innerHTML = health;
    } else {
      const health = this.players[0].shield
        ? this.players[0].lifePoints - this.currentPlayer.weapon.damage / 2
        : this.players[0].lifePoints - this.currentPlayer.weapon.damage;

      this.players[0].lifePoints = health;

      document.getElementById("health1").innerHTML = health;
    }

    console.log(this.players);
    // 2. detect if opponent has a shield up
    // 3. use current players weapon damamge to decrease opponents health
    // 4. if opponent has shield up then only 50% damage will be taken (if Statment)
  };

  movePlayer = (e) => {
    const player = {
      weapon: {
        image: "currentWeapon",
        damage: 10,
        oldWeapon: "oldWeapon",
      },
    };

    const oldPosition = document.querySelector(
      `[data-row="${this.currentPlayer.location.row}"][data-column="${this.currentPlayer.location.column}"]`
    );

    //remove image from old location
    if (this.currentPlayer.weapon.oldWeapon) {
      oldPosition.innerHTML = this.currentPlayer.weapon.oldWeapon;

      this.players[this.currentPlayer.id - 1].weapon.oldWeapon = "";
    } else {
      oldPosition.innerHTML = "";
    }

    oldPosition.classList.remove("player");
    //add image to new location

    let column, row;

    if (e.target.nodeName === "IMG") {
      column = e.path[1].dataset.column;
      row = e.path[1].dataset.row;
      e.path[1].innerHTML = this.currentPlayer.image;
      e.path[1].classList.add("player");

      const image = e.target.outerHTML;
      const damage = e.target.dataset.damage;

      document.querySelector(
        `#weapon${this.currentPlayer.id}`
      ).innerHTML = image;

      document.querySelector(
        `#damage${this.currentPlayer.id}`
      ).innerHTML = damage;

      //change player location
      this.players[this.currentPlayer.id - 1].location = { row, column };

      this.players[this.currentPlayer.id - 1].weapon = {
        image,
        damage,
        oldWeapon: this.currentPlayer.weapon.image,
      };
    } else {
      column = e.target.dataset.column;
      row = e.target.dataset.row;
      e.target.innerHTML = this.currentPlayer.image;
      e.target.classList.add("player");
      //change player location
      this.players[this.currentPlayer.id - 1].location = { row, column };
    }

    //remove highlights of moves
    for (const elm of document.querySelectorAll(".highlight")) {
      elm.classList.remove("highlight");
      elm.removeEventListener("click", this.movePlayer);

      // console.log($(elm));
    }
    // for (const elm of document
    //   .querySelectorAll(`#player${this.currentPlayer.id}`)
    //   .classList.add("weapon"));

    // if (e) {
    //   e.path[1].remove("weapon");
    // } else {
    //   this.currentPlayer.image;
    // }
    this.detectRetaliation(column, row);
    this.changeTurn();
  };

  detectTurn = () => {
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
