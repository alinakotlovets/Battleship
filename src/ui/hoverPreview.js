const {getSelectedShip} = require("./shipSelection");
const {getDirection} = require("./shipOrientation");

function initHoverPreview(getDirection, getSelectedShip) {
    function handleEnter(e) {
        const selected = getSelectedShip();
        if (!selected) return;
        let shipSizeData = parseInt(selected.size);
        const btn = e.target;
        const targetBoard = document.querySelector(`.gameboard[data-player="real"]`);
        let row = parseInt(btn.dataset.row);
        let col = parseInt(btn.dataset.col);
        let direction = getDirection();

        function setDirection(direction) {
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

        setDirection(direction);
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

        function setDirection(direction) {
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

        setDirection(direction);
    }


    return {handleEnter, handleLeave};
}

module.exports = initHoverPreview;