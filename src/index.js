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

function setRandomPlaceShip(player) {
    shipLengthArray.forEach(length => randomPlaceShip(new Ship(length), player));
}

rotateShip(controls.rotateShipBtn);

const {handleEnter, handleLeave} = initHoverPreview(
    getDirection,
    getSelectedShip
);

placeShipBnt(controls.placeBtnBox)
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
    resetChoiceBtn: controls.resetChoiceBtn
});

setRandomPlaceShip(computerPlayer);

makeBoard(realPlayer);
makeBoard(computerPlayer);

document.querySelectorAll('.gameboard[data-player="real"] .board-btn').forEach(btn => {
    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);
    btn.addEventListener("click", placingShip);
});

let isRealPlayerTurn = true;

function playerClickHandler(event) {
    const targetBoard = document.querySelector('.gameboard[data-player="computer"]');
    if (!targetBoard.contains(event.target)) return;
    const item = event.target.closest(".board-btn");
    if (!item) return;

    if (isRealPlayerTurn) {
        const validMove = takeTurn(realPlayer, computerPlayer, item.dataset.row, item.dataset.col);
        if (validMove === "win") {
            controls.winnerText.innerText = "You win!";
            controls.winnerBox.style.display = "flex";
            isRealPlayerTurn = null;
            return;
        }
        if (!validMove) return;
        isRealPlayerTurn = false;
    }

    if (isRealPlayerTurn === false) {
        setTimeout(() => {
            const validMove = takeTurn(computerPlayer, realPlayer);
            if (validMove === "win") {
                controls.winnerText.innerText = "Computer win!";
                controls.winnerBox.style.display = "flex";
                isRealPlayerTurn = null;
                return;
            }
            isRealPlayerTurn = true;
        }, 500);
    }
}

