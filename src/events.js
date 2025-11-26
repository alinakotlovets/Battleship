function updateBoard(player, otherPlayer) {
    const targetBoard = document.querySelector(`.gameboard[data-player="${otherPlayer.isComputer ? "computer" : "real"}"]`);
    for (let data of otherPlayer.gameboard.missedAttacks) {
        const row = String(data[0]);
        const col = String(data[1]);
        const btn = targetBoard.querySelector(
            `.board-btn[data-row="${row}"][data-col="${col}"]`
        );
        if (!btn) {
            console.error("Didnt find cel for:", data);
            continue;
        }
        btn.classList.add("missed");
    }

    for (let data of otherPlayer.gameboard.hitedShipCells) {
        const row = String(data[0]);
        const col = String(data[1]);
        const btn = targetBoard.querySelector(
            `.board-btn[data-row="${row}"][data-col="${col}"]`
        );
        if (!btn) {
            console.error("Didnt find cel for:", data);
            continue;
        }
        btn.classList.add("hited");
    }

}

module.exports = updateBoard;