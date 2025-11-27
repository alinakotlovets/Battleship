const {getSelectedShip} = require("./shipSelection");
const {getDirection} = require("./shipOrientation");
let cells = [];

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
        let cells = [];
        cells.push(btn);
        const dataRow = direction === 'vertical' ? 1 : 0;
        const dataCol = direction === 'horizontal' ? 1 : 0;

        let invalid = false;
        for (let i = 1; i < shipSizeData; i++) {
            let newRow = row + dataRow * i;
            let newCol = col + dataCol * i;
            let cell = targetBoard.querySelector(`.board-btn[data-row="${newRow}"][data-col="${newCol}"]`);
            if (!cell) {
                invalid = true;
                break
            }
            cells.push(cell);
        }

        for (let cell of cells) {
            if (cell.classList.contains("ship-btn")) {
                invalid = true;
                break;
            }
        }
        for (let cell of cells) {
            if (invalid) {
                cell.classList.remove("active");
                cell.classList.add("invalid");
            } else {
                cell.classList.add("active");
                cell.classList.remove("invalid");
            }
        }
    }


    function handleLeave(e) {
        const selected = getSelectedShip();
        if (!selected) return;

        const shipSizeData = parseInt(selected.size);
        const btn = e.target;
        const targetBoard = document.querySelector(`.gameboard[data-player="real"]`);
        const row = parseInt(btn.dataset.row);
        const col = parseInt(btn.dataset.col);
        const direction = getDirection();

        const deltaRow = direction === 'vertical' ? 1 : 0;
        const deltaCol = direction === 'horizontal' ? 1 : 0;

        for (let i = 0; i < shipSizeData; i++) {
            const newRow = row + deltaRow * i;
            const newCol = col + deltaCol * i;
            const cell = targetBoard.querySelector(`.board-btn[data-row="${newRow}"][data-col="${newCol}"]`);
            if (!cell) break;
            cell.classList.remove('active', 'invalid');
        }
    }

    return {handleEnter, handleLeave};
}

module.exports = initHoverPreview;