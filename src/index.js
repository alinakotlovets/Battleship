const style = require('./style.css');
const Player = require('./player');
const Ship = require('./ship');
const randomPlaceShip = require('./helpers');
const makeBoard = require('./render');
const takeTurn = require('./gameController');


const realPlayer = new Player(false);
const computerPlayer = new Player(true);
const shipLengthArray = [2, 3, 3, 4, 5];

function setRandomPlaceShip(player) {
    for (let i = 0; i < shipLengthArray.length; i++) {
        const ship = new Ship(shipLengthArray[i]);
        randomPlaceShip(ship, player);
    }
}

setRandomPlaceShip(realPlayer);
setRandomPlaceShip(computerPlayer);


makeBoard(realPlayer);
makeBoard(computerPlayer);
let isRealPlayerTurn = true;

function playerClickHandler(event) {
    const targetBoard = document.querySelector(`.gameboard[data-player="computer"]`);
    if (!targetBoard.contains(event.target)) return;
    const item = event.target.closest(".board-btn");
    if (!item) return;


    if (isRealPlayerTurn) {
        let validMove = takeTurn(realPlayer, computerPlayer, item.dataset.row, item.dataset.col);
        if (validMove === "win") {
            alert("You win!");
            isRealPlayerTurn = null;
            return;
        }
        if (!validMove) return;
        isRealPlayerTurn = false;
    }

    if (isRealPlayerTurn === false) {
        setTimeout(() => {
            let validMove = takeTurn(computerPlayer, realPlayer);
            if (validMove === "win") {
                alert("Computer win!");
                isRealPlayerTurn = null;
                return;
            }
            isRealPlayerTurn = true;
        }, 500);
    }
}

document.querySelector(".boards-box").addEventListener("click", playerClickHandler);
