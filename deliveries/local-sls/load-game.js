'use strict';

const { gamesData } = require('./games-data');

const InMemoryRepository = require('../../repositories/inmemory');
const repository = new InMemoryRepository(gamesData);
const loadGameUsecase = require('../../usecases/load-game')(repository);

const handler = async (id) => {
  const game = loadGameUsecase(id);
  return game;
};

module.exports = {
  handler,
};
