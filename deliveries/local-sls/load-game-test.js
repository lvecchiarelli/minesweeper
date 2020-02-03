'use strict';
const loadGame = require('./load-game').handler;
describe("Load game test", async () => {
    it("Handler load-game 1 should work", async () => {
        const result = await loadGame(1);
        console.log(result);
    })

    it("Handler load-game 899 should return empty game", async () => {
        const result = await loadGame(899);
        console.log(result);
    })
});