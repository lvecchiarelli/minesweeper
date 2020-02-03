'use strict';

class InMemoryRepository {
  constructor(data) {
    this.data = data;
    if (data) {
      this.id = Math.max.apply(Math, data.map(function (item) { return item.id; }));
    } else {
      this.id = 0;
    }
  }

  async save(game) {
    game.id = ++this.id;
    if (!this.data) {
      this.data = [];
    }
    this.data.push(game);
    return game;
  }

  async get(id) {
    return this.data.find(item => item.id === id);
  }
}

module.exports = InMemoryRepository;
