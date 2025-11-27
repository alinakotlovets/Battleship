const Ship = require("../core/ship");
const {getDirection} = require("./shipOrientation");
const {getSelectedShip, setSelectedShip} = require("./shipSelection");

function initPlaceShip(realPlayer, computerPlayer, makeBoard, handleEnter, handleLeave) {

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
            setSelectedShip(null);
        }
    }

    return {placingShip};
}

module.exports = initPlaceShip;
