let selectedShip = null;

function getSelectedShip() {
    return selectedShip;
}

function setSelectedShip(value) {
    selectedShip = value;
}

function placeShipBnt(placeBox) {
    placeBox.addEventListener("click", (e) => {
        let item = e.target.closest(".place-ship-btn");
        if (!item) return;
        selectedShip = {
            size: item.dataset.size,
            id: item.dataset.id
        };
    })
}

module.exports = {
    getSelectedShip,
    setSelectedShip,
    placeShipBnt
}