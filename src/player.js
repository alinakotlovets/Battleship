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

    attack(player, x, y) {
        if (player.isComputer) {
            if (x === undefined || y === undefined) {
                return false;
            }
            player.gameboard.receiveAttack(x, y);

        } else {
            let randX = getRandomIntInclusive(0, 9);
            let randY = getRandomIntInclusive(0, 9);
            player.gameboard.receiveAttack(randX, randY);
        }
    }
}

module.exports = Player;