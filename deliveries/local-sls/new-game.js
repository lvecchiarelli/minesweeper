'use strict';
const InMemoryRepository = require('../../repositories/inmemory');
const repository = new InMemoryRepository();
const newGameUsecase = require('../../usecases/new-game')(repository);
const handler = async (difficulty) => {
    return newGameUsecase(difficulty);
};
module.exports = {
    handler,
};