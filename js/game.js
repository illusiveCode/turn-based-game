import { weapons, barrier } from "./assets";

class Game {
  constructor(players) {
    this.players = players;
    this.gridSquares = document.querySelectorAll(".grid-item");
    this.currentPlayer = null;
  }
  // creating the function to reset the game
  reset = () => {
    console.log("restarted");

    this.gridSquares.forEach((tile) => {
      tile.innerHTML = "";
      tile.removeAttribute("class");
    });

    document.querySelector("#gameOverModal").classList.remove("open");

    this.players.map((player) => {

      console.log(player)
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
        if (this.players[0].location.row > 0) {
          const c = this.players[0].location.column;
          const r = this.players[0].location.row;

          // console.log({ r, c });

          if (r == row || c == column) {
            // console.log({ row, column });

            return this.placeItem(cls, item);
          }
        }

        this.players[item.id - 1].location = {
          column,
          row,
        };

        this.gridSquares[randomSquare].innerHTML = item.image;
      } else if (cls === "barrier") {
        const c = document.querySelector(`.barrier[data-column="${column}"]`);
        const r = document.querySelector(`.barrier[data-row="${row}"]`);

        // console.log({ r, c });

        // if (r && c) return this.placeItem(cls, item);

        this.gridSquares[randomSquare].innerHTML = item;
      } else {
        this.gridSquares[randomSquare].innerHTML = item;
      }

      this.gridSquares[randomSquare].classList.add(cls);
    }
  };

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
    const player = this.players[this.currentPlayer.id - 1]

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

    const {row, column} = newPosition.dataset;


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
      player.location = { row, column, };

      player.weapon = { image, damage, oldWeapon: this.currentPlayer.weapon.image, };
    } else {
      newPosition.innerHTML = this.currentPlayer.image;
      newPosition.classList.add("player");
      //change player location
     player.location = { row, column, };
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

  movePlayer2 = (e) => {
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
      this.players[this.currentPlayer.id - 1].location = {
        row,
        column,
      };

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
      this.players[this.currentPlayer.id - 1].location = {
        row,
        column,
      };
    }

    if (this.detectRetaliation(column, row)) {
      const isGameOver = this.retaliation();

      if (isGameOver) return;

      const retaliationModal = document.querySelector("#retaliationModal")
        .classList;
      if (this.currentPlayer.id === 1) {
        document.querySelector(
          "#retaliationModal h2"
        ).innerHTML = this.players[1].name;
        document.querySelector(
          "#retaliationModal p:first-of-type"
        ).innerHTML = `You have just received an attack from your opponent.`;
        document.querySelector(
          "#retaliationModal p:last-of-type"
        ).innerHTML = `Your health has been decreased <strong>${this.players[1].weapon.damage} points</strong>.`;
      } else {
        document.querySelector(
          "#retaliationModal h2"
        ).innerHTML = this.players[0].name;
        document.querySelector(
          "#retaliationModal p:first-of-type"
        ).innerHTML = `You have just received an attack from your opponent.`;
        document.querySelector(
          "#retaliationModal p:last-of-type"
        ).innerHTML = `Your health has been decreased <strong>${this.players[0].weapon.damage} points</strong>.`;
      }

      setInterval(() => retaliationModal.add("open"), 500);

      const shieldStatus = document.querySelector(
        `#shield${this.currentPlayer.id}`
      );

      document.querySelector("#defend").addEventListener("click", () => {
        if (this.currentPlayer.id === 1) {
          this.players[1].shield = true;
          shieldStatus.innerHTML = "Protected";
          document
            .querySelector(`#shield${this.players[1].id}`)
            .classList.add("protected");
        } else {
          this.players[0].shield = true;
          shieldStatus.innerHTML = "Protected";
          document
            .querySelector(`#shield${this.players[0].id}`)
            .classList.add("protected");
        }

        retaliationModal.remove("open");

        this.changeTurn();
      });

      document.querySelector("#attack").addEventListener("click", () => {
        this.retaliation();

        retaliationModal.remove("open");

        shieldStatus.innerHTML = "Unprotected";
        document
          .querySelector(`#shield${this.currentPlayer.id}`)
          .classList.remove("protected");

        this.players[this.currentPlayer.id - 1].shield = true;

        this.changeTurn();
      });
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
    console.log({detectRetaliation: {column, row}})
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
    console.log('In retaliation...');

    const retaliationModal = document.querySelector("#retaliationModal");

    // Hide retaliation modal in case it was still opened

    retaliationModal.classList.add('open');





    for (const player of this.players) {
      if (Number(player.lifePoints) <= 0) {

        retaliationModal.classList.remove('open');

        return this.gameOver();

      }
    }

    if (this.currentPlayer.id === 1) {
      document.querySelector(
        "#retaliationModal .avatar"
      ).innerHTML = this.players[1].image;
      // document.querySelector(
      //   "#retaliationModal h2"
      // ).innerHTML = this.players[1].name;
      // document.querySelector(
      //   "#retaliationModal p:first-of-type"
      // ).innerHTML = `You have just received an attack from your opponent.`;
      // document.querySelector(
      //   "#retaliationModal p:last-of-type"
      // ).innerHTML = `Your health has been decreased <strong>${this.players[1].weapon.damage} points</strong>.`;
    } else {
      document.querySelector(
        "#retaliationModal .avatar"
      ).innerHTML = this.players[0].image;

      // document.querySelector(
      //   "#retaliationModal h2"
      // ).innerHTML = this.players[0].name;
      // document.querySelector(
      //   "#retaliationModal p:first-of-type"
      // ).innerHTML = `You have just received an attack from your opponent.`;
      // document.querySelector(
      //   "#retaliationModal p:last-of-type"
      // ).innerHTML = `Your health has been decreased <strong>${this.players[0].weapon.damage} points</strong>.`;
    }

    // Defend?
    document.querySelector("#defend").addEventListener("click", () => {

      const attacker =  this.currentPlayer;

      this.changeTurn();

      const opponent = this.currentPlayer;


      const shieldStatus = document.querySelector(
        `#shield${opponent.id}`
      );

      opponent.shield = true;
      shieldStatus.innerHTML = "Protected";
      
      shieldStatus.classList.add("protected");


    const health = opponent.shield
      ? opponent.lifePoints - attacker.weapon.damage / 2
      : opponent.lifePoints - attacker.weapon.damage;

    opponent.lifePoints = health;

    document.querySelector(`#health${opponent.id}`).innerHTML = health;


      retaliationModal.classList.remove("open");

      // Apply opponent changes to its object in this.players
      this.players[this.currentPlayer.id - 1] = opponent;

    });

  
    // Attack?
    document.querySelector("#attack").addEventListener("click", () => {
      const attacker =  this.currentPlayer;

      this.changeTurn();

      const opponent = this.currentPlayer;

      retaliationModal.classList.remove("open");

      setTimeout(this.retaliation, 1000);


      const shieldStatus = document.querySelector(
        `#shield${opponent.id}`
      );

      opponent.shield = false;
      shieldStatus.innerHTML = "Unprotected";
      
      shieldStatus.classList.remove("protected");


      const health = opponent.shield
        ? opponent.lifePoints - attacker.weapon.damage / 2
        : opponent.lifePoints - attacker.weapon.damage;

      opponent.lifePoints = health;

      document.querySelector(`#health${opponent.id}`).innerHTML = health;


    
      // Apply opponent changes to its object in this.players
      this.players[this.currentPlayer.id - 1] = opponent;

    });



  };

  gameOver = () => {

    document.querySelector("#gameOverModal").classList.add("open");

    document.querySelector("#newGame2").addEventListener("click", () => {
      document.querySelector("#gameOverModal").classList.remove("open");

      this.newGame();
    });

    if (this.currentPlayer.id === 1) {

      document.querySelector(
        "#gameOverModal p:first-of-type"
      ).innerHTML = `${this.players[0].name}, you are the winner :)`;
      document.querySelector(
        "#gameOverModal p:last-of-type"
      ).innerHTML = `${this.players[1].name}, you have lost :(`;
    } else {
      document.querySelector(
        "#gameOverModal p:first-of-type"
      ).innerHTML = `${this.players[1].name}, you are the winner :)`;
      document.querySelector(
        "#gameOverModal p:last-of-type"
      ).innerHTML = `${this.players[0].name}, you have lost :(`;
    }
  }

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
