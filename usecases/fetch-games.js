'use strict';

const SavedGames = require('../entities/saved-games');

const fetchGames = (repository) => async () => {
  try {
    const gamesEntity = new SavedGames(repository);
    await gamesEntity.fetchAll();
    console.log('Fetch games - USECASE, entity: ' + JSON.stringify(gamesEntity));
    return {
      ok: true,
      savedGamesEntity: gamesEntity,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

module.exports = fetchGames;
