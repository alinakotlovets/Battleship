export function initNewGameHandler({
                                       realPlayer,
                                       computerPlayer,
                                       makeBoard,
                                       cleanerPlayer,
                                       placingShip,
                                       handleEnter,
                                       handleLeave,
                                       startGameBtn,
                                       startNewGameBtn,
                                       winnerBox,
                                       controllerBox,
                                       boardsBox,
                                       playerClickHandler,
                                       randomPlaceShipsBtn,
                                       setRandomPlaceShip,
                                       resetChoiceBtn,
                                   }) {

    function remakeBoard() {
        cleanerPlayer(realPlayer);
        boardsBox.innerHTML = "";
        makeBoard(realPlayer);
        makeBoard(computerPlayer);
        winnerBox.style.display = "none";
        document.querySelectorAll(".place-ship-btn").forEach(btn => btn.disabled = false);

        const realButtons = document.querySelectorAll('.gameboard[data-player="real"] .board-btn');
        realButtons.forEach(btn => {
            btn.addEventListener("mouseenter", handleEnter);
            btn.addEventListener("mouseleave", handleLeave);
            btn.addEventListener("click", placingShip);
        });
    }

    startGameBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (realPlayer.gameboard.ships.length === 5) {
            document.querySelector(".boards-box").addEventListener("click", playerClickHandler);
            controllerBox.style.display = "none";
        }
    });

    startNewGameBtn.addEventListener("click", e => {
        e.preventDefault();
        remakeBoard();
        controllerBox.style.display = "flex";
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
        remakeBoard();
    })
    return {remakeBoard};
}
