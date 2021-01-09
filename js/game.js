import { weapons, barrier } from "./assets";



class Game {
  constructor(players) {
    this.players = players;
    this.gridSquares = document.querySelectorAll(".grid-item");
    this.currentPlayer = null;
  }
  /*FUNCTION TO RESET THE GAME*/
  reset = () => {

    document.querySelector("#gameOverModal").classList.remove("open");

    this.players.map((player) => {
      document.querySelector(`#name${player.id}`).innerHTML = player.name;

      document.querySelector(`#health${player.id}`).innerHTML =
        player.lifePoints;

      document.querySelector(`#weapon${player.id}`).innerHTML =
        player.weapon.image;

      document.querySelector(`#damage${player.id}`).innerHTML =
        player.weapon.damage;

      document.querySelector(`#shield${player.id}`).innerHTML = "Unprotected";
    });
  };

  // calling function to reset the game
  newGame = () => {
    this.reset();


    for (let i = 0; i < 12; i++) {
      this.placeItem("barrier", `<img src=${barrier} alt="" />`);
    }

    let damage = 10;
    for (const weapon of weapons) {
      damage += 10;
      this.placeItem(
        "weapon",
        `<img src=${weapon} alt="" data-damage="${damage}" />`
      );
    }

    this.players.map((player) => {
      this.placeItem("player", player);
    });


    this.currentPlayer = this.players[
      Math.floor(Math.random() * this.players.length)
    ];

    this.detectTurn();
  };

  // creating the map of the game
  static generateMap = () => {
    const map = document.querySelector("#game-board");

    let col = 0;
    let row = 1;

    map.innerHTML = "";

    for (let column = 0; column < 81; column++) {
      col++;

      map.innerHTML += `<div class='grid-item' data-row=${row} data-column=${col}></div>`;

      if (col === 9) {
        col = 0;
        row++;
      }
    }
  };

  placeItem = (cls, item) => {
    const randomSquare = Math.floor(Math.random() * this.gridSquares.length);

    // console.log({ randomSquare, tiles: this.gridSquares });

    const { column, row } = this.gridSquares[randomSquare].dataset;

    const getObstacleDistance = (row, column) => {

      console.log({row, column})

      const elm = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);

      const r1 = document.querySelector(`[data-row="${row -1}"][data-column="${column}"]`);
      const r2 = document.querySelector(`[data-row="${row -2}"][data-column="${column}"]`);
      const r3 = document.querySelector(`[data-row="${row +1}"][data-column="${column}"]`);
      const r4 = document.querySelector(`[data-row="${row +2}"][data-column="${column}"]`);


      const c1 = document.querySelector(`[data-column="${column -1}"][data-row="${row}"]`);
      const c2 = document.querySelector(`[data-column="${column -2}"][data-row="${row}"]`);
      const c3 = document.querySelector(`[data-column="${column +1}"][data-row="${row}"]`);
      const c4 = document.querySelector(`[data-column="${column +2}"][data-row="${row}"]`);

      


      if(r1 && r1.classList.contains("barrier")) return true;
      if(r2 && r2.classList.contains("barrier")) return true;
      if(r3 && r3.classList.contains("barrier")) return true;
      if(r4 && r4.classList.contains("barrier")) return true;

      if(c1 && c1.classList.contains("barrier")) return true;
      if(c2 && c2.classList.contains("barrier")) return true;
      if(c3 && c3.classList.contains("barrier")) return true;
      if(c4 && c4.classList.contains("barrier")) return true;



      const r1c1 = document.querySelector(`[data-row="${row+1}"][data-column="${column+1}"]`);

      const r2c2 = document.querySelector(`[data-row="${row-1}"][data-column="${column-1}"]`);

      const r3c3 = document.querySelector(`[data-row="${row-1}"][data-column="${column+1}"]`);

      const r4c4 = document.querySelector(`[data-row="${row+1}"][data-column="${column-1}"]`);

      if(r1c1 && r1c1.classList.contains("barrier")) return true;
      if(r2c2 && r2c2.classList.contains("barrier")) return true;
      if(r3c3 && r3c3.classList.contains("barrier")) return true;
      if(r4c4 && r4c4.classList.contains("barrier")) return true;




    }

    if (this.gridSquares[randomSquare].classList.contains("occupied")) return this.placeItem(cls, item);


      if (cls === "player") {
        if (this.players[0].location.row > 0) {
          const c1 = this.players[0].location.column;
          const r1 = this.players[0].location.row;

          // console.log({ r, c });

          // if (this.getPlayerDistance(Number(r1), Number(c1), Number(row), Number(column))) {
          //   // console.log({ row, column });
          //   console.log("matched...")
          //   return this.placeItem(cls, item);
          // }
        }

        this.players[item.id - 1].location = {
          column,
          row,
        };

        this.gridSquares[randomSquare].innerHTML = item.image;
      } else if (cls === "barrier") {
        
        if(getObstacleDistance(+row, +column)) return this.placeItem(cls, item); 

        // console.log({ r, c });

        // if (r && c) return this.placeItem(cls, item);

        this.gridSquares[randomSquare].innerHTML = item;
      } else {
        this.gridSquares[randomSquare].innerHTML = item;
      }

      this.gridSquares[randomSquare].classList.add(cls);
      this.gridSquares[randomSquare].classList.add("occupied");
    
  };

  getPlayerDistance = (r1, c1, r2, c2) => {
    if(Math.abs(r1 - r2) <= 4) return true; // can be at same row but not 4 spots or less
    if(Math.abs(c1 - c2) <= 4) return true;

    if((r1 - 1)  ) return true;
  
  }

  // highlight tiles for valid moves for current player
  highlightMoves = () => {
    const { row, column } = this.currentPlayer.location;

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

  movePlayer = (e) => {
    const oldPosition = document.querySelector(
      `[data-row="${this.currentPlayer.location.row}"][data-column="${this.currentPlayer.location.column}"]`
    );

    const newPosition = e.target.nodeName === "IMG" ? e.path[1] : e.target;
    const player = this.players[this.currentPlayer.id - 1];

    //remove image from old location
    if (this.currentPlayer.weapon.oldWeapon) {
      oldPosition.innerHTML = this.currentPlayer.weapon.oldWeapon;
      oldPosition.classList.add("weapon");

      player.weapon.oldWeapon = null;
    } else {
      oldPosition.innerHTML = "";
    }

    oldPosition.classList.remove("player");
    //add image to new location

    const { row, column } = newPosition.dataset;

    if (e.target.nodeName === "IMG") {
      newPosition.innerHTML = this.currentPlayer.image;
      newPosition.classList.add("player");

      const image = e.target.outerHTML;
      const damage = e.target.dataset.damage;

      document.querySelector(
        `#weapon${this.currentPlayer.id}`
      ).innerHTML = image;

      document.querySelector(
        `#damage${this.currentPlayer.id}`
      ).innerHTML = damage;

      //change player location
      player.location = { row, column };

      player.weapon = {
        image,
        damage,
        oldWeapon: this.currentPlayer.weapon.image,
      };
    } else {
      newPosition.innerHTML = this.currentPlayer.image;
      newPosition.classList.add("player");
      //change player location
      player.location = { row, column };
    }

    this.players[this.currentPlayer.id - 1] = player;

    if (this.detectRetaliation(column, row)) {
      this.retaliation();
    } else {
      this.changeTurn();
    }

    //remove highlights of moves and click eventlistner from previous availbale moves
    for (const elm of document.querySelectorAll(".highlight")) {
      elm.classList.remove("highlight");
      elm.removeEventListener("click", this.movePlayer);
    }
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

    if (north && north.classList.contains("player")) return true;
    if (south && south.classList.contains("player")) return true;
    if (east && east.classList.contains("player")) return true;
    if (west && west.classList.contains("player")) return true;
  };

  retaliation = () => {
    const attacker = this.currentPlayer;
    this.currentPlayer = attacker.id === 1 ? this.players[1] : this.players[0];

    const opponent = this.currentPlayer;

    // Update player panels highlight
    document.querySelector(`#player${attacker.id}`).classList.remove("current");
    document.querySelector(`#player${opponent.id}`).classList.add("current");

    const retaliationModal = document.querySelector("#retaliationModal");

    setTimeout(() => {
      retaliationModal.classList.add("open");
    }, 500);

    document.querySelector("#retaliationModal .avatar").innerHTML =
      opponent.image;

    // Defend?
    const defend = () => {
      document.querySelector("#attack").removeEventListener("click", attack)
      const health = opponent.lifePoints - attacker.weapon.damage / 2;

      this.players[opponent.id - 1].lifePoints = health;
      console.log("defend", opponent.id, health);

      document.querySelector(`#health${opponent.id}`).innerHTML = health;

      const shieldStatus = document.querySelector(`#shield${opponent.id}`);
      shieldStatus.innerHTML = "Protected";
      shieldStatus.classList.add("protected");

      document.querySelector(`#health${opponent.id}`).innerHTML = health;

      retaliationModal.classList.remove("open");

      // Remove highlights
      for (const tile of document.querySelectorAll(".highlight")) {
        tile.classList.remove("highlight");
        tile.removeEventListener("click", this.movePlayer);
      }

      if (this.gameOver(opponent, attacker)) return;

      this.highlightMoves();
    }
    document.querySelector("#defend").addEventListener("click", defend, {once: true }
    );

    // Attack?
    const attack = () => {
      document.querySelector("#defend").removeEventListener("click", defend)
      const health = opponent.lifePoints - attacker.weapon.damage;
      console.log("attack", opponent.id, health);

      retaliationModal.classList.remove("open");

      this.players[opponent.id - 1].lifePoints = health;
      document.querySelector(`#health${opponent.id}`).innerHTML = health;

      const shieldStatus = document.querySelector(`#shield${opponent.id}`);
      shieldStatus.innerHTML = "Unprotected";
      shieldStatus.classList.remove("protected");

      // Remove highlights
      for (const tile of document.querySelectorAll(".highlight")) {
        tile.classList.remove("highlight");
        tile.removeEventListener("click", this.movePlayer);
      }

      if (this.gameOver(opponent, attacker)) return;

      this.retaliation();
    };

    document.querySelector("#attack").addEventListener(
      "click", attack,
      { once: true }
    );
  };

  gameOver = (opponent, attacker) => {
    if (opponent.lifePoints <= 0) {
      document.querySelector("#retaliationModal").classList.remove("open");
      document.querySelector("#gameOverModal").classList.add("open");

      document.querySelector(
        "#gameOverModal p:first-of-type"
      ).innerHTML = `${attacker.name}, you are the winner :)`;
      document.querySelector(
        "#gameOverModal p:last-of-type"
      ).innerHTML = `${opponent.name}, you have lost :(`;

      // document
      //   .querySelector("#gameOverModal button")
      //   .addEventListener("click", () => {
      //     document.querySelector("#gameOverModal").classList.remove("open");
      //   });

      return true;
    }
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
