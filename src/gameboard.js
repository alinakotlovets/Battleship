class Gameboard {
    constructor() {
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
        this.missedAttacks = [];
        this.hitedShipCells = [];
        this.ships = [];
        this.attackedCells = new Set();
    }

    placeShip(ship, start, end, direction) {
        if (start >= 10 || end >= 10 || start + ship.length >= 10 || end + ship.length >= 10) {
            return false;
        }
        for (let i = 0; i < ship.length; i++) {
            let x = direction === "horizontal" ? start + i : start;
            let y = direction === "horizontal" ? end : end + i;
            if (this.board[x][y] !== null) {
                return false;
            }
        }
        for (let i = 0; i < ship.length; i++) {
            let x = direction === "horizontal" ? start + i : start;
            let y = direction === "horizontal" ? end : end + i;
            this.board[x][y] = ship;
        }
        this.ships.push(ship);
        return true;
    }

    receiveAttack(x, y) {
        let key = `${x},${y}`;

        if (x >= 10 || y >= 10 || this.attackedCells.has(key)) {
            return false;
        }
        let cell = this.board[x][y];
        this.attackedCells.add(key);
        if (cell !== null) {
            this.hitedShipCells.push([x.toString(), y.toString()]);
            return cell.hit();
        } else {
            this.missedAttacks.push([x.toString(), y.toString()]);
        }

    }

    isAllSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}

module.exports = Gameboard;