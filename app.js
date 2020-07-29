//click funtion for opening and closing modal window

$("#rules").on("click", function () {
  $("#rulesModal").addClass("open");
});
$("#closeRules").on("click", function () {
  $("#rulesModal").removeClass("open");
});

//creating the grid using data- attributes
function gameboard() {
  let squares = "";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      squares += `<div class='grid-item' data-row=${i} data-column=${j}></div>`;
    }
  }
  $("#game-board").html(squares);
}
gameboard();

//generating random number
function randomNumber() {
  return Math.floor(Math.random() * 9);
}

//creating object cunstructor for weapons
function Weapon(name, image, power) {
  this.name = name;
  this.image = image;
  this.power = power;
}

function Player(name) {
  this.name = name;
  this.image = '<img src="images/ironman.png"</img>';
  this.weapon = {
    name: "gauntlet",
  };
  this.lifePoints = 100;
  this.location = {
    row: 0,
    column: 0,
  };
}

let player1 = new Player("squirel");
let player2 = new Player("chimp");
let currentPlayer = player1;

const weapons = [];
function renderWeapons() {
  let weapon1 = new Weapon(
    "gauntlet",
    `<img src="images/gauntlet.png" alt="gauntlet"/>`,
    10
  );
  let weapon2 = new Weapon(
    "soulstone",
    `<img src="images/soul-stone.png" alt="soulstone"/>`,
    10
  );
  let weapon3 = new Weapon(
    "powerstone",
    `<img src="images/power-stone.png" alt="powerstone"/>`,
    10
  );

  weapons.push(weapon1);
  weapons.push(weapon2);
  weapons.push(weapon3);

  for (let i = 0; i < weapons.length; i++) {
    placeItem(weapons[i].name, weapons[i].image);
  }
}

function isPlayer(item) {
  //if player then return true
  //if not a player then return false
  if (item === "chimp" || item === "squirel") {
    return true;
  } else {
    return false;
  }
}

function placeItem(cls, item) {
  let row = randomNumber();
  let column = randomNumber();
  let randomSquare = $(`[data-row=${row}][data-column=${column}]`);
  let isOccupied = randomSquare.hasClass("occupied");
  if (isOccupied) {
    console.log("square is occupied, weapons");
    return placeItem(cls);
  } else {
    randomSquare.html(item);
    return randomSquare.addClass(cls).addClass("occupied");
  }
}

function placePlayer(player) {
  let row = randomNumber();
  let column = randomNumber();
  let randomSquare = $(`[data-row=${row}][data-column=${column}]`);
  let isOccupied = randomSquare.hasClass("occupied");
  if (isOccupied) {
    console.log("square is occupied, player");
    return placePlayer(player);
  } else {
    player["location"] = {
      row: row,
      column: column,
    };
    randomSquare.html(player);
    return randomSquare.addClass(player["name"]).addClass("occupied");
  }
}

function renderBarriers() {
  for (let i = 0; i < 12; i++) {
    placeItem("barrier", '<img src="images/barrier.png" alt="Barrier" />');
  }
}

function renderPlayers() {
  placePlayer('<img src="images/ironman.png"</img>');
  placePlayer('<img src="images/cap-shield.png"</img>');
}

function detectTurn() {
  if (currentPlayer === player1) {
    $("#player1").toggleClass("current");
  } else {
    $("#player2").toggleClass("current");
  }
}

detectTurn();

function switchPlayers() {
  if (currentPlayer === player1) {
    currentPlayer = player1;
  } else {
    currentPlayer = player1;
  }
}

function barrierCheck(squareRow, squareColumn, playerRow, playerColumn) {
  //console.log(squareRow, squareColumn, playerRow, playerColumn);
  if (squareRow === playerRow) {
    //console.log("moving horizontally");

    if (playerColumn < squareColumn) {
      //console.log('going right');
      for (let i = playerColumn; i <= squareColumn; i++) {
        let hasBarrier = $(
          `[data-row=${squareRow}][data-column=${i}]`
        ).hasClass("barrier");
        if (hasBarrier) {
          return true;
        }
      }
      return false;
    } else {
      if (squareColumn < playerColumn) {
        //console.log('going left');
        for (let j = squareColumn; j <= playerColumn; j++) {
          let hasBarrier = $(
            `[data-row=${squareRow}][data-column=${j}]`
          ).hasClass("barrier");
          if (hasBarrier) {
            return true;
          }
        }
        return false;
      }
    }
  } else {
    //console.log('moving vertically');

    if (squareRow < playerRow) {
      //console.log('going up');
      for (let k = squareRow; k <= playerRow; k++) {
        let hasBarrier = $(
          `[data-row=${k}][data-column=${squareColumn}]`
        ).hasClass("barrier");
        if (hasBarrier) {
          return true;
        }
      }
      return false;
    } else {
      if (playerRow < squareRow) {
        //console.log('going down');
        for (let l = playerRow; l <= squareRow; l++) {
          let hasBarrier = $(
            `[data-row=${l}][data-column=${squareColumn}]`
          ).hasClass("barrier");
          if (hasBarrier) {
            return true;
          }
        }
        return false;
      }
    }
  }
}
// create function movesCheck(movePlayer)
// if playerRow and playerColumn more 3 in any direction
// then restrict move
// else continue
function movesCheck(squareRow, squareColumn, playerRow, playerColumn) {
  let rowMovesDiff = Math.abs(squareRow - playerRow);
  let columnMovesDiff = Math.abs(squareColumn - playerColumn);
  if (rowMovesDiff === 0 && columnMovesDiff <= 3) {
    //console.log('moving left or right, move allowed');
    return false;
  } else if (columnMovesDiff === 0 && rowMovesDiff <= 3) {
    //console.log('moving up or down, move allowed');
    return false;
  }
  //console.log('cannot move');
  return true;
}

// //weaponCheck
function weaponsCheck(rowSquare, columnSquare) {
  //console.log(weapons);
  for (let i = 0; i < weapons.length; i++) {
    let thisWeapon = $(`[data-row=${rowSquare}][data-column=${columnSquare}]`);
    let hasWeapon = thisWeapon.hasClass(weapons[i]["name"]);
    //console.log(hasWeapon);

    if (hasWeapon) {
      let currentPlayerWeapon = currentPlayer.weapon.name;
      let currentSquareWeapon = weapons[i]["name"];
      console.log(currentSquareWeapon);
      console.log(currentPlayer.weapon.name);
      thisWeapon.removeClass(currentSquareWeapon);
      thisWeapon.addClass(currentPlayerWeapon);

      currentPlayer.weapon.name = currentSquareWeapon;
      console.log(currentPlayer.weapon.name);
    }
  }
}

//------------Step 3: Fight-----------
function checkThreat() {
  console.log("currentPlayer", currentPlayer);
  let currentPlayerRow = currentPlayer["location"]["row"];
  //console.log(currentPlayerRow);
  let currentPlayerColumn = currentPlayer["location"]["column"];

  let adjacentSquares = [
    [currentPlayerRow - 1, currentPlayerColumn],
    [currentPlayerRow, currentPlayerColumn + 1],
    [currentPlayerRow + 1, currentPlayerColumn],
    [currentPlayerRow, currentPlayerColumn - 1],
  ];
  //console.log('adjacentSquares',adjacentSquares);
  for (let i = 0; i < adjacentSquares.length; i++) {
    //console.log(adjacentSquares[i][0],adjacentSquares[i][1]);
    let isOpponentPresent = $(
      `[data-row=${adjacentSquares[i][0]}][data-column=${adjacentSquares[i][1]}]`
    );
    //console.log('isOpponentPresent',isOpponentPresent);
    if (isOpponentPresent) {
      return true;
    }
    //return true
  }
  return false;
  //console.log(isOpponentPresent);
}

function playersFight() {
  let isThreatPresent = checkThreat();

  //set health to 100 for each player
  let player1Health = player1.lifePoints;
  let player2Health = player2.lifePoints;

  player1.lifePoints = player1.lifePoints - 10;

  // threat found = current player attack or defend.
  if (isThreatPresent) {
    console.log("player has found threat");
    let opponent;
    if (currentPlayer === player1) {
      opponent = player2;
    } else {
      opponent = player1;
    }
    // if player2defends === true {playe2life -= player1.attack / 2}
    // let attackOrDefend = prompt("To attack, press 1 to defend, press 2");
    if (attackOrDefend == 1) {
      console.log("fightOrDefend", "player has chosen to attack");
      opponent.lifePoints = opponent.lifePoints - 10;
      console.log("opponent lifepoints", opponent.lifePoints);
    } else if (attackOrDefend == 2) {
      console.log("fightOrDefend", "player has chosen to defend");
      currentPlayer.lifePoints = currentPlayer.lifePoints - 5;
      console.log("currentplayer lifepoints", currentPlayer.lifePoints);
    } else {
      //implement recursion here
      prompt("To attack, press 1 to defend, press 2");
    }
    // if player2defends === false {player1life -= player2.attack}

    // when a players health points drop to 0 or below, declare winner
    // if (player2life <= 0) {
    //alert('Player 1 wins')};
    //if (player1life <= 0) {alert('Player 2 Wins')};
  } else {
    //console.log('no threat found');
  }
}

function movePlayer(rowSquare, columnSquare) {
  weaponsCheck(rowSquare, columnSquare);

  let squareRow = parseInt(rowSquare);
  let squareColumn = parseInt(columnSquare);
  //find current positon of placeplayers
  let playerRow = parseInt(currentPlayer["location"]["row"]);
  let playerColumn = parseInt(currentPlayer["location"]["column"]);
  let isBlocked = barrierCheck(
    squareRow,
    squareColumn,
    playerRow,
    playerColumn
  );
  let isMoveDisallowed = movesCheck(
    squareRow,
    squareColumn,
    playerRow,
    playerColumn
  );
  //console.log(isMoveDisallowed);
  if (isBlocked || isMoveDisallowed) {
    //console.log('insideCheck');
    alert("cannot move there");
  } else {
    //update player object with new new square information
    currentPlayer["location"]["row"] = squareRow;
    currentPlayer["location"]["column"] = squareColumn;

    //remove the class of the players from the old squares
    $(`[data-row=${playerRow}][data-column=${playerColumn}]`)
      .removeClass(currentPlayer["name"])
      .removeClass("occupied");

    //add the class of the players to the new squares
    //$(`[data-row=${row}][data-column=${column}]`);
    $(`[data-row=${squareRow}][data-column=${squareColumn}]`)
      .addClass(currentPlayer["name"])
      .addClass("occupied");
    playersFight();
    switchPlayers();
  }
}

renderBarriers();
renderWeapons();
renderPlayers();

$(document).ready(function () {
  $("#game-board").on("click", function () {
    let rowSquare = event.target.dataset.row;
    let columnSquare = event.target.dataset.column;
    movePlayer(rowSquare, columnSquare);
    //console.log(rowSquare, columnSquare);
  });
  $("#newGame").on("click", function () {
    $("#health1").html(player1.lifePoints);
    $("#health2").html(player1.lifePoints);
    detectTurn();
  });
});