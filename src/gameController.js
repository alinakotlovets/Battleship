const updateBoard = require("./events");

function takeTurn(player, otherPlayer, x, y) {
    let validMove;
    if (player.isComputer) {
        player.attack(otherPlayer);
        validMove = true;
    } else {
        validMove = player.attack(otherPlayer, x, y);
    }
    updateBoard(player, otherPlayer);
    if (otherPlayer.gameboard.isAllSunk()) {
        return "win";
    }
    return validMove;
}

module.exports = takeTurn;