const style = require('./style.css');
const Player = require('./player');
const Ship = require('./ship');
const {randomPlaceShip, cleanerPlayer} = require('./helpers');
const makeBoard = require('./render');
const takeTurn = require('./gameController');
const contentBox = document.querySelector(".content-box")
const controllerBox = document.createElement("div");
const randomPlaceShipsBtn = document.createElement("button");
const startGameBtn = document.createElement("button");
const rotateShipBtn = document.createElement("button");
const resetChoiceBtn = document.createElement("button");
resetChoiceBtn.innerText = "Reset Choice";
const mainNavBtnBox = document.createElement("div");
mainNavBtnBox.classList.add("main-nav-btn-box");
const placeBtnBox = document.createElement("div");
placeBtnBox.classList.add("place-btn-box");
const place5shipBtn = document.createElement("button");
place5shipBtn.dataset.size = "5";
place5shipBtn.innerText = "Place ship(5)"
place5shipBtn.classList.add("place-ship-btn");
const place4shipBtn = document.createElement("button");
place4shipBtn.dataset.size = "4";
place4shipBtn.innerText = "Place ship(4)"
place4shipBtn.classList.add("place-ship-btn");
const place3shipBtn = document.createElement("button");
place3shipBtn.dataset.size = "3";
place3shipBtn.dataset.id = "3-1";
place3shipBtn.innerText = "Place ship(3)"
place3shipBtn.classList.add("place-ship-btn");
const place3shipBtn2 = document.createElement("button");
place3shipBtn2.dataset.size = "3";
place3shipBtn2.dataset.id = "3-2";
place3shipBtn2.innerText = "Place ship(3)";
place3shipBtn2.classList.add("place-ship-btn");
const place2shipBtn = document.createElement("button");
place2shipBtn.dataset.size = "2";
place2shipBtn.innerText = "Place ship(2)";
place2shipBtn.classList.add("place-ship-btn");
startGameBtn.innerText = "Start game";
rotateShipBtn.innerText = "Rotate ship";
randomPlaceShipsBtn.innerText = "Random place ships";
randomPlaceShipsBtn.classList.add("blue-btn");
controllerBox.classList.add("controller-box");
contentBox.prepend(controllerBox);
placeBtnBox.append(place2shipBtn, place3shipBtn, place3shipBtn2, place4shipBtn, place5shipBtn);
mainNavBtnBox.append(randomPlaceShipsBtn, resetChoiceBtn, startGameBtn, rotateShipBtn)
controllerBox.append(placeBtnBox, mainNavBtnBox);


const realPlayer = new Player(false);
const computerPlayer = new Player(true);
const shipLengthArray = [2, 3, 3, 4, 5];

function setRandomPlaceShip(player) {
    for (let i = 0; i < shipLengthArray.length; i++) {
        const ship = new Ship(shipLengthArray[i]);
        randomPlaceShip(ship, player);
    }
}


setRandomPlaceShip(computerPlayer);
let selectedShip = null;

function getSelectedShip() {
    return selectedShip;
}

document.querySelector('.place-btn-box').addEventListener("click", (e) => {
    let item = e.target.closest(".place-ship-btn");
    if (!item) return;
    selectedShip = {
        size: item.dataset.size,
        id: item.dataset.id
    };
})

let currentDirection = 'vertical';
rotateShipBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentDirection === 'vertical') {
        currentDirection = 'horizontal';
    } else {
        currentDirection = 'vertical';
    }

})

function getDirection() {
    return currentDirection;
}

function handleEnter(e) {
    const selected = getSelectedShip();
    if (!selected) return;
    let shipSizeData = parseInt(selected.size);
    const btn = e.target;
    const targetBoard = document.querySelector(`.gameboard[data-player="real"]`);
    let row = parseInt(btn.dataset.row);
    let col = parseInt(btn.dataset.col);
    let direction = getDirection();

    function test(direction) {
        if (!btn.classList.contains("ship-btn")) {
            let data;
            if (direction === "horizontal") {
                data = col;
            } else {
                data = row;
            }
            if (data + shipSizeData <= 10) {
                for (let i = 0; i < shipSizeData; i++) {
                    let cell;
                    if (direction === "horizontal") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row}"][data-col="${col + i}"]`);
                    }
                    if (direction === "vertical") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row + i}"][data-col="${col}"]`);
                    }
                    if (!cell) break;
                    cell.classList.add("active");
                    cell.classList.remove("invalid");
                }
            } else {
                for (let i = 0; i < shipSizeData; i++) {
                    let cell;
                    if (direction === "horizontal") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row}"][data-col="${col + i}"]`);
                    }
                    if (direction === "vertical") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row + i}"][data-col="${col}"]`);
                    }
                    if (!cell) break;
                    cell.classList.remove("active");
                    cell.classList.add("invalid");
                }
            }
        }
        for (let i = 0; i < shipSizeData; i++) {
            let cell = targetBoard.querySelector(`.board-btn[data-row="${row}"][data-col="${col}"]`);
            if (!cell) break;
            if (cell.classList.contains("ship-btn")) {
                btn.classList.remove("active");
                btn.classList.add("invalid");
                for (let i = 0; i < shipSizeData; i++) {
                    let cell;
                    if (direction === "horizontal") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row}"][data-col="${col + i}"]`);
                    }
                    if (direction === "vertical") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row + i}"][data-col="${col}"]`);
                    }
                    if (!cell) break;
                    cell.classList.remove("active");
                    cell.classList.add("invalid");
                }
            }
        }
    }

    test(direction);
}


function handleLeave(e) {
    const selected = getSelectedShip();
    if (!selected) return;
    let shipSizeData = parseInt(selected.size);

    const btn = e.target;
    const targetBoard = document.querySelector(`.gameboard[data-player="real"]`);
    let row = parseInt(btn.dataset.row);
    let col = parseInt(btn.dataset.col);
    let direction = getDirection();

    function test(direction) {
        if (!btn.classList.contains("ship-btn")) {
            let data;
            if (direction === "horizontal") {
                data = col;
            } else {
                data = row;
            }
            if (data + shipSizeData <= 10) {
                for (let i = 0; i < shipSizeData; i++) {
                    let cell;
                    if (direction === "horizontal") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row}"][data-col="${col + i}"]`);
                    }
                    if (direction === "vertical") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row + i}"][data-col="${col}"]`);
                    }
                    if (!cell) break;
                    cell.classList.remove("active");
                    cell.classList.remove("invalid");
                }
            } else {
                for (let i = 0; i < shipSizeData; i++) {
                    let cell;
                    if (direction === "horizontal") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row}"][data-col="${col + i}"]`);
                    }
                    if (direction === "vertical") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row + i}"][data-col="${col}"]`);
                    }
                    if (!cell) break;
                    cell.classList.remove("active");
                    cell.classList.remove("invalid");
                }
            }
        }
        for (let i = 0; i < shipSizeData; i++) {
            let cell = targetBoard.querySelector(`.board-btn[data-row="${row}"][data-col="${col}"]`);
            if (!cell) break;
            if (cell.classList.contains("ship-btn")) {
                btn.classList.remove("active");
                btn.classList.remove("invalid");
                for (let i = 0; i < shipSizeData; i++) {
                    let cell;
                    if (direction === "horizontal") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row}"][data-col="${col + i}"]`);
                    }
                    if (direction === "vertical") {
                        cell = targetBoard.querySelector(`.board-btn[data-row="${row + i}"][data-col="${col}"]`);
                    }
                    if (!cell) break;
                    cell.classList.remove("active");
                    cell.classList.remove("invalid");
                }
            }
        }
    }

    test(direction);
}

function placingShip(e) {
    const item = e.target;
    const selected = getSelectedShip();
    if (!selected) return;
    let shipSizeData = parseInt(selected.size);
    let ship = new Ship(shipSizeData);

    if (item.classList.contains("active")) {
        e.preventDefault();
        document.querySelector(".boards-box").innerHTML = "";
        let direction = getDirection();
        realPlayer.gameboard.placeShip(ship, parseInt(item.dataset.row), parseInt(item.dataset.col), `${direction}`)
        makeBoard(realPlayer);
        makeBoard(computerPlayer);
        const realButtons = document.querySelectorAll('.gameboard[data-player="real"] .board-btn');
        realButtons.forEach(btn => {
            btn.addEventListener("mouseenter", handleEnter);
            btn.addEventListener("mouseleave", handleLeave);
            btn.addEventListener("click", placingShip);
        });
        let placeBtnId = selected.id;
        if (placeBtnId) {
            const disableBtn = document.querySelector(`.place-ship-btn[data-id="${placeBtnId}"]`);
            if (realPlayer.gameboard.ships.includes(ship)) {
                disableBtn.disabled = true;
            }
        } else {
            const disableBtn = document.querySelector(`.place-ship-btn[data-size="${shipSizeData}"]`);
            if (realPlayer.gameboard.ships.includes(ship)) {
                disableBtn.disabled = true;
            }
        }
        selectedShip = null;
        console.log(realPlayer.gameboard.ships);
        console.log(realPlayer.gameboard.ships.length);
    }
}

makeBoard(realPlayer);
makeBoard(computerPlayer);

const realButtons = document.querySelectorAll('.gameboard[data-player="real"] .board-btn');
realButtons.forEach(btn => {
    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);
    btn.addEventListener("click", placingShip);
});


let isRealPlayerTurn = true;


function playerClickHandler(event) {
    console.log("playerClickHandler fired — event.target:", event.target);
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

startGameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (realPlayer.gameboard.ships.length === 5) {
        document.querySelector(".boards-box").addEventListener("click", playerClickHandler);
        controllerBox.style.display = "none";
    }
});

randomPlaceShipsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanerPlayer(realPlayer);
    document.querySelector(".boards-box").innerHTML = "";
    setRandomPlaceShip(realPlayer);
    makeBoard(realPlayer);
    makeBoard(computerPlayer);
    document.querySelectorAll(".place-ship-btn").forEach(btn => {
        btn.disabled = false;
    });
});

resetChoiceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanerPlayer(realPlayer);
    document.querySelector(".boards-box").innerHTML = "";
    makeBoard(realPlayer);
    makeBoard(computerPlayer);
    const realButtons = document.querySelectorAll('.gameboard[data-player="real"] .board-btn');
    realButtons.forEach(btn => {
        btn.addEventListener("mouseenter", handleEnter);
        btn.addEventListener("mouseleave", handleLeave);
        btn.addEventListener("click", placingShip);
    });
    document.querySelectorAll(".place-ship-btn").forEach(btn => {
        btn.disabled = false;
    });
})



