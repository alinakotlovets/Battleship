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


    if (targetBoard.dataset.player === "computer") {
        console.log("computer hitedShipCells.length: ", otherPlayer.gameboard.hitedShipCells.length);
        console.log("computer missedAttacks.length: ", otherPlayer.gameboard.missedAttacks.length);
        console.log("hitedShipCells last element: ", otherPlayer.gameboard.hitedShipCells[otherPlayer.gameboard.hitedShipCells.length - 1]);
        console.log("computer missedAttacks last element:", otherPlayer.gameboard.missedAttacks[otherPlayer.gameboard.missedAttacks.length - 1]);
    }
    if (targetBoard.dataset.player === "real") {
        console.log("real player hitedShipCells.length:", otherPlayer.gameboard.hitedShipCells.length);
        console.log("real player missedAttacks.length:", otherPlayer.gameboard.missedAttacks.length);
    }
}

module.exports = updateBoard;