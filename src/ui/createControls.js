const initHoverPreview = require("./hoverPreview");

function createControls() {
    const contentBox = document.querySelector(".content-box");

    const battleShipTitle = document.createElement("h1");
    const controllerBox = document.createElement("div");
    const winnerBox = document.createElement("div");
    const winnerText = document.createElement("h2");
    const startNewGame = document.createElement("button");

    battleShipTitle.innerText = 'Battleship';
    startNewGame.innerText = "Start new game";
    winnerBox.classList.add("winner-box");
    winnerBox.style.display = "none";
    winnerBox.append(winnerText, startNewGame);

    const randomPlaceShipsBtn = document.createElement("button");
    const startGameBtn = document.createElement("button");
    const rotateShipBtn = document.createElement("button");
    const resetChoiceBtn = document.createElement("button");

    resetChoiceBtn.innerText = "Reset Choice";
    startGameBtn.innerText = "Start game";
    rotateShipBtn.innerText = "Rotate ship";
    randomPlaceShipsBtn.innerText = "Random place ships";

    randomPlaceShipsBtn.classList.add("button--primary", "button--small");
    rotateShipBtn.classList.add("button--primary", "button--small");
    startGameBtn.classList.add("button--green", "button--small");
    resetChoiceBtn.classList.add("button--red", "button--small");
    startNewGame.classList.add("button--green", "button--large");

    const mainNavBtnBox = document.createElement("div");
    const placeBtnBox = document.createElement("div");
    const placeBox = document.createElement("div");
    const placeBoxTitle = document.createElement("h2");

    mainNavBtnBox.classList.add("main-nav-btn-box");
    placeBtnBox.classList.add("place-btn-box");
    placeBox.classList.add("place-box");
    controllerBox.classList.add("controller-box");
    placeBoxTitle.innerText = 'Ships to place:'
    // computerBoardBox.classList.add("players-board-box");
    // playerBoardBox.classList.add("players-board-box");
    // playerBoardBoxTitle.innerText = 'Player Board';
    // computerBoardBoxTitle.innerText = 'Computer Board';

    const place5shipBtn = document.createElement("button");
    const place4shipBtn = document.createElement("button");
    const place3shipBtn = document.createElement("button");
    const place3shipBtn2 = document.createElement("button");
    const place2shipBtn = document.createElement("button");

    place5shipBtn.dataset.size = "5";
    place4shipBtn.dataset.size = "4";
    place3shipBtn.dataset.size = "3";
    place3shipBtn2.dataset.size = "3";
    place2shipBtn.dataset.size = "2";

    place3shipBtn.dataset.id = "3-1";
    place3shipBtn2.dataset.id = "3-2";

    place5shipBtn.innerText = "Place ship(5)";
    place4shipBtn.innerText = "Place ship(4)";
    place3shipBtn.innerText = "Place ship(3)";
    place3shipBtn2.innerText = "Place ship(3)";
    place2shipBtn.innerText = "Place ship(2)";

    [place5shipBtn, place4shipBtn, place3shipBtn, place3shipBtn2, place2shipBtn].forEach(btn =>
        btn.classList.add("place-ship-btn", "button--primary", "button--large")
    );

    placeBtnBox.append(place2shipBtn, place3shipBtn, place3shipBtn2, place4shipBtn, place5shipBtn);
    placeBox.append(placeBoxTitle, placeBtnBox);
    mainNavBtnBox.append(randomPlaceShipsBtn, resetChoiceBtn, startGameBtn, rotateShipBtn);
    controllerBox.append(placeBox, mainNavBtnBox);
    contentBox.prepend(battleShipTitle, controllerBox);
    contentBox.prepend(winnerBox);

    return {
        controllerBox,
        winnerBox,
        winnerText,
        startNewGame,
        randomPlaceShipsBtn,
        startGameBtn,
        rotateShipBtn,
        resetChoiceBtn,
        placeBox,
        place5shipBtn,
        place4shipBtn,
        place3shipBtn,
        place3shipBtn2,
        place2shipBtn
    };
}

module.exports = createControls;