import Player from "./player";
import Game from "./game";

import { capShield, ironman, weapons, weapon1, weapon0 } from "./assets";

const player1 = new Player("Ironman", ironman, weapon1).generate();

const player2 = new Player(
  "Cap America",
  capShield,
  weapon0,
  player1.id
).generate();

Game.generateMap();

const game = new Game([player1, player2]);

document.querySelector("#newGame").addEventListener("click", () => {
  game.reset([player1, player2]);
  game.newGame();
});

document.querySelector("#rules").addEventListener("click", () => {
  document.querySelector("#rulesModal").classList.add("open");
});
document.querySelector("#closeRules").addEventListener("click", () => {
  document.querySelector("#rulesModal").classList.remove("open");
});
