'use strict';
const saveGame = require('./save-game').handler;
describe("Save game test", async () => {
    it("Handler save-game should work", async () => {
        const gamesData = {
            "id": 1,
            "size": 9,
            "mines": 10,
            "board": [{
                "isMine": false,
                "isFlagged": false,
                "isRevealed": false,
                "minesCount": 1
            }]
        };
        const result = await saveGame(gamesData);
        console.log(result);
    })
});