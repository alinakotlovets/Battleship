const Ship = require('../core/ship');


let ship;
beforeEach(() => {
    ship = new Ship(3);
});
test("has length", () => {
    expect(ship.length).toBe(3);
})

test("has hist 0 at the start", () => {
    expect(ship.hits).toBe(0);
})

test("has 1 after hit", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
})

test("has been sunk after 3 hit", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})

test("has not been sunk after 2 hit", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
})

test("has not been sunk after 3 hit", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
})