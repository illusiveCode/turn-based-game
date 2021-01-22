import Player from "./player";
import Game from "./game";

import { capShield, ironman, weapon0, weapon1, weapon2, weapon3 } from "./assets";

const weapons = [weapon0, weapon1, weapon2, weapon3];

Game.generateMap();

const newGame = () => {
    $("#gameOverModal").removeClass("open");

    const player1 = new Player("Ironman", ironman, weapon1).generate();

    const player2 = new Player("Cap America", capShield, weapon0, player1.id).generate();

    Game.generateMap();

    // console.log(player1, player2)

    const game = new Game([player1, player2]);

    game.newGame();

    const wDetails = [
        { name: "Space", damage: 10 },
        { name: "Power", damage: 10 },
        { name: "Soul", damage: 20 },
        { name: "Gauntlet", damage: 30 },
    ];

    $("#legend").html("<div></div>");

    for (let i = 0; i < weapons.length; i++) {
        $("#legend > div").append(`
    <div>
    <span>${wDetails[i].name}</span>
      <img src=${weapons[i]} alt="" />
      <span>${wDetails[i].damage}</span>
    </div>`);
    }
};

$("#newGame").on("click", newGame);
$("#newGame2").on("click", newGame);

$("#rules").on("click", () => {
    $("#rulesModal").addClass("open");
});
$("#closeRules").on("click", () => {
    $("#rulesModal").removeClass("open");
});
