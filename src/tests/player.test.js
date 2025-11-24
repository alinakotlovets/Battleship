const Player = require('../player');
const Gameboard = require('../gameboard');
const Ship = require('../ship');

let realPlayer;
let computerPlayer;
beforeEach(() => {
    realPlayer = new Player(false);
    computerPlayer = new Player(true);
})
test("is computer", () => {
    expect(computerPlayer.isComputer).toBe(true);
})

test("is not computer", () => {
    expect(realPlayer.isComputer).toBe(false);
})

test("has board", () => {
    expect(realPlayer.gameboard).toBeInstanceOf(Gameboard);
    expect(computerPlayer.gameboard).toBeInstanceOf(Gameboard);
})

test("get attack", () => {
    const ship = new Ship(3);
    computerPlayer.gameboard.placeShip(ship, 0, 0, "horizontal");
    realPlayer.attack(computerPlayer, 0, 0);
    expect(ship.hits).toBe(1);
})

test("missed attack", () => {
    const ship = new Ship(3);
    computerPlayer.gameboard.placeShip(ship, 0, 0, "horizontal");
    realPlayer.attack(computerPlayer, 7, 7);
    expect(ship.hits).toBe(0);
    expect(computerPlayer.gameboard.missedAttacks[0]).toEqual([7, 7]);
})

test("has computer attack", () => {
    const ship = new Ship(3);
    realPlayer.gameboard.placeShip(ship, 0, 0, "horizontal");
    let shipHitsBefore = ship.hits;
    let missedHitsBefore = realPlayer.gameboard.missedAttacks.length;
    computerPlayer.attack(realPlayer);
    let shipHitsAfter = ship.hits;
    let missedHitsAfter = realPlayer.gameboard.missedAttacks.length;
    let missed = missedHitsAfter > missedHitsBefore;
    let hited = shipHitsAfter > shipHitsBefore
    expect(missed || hited).toBe(true);
})


