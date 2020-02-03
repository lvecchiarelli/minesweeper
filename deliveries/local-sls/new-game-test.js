'use strict';
const newGame = require('./new-game').handler;
describe("New game test", async () => {
    it("Handler new-game should work", async () => {
        const result = await newGame();
        console.log(result);
    })
});