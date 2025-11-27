const initHoverPreview = require("./hoverPreview");

function createControls() {
    const contentBox = document.querySelector(".content-box");

    const controllerBox = document.createElement("div");
    const winnerBox = document.createElement("div");
    const winnerText = document.createElement("h1");
    const startNewGame = document.createElement("button");

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
    randomPlaceShipsBtn.classList.add("blue-btn");

    const mainNavBtnBox = document.createElement("div");
    const placeBtnBox = document.createElement("div");

    mainNavBtnBox.classList.add("main-nav-btn-box");
    placeBtnBox.classList.add("place-btn-box");
    controllerBox.classList.add("controller-box");

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
        btn.classList.add("place-ship-btn")
    );

    placeBtnBox.append(place2shipBtn, place3shipBtn, place3shipBtn2, place4shipBtn, place5shipBtn);
    mainNavBtnBox.append(randomPlaceShipsBtn, resetChoiceBtn, startGameBtn, rotateShipBtn);
    controllerBox.append(placeBtnBox, mainNavBtnBox);
    contentBox.prepend(controllerBox);
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
        placeBtnBox,
        place5shipBtn,
        place4shipBtn,
        place3shipBtn,
        place3shipBtn2,
        place2shipBtn
    };
}

module.exports = createControls;