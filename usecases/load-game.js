'use strict';
const Game = require('../entities/game');
const loadGame = (repository) => async (id) => {
    try {
        const gameEntity = new Game(repository);
        await gameEntity.load(id);
        console.log('Load game - USECASE, entity: ' + JSON.stringify(gameEntity));
        return {
            ok: true,
            gameEntity: gameEntity,
        };
    } catch (e) {
        return {
            error: e.message,
        };
    }
};
module.exports = loadGame;