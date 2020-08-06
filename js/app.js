import Player from "./player";
import Game from "./game";
import { capShield, ironman } from "./assets";

const player1 = new Player("Ironman", ironman).generate();

const player2 = new Player("Cap America", capShield, player1.id).generate();

Game.generateMap();

const game = new Game([player1, player2]);

document.querySelector("#newGame").addEventListener("click", () => {
  console.log("clicked...");
  game.newGame();
});

console.log({ player1, player2 });
