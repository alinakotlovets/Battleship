const style = require('./style.css');
const Player = require('./core/player');
const Ship = require('./core/ship');
const {randomPlaceShip, cleanerPlayer} = require('./utils/helpers');
const makeBoard = require('./ui/render');
const takeTurn = require('./core/gameController');
const initPlaceShip = require("./ui/placeShip");
const initHoverPreview = require("./ui/hoverPreview");
const {getDirection, rotateShip} = require("./ui/shipOrientation.js");
const {getSelectedShip, placeShipBnt} = require("./ui/shipSelection");
const createControls = require("./ui/createControls.js");
const {initNewGameHandler} = require("./ui/newGameHandler.js");

const controls = createControls();

const realPlayer = new Player(false);
const computerPlayer = new Player(true);
const shipLengthArray = [2, 3, 3, 4, 5];
const gameState = {
    isRealPlayerTurn: true
};


function setRandomPlaceShip(player) {
    shipLengthArray.forEach(length => randomPlaceShip(new Ship(length), player));
}

rotateShip(controls.rotateShipBtn);

const {handleEnter, handleLeave} = initHoverPreview(
    getDirection,
    getSelectedShip
);

placeShipBnt(controls.placeBox)
const {placingShip} = initPlaceShip(realPlayer, computerPlayer, makeBoard, handleEnter, handleLeave);

const gameController = initNewGameHandler({
    realPlayer,
    computerPlayer,
    makeBoard,
    cleanerPlayer,
    placingShip,
    handleEnter,
    handleLeave,
    startGameBtn: controls.startGameBtn,
    startNewGameBtn: controls.startNewGame,
    winnerBox: controls.winnerBox,
    controllerBox: controls.controllerBox,
    boardsBox: document.querySelector(".boards-box"),
    playerClickHandler,
    randomPlaceShipsBtn: controls.randomPlaceShipsBtn,
    setRandomPlaceShip,
    resetChoiceBtn: controls.resetChoiceBtn,
    gameState
});

setRandomPlaceShip(computerPlayer);

makeBoard(realPlayer);
makeBoard(computerPlayer);
console.log(document.querySelectorAll('.board-btn').length);
console.log(document.querySelector('.gameboard[data-player="real"]'));

document.querySelectorAll('.gameboard[data-player="real"] .board-btn').forEach(btn => {
    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);
    btn.addEventListener("click", placingShip);
});

function playerClickHandler(event) {
    const targetBoard = document.querySelector('.gameboard[data-player="computer"]');
    if (!targetBoard.contains(event.target)) return;
    const item = event.target.closest(".board-btn");
    if (!item) return;

    targetBoard.style.pointerEvents = "none";

    if (gameState.isRealPlayerTurn) {
        const validMove = takeTurn(realPlayer, computerPlayer, item.dataset.row, item.dataset.col);
        if (validMove === "win") {
            controls.winnerText.innerText = "You win!";
            controls.winnerBox.style.display = "flex";
            gameState.isRealPlayerTurn = null;
            return;
        }
        if (!validMove) {
            targetBoard.style.pointerEvents = "auto";
            return;
        }
        gameState.isRealPlayerTurn = false;
    }

    if (gameState.isRealPlayerTurn === false) {
        setTimeout(() => {
            const validMove = takeTurn(computerPlayer, realPlayer);
            if (validMove === "win") {
                controls.winnerText.innerText = "Computer win!";
                controls.winnerBox.style.display = "flex";
                gameState.isRealPlayerTurn = null;
                return;
            }
            gameState.isRealPlayerTurn = true;
            targetBoard.style.pointerEvents = "auto";
        }, 500);
    }
}

