function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPlaceShip(ship, player) {
    const directions = ["horizontal", "vertical"];
    while (true) {
        let index = getRandomIntInclusive(0, 1);
        let x = getRandomIntInclusive(0, 9);
        let y = getRandomIntInclusive(0, 9);
        const placed = player.gameboard.placeShip(ship, x, y, directions[index])
        if (placed) {
            return true;
        }
    }
}

module.exports = randomPlaceShip;
