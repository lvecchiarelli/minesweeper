'use strict';

const InMemoryRepository = require('../../repositories/inmemory');
const repository = new InMemoryRepository();
const saveGameUsecase = require('../../usecases/save-game')(repository);

const handler = async (data) => {
  const saved = saveGameUsecase(data);
  return saved;
};

module.exports = {
  handler,
};
