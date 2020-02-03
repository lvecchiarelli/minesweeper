'use strict';

const Game = require('../entities/game');

const saveGame = (repository) => async (data) => {
  try {
    const gameEntity = new Game(repository);
    console.log('Save game - USECASE, params: ' + JSON.stringify(data));
    gameEntity.game = data;
    await gameEntity.save();
    console.log('Save game - USECASE, return: ' + JSON.stringify(gameEntity.game));
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

module.exports = saveGame;
