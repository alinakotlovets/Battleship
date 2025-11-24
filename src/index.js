import style from './style.css'

const Player = require('./player');
const Ship = require('./ship');


const contentBox = document.getElementById('content-box');
const gameboardBox = document.createElement("div");
gameboardBox.classList.add('gameboard');
contentBox.append(gameboardBox);


const realPlayer = new Player(false);
const computerPlayer = new Player(true);

const ship2 = new Ship(2);
const ship3 = new Ship(3);
const ship4 = new Ship(4);
const ship5 = new Ship(5);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPlaceShip(ship, player) {
    const directions = ["horizontal", "vertical"];
    while (true) {
        let index = getRandomIntInclusive(0, 1);
        let x = getRandomIntInclusive(0, 9);
        let y = getRandomIntInclusive(0, 9);
        const placed = player.gameboard.placeShip(ship, x, y, directions[index])
        if (placed) {
            return true;
        }
    }
}

randomPlaceShip(ship2, realPlayer);
randomPlaceShip(ship3, realPlayer);
randomPlaceShip(ship3, realPlayer);
randomPlaceShip(ship4, realPlayer);
randomPlaceShip(ship5, realPlayer);


randomPlaceShip(ship2, computerPlayer);
randomPlaceShip(ship3, computerPlayer);
randomPlaceShip(ship3, computerPlayer);
randomPlaceShip(ship4, computerPlayer);
randomPlaceShip(ship5, computerPlayer);


function makeBoard(player) {

    for (let row = 0; row < player.gameboard.board.length; row++) {
        for (let col = 0; col < player.gameboard.board[row].length; col++) {
            let button = document.createElement('button');
            button.dataset.row = row;
            button.dataset.col = col;
            if (player.gameboard.board[row][col] !== null) {
                button.classList.add('ship-btn');
            } else {
                button.classList.remove('board-btn');
            }
            gameboardBox.appendChild(button);
        }
    }
}

makeBoard(realPlayer, computerPlayer);