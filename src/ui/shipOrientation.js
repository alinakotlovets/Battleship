const {randomPlaceShip} = require("../utils/helpers");
let currentDirection = 'vertical';

function rotateShip(rotateShipBtn) {
    rotateShipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentDirection === 'vertical') {
            currentDirection = 'horizontal';
        } else {
            currentDirection = 'vertical';
        }

    })
}

function getDirection() {
    return currentDirection;
}

module.exports = {
    rotateShip,
    getDirection
}