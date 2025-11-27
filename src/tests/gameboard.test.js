const Gameboard = require('../core/gameboard');
const Ship = require('../core/ship');
const gameboard = new Gameboard();
const ship = new Ship(3);


test("placing ship", () => {
    gameboard.placeShip(ship, 1, 3, "horizontal")
    expect(gameboard.board[1][3]).toBe(ship);
    expect(gameboard.board[2][3]).toBe(ship);
    expect(gameboard.board[3][3]).toBe(ship);
})
let ship2 = new Ship(2);
test("placing 2 cell ship", () => {
    gameboard.placeShip(ship2, 4, 3, "vertical")
    expect(gameboard.board[4][3]).toBe(ship2);
    expect(gameboard.board[4][4]).toBe(ship2);
})

let ship3 = new Ship(2);
test("placing ship at the same cell", () => {
    expect(gameboard.placeShip(ship3, 4, 3, "vertical")).toBe(false);
})

test("placing ship at the some same cell", () => {
    expect(gameboard.placeShip(ship3, 4, 4, "vertical")).toBe(false);
})

test("placing ship at 11 place", () => {
    expect(gameboard.placeShip(ship2, 11, 11, "vertical")).toBe(false);
})

test("placing ship at 10 place", () => {
    expect(gameboard.placeShip(ship2, 10, 10, "horizontal")).toBe(false);
})

test("is the ship here", () => {
    gameboard.receiveAttack(1, 3);
    expect(ship.hits).toBe(1);
})

test("the no ship here", () => {
    gameboard.receiveAttack(5, 6);
    expect(gameboard.missedAttacks[0]).toEqual([5, 6]);
})

test("cell already been attacked", () => {
    gameboard.receiveAttack(1, 3);
    expect(ship.hits).toBe(1);
})

test("attacked cell 11", () => {
    expect(gameboard.receiveAttack(11, 3)).toBe(false);
})
test("is all sunk", () => {
    expect(gameboard.isAllSunk()).toBe(false);
})