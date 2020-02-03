'use strict';
const Game = require('../entities/game');
const newGame = (repository) => async (difficulty) => {
    console.log('New game - USECASE, pamars: [difficulty: ' + difficulty + ']');
    const gameEntity = new Game(repository);
    try {
        return {
            ok: true,
            gameEntity: gameEntity.newGame(difficulty),
        };
    } catch (e) {
        return {
            error: e.message,
        };
    }
};
module.exports = newGame;