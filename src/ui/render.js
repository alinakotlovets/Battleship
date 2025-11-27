const contentBox = document.getElementById('content-box');
const boardsBox = document.createElement('div')
boardsBox.classList.add('boards-box');
contentBox.append(boardsBox);

function makeBoard(player) {
    const gameboardBox = document.createElement("div");
    gameboardBox.classList.add('gameboard');
    gameboardBox.dataset.player = player.isComputer ? "computer" : "real";
    boardsBox.append(gameboardBox);
    for (let row = 0; row < player.gameboard.board.length; row++) {
        for (let col = 0; col < player.gameboard.board[row].length; col++) {
            let button = document.createElement('button');
            button.dataset.row = row.toString();
            button.dataset.col = col.toString();
            if (player.isComputer === false) {
                if (player.gameboard.board[row][col] !== null) {
                    button.classList.add('board-btn');
                    button.classList.add('ship-btn');
                } else {
                    button.classList.add('board-btn');
                }
            } else {
                button.classList.add('board-btn');
            }
            gameboardBox.appendChild(button);
        }
    }
}


module.exports = makeBoard;