const Gameboard = require('./gameboard');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Player {
    constructor(isComputer) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard();
    }

    attack(otherPlayer, x, y) {
        if (!this.isComputer) {
            if (otherPlayer.gameboard.attackedCells.has(`${x},${y}`)) {
                return false;
            }
            otherPlayer.gameboard.receiveAttack(x, y);
            return true;
        }
        let randX = getRandomIntInclusive(0, 9);
        let randY = getRandomIntInclusive(0, 9);
        while (otherPlayer.gameboard.attackedCells.has(`${randX},${randY}`)) {
            randX = getRandomIntInclusive(0, 9);
            randY = getRandomIntInclusive(0, 9);
        }
        otherPlayer.gameboard.receiveAttack(randX, randY);
    }
}

module.exports = Player;