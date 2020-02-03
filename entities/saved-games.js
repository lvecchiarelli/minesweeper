'use strict';
const Board = require('./board');
const uuidv4 = require('uuid/v4');
class SavedGames {
    constructor(repository) {
        this.repository = repository;
        console.log('SavedGames - ENTITY - constructor()');
    }
    async fetchAll() {
        const items = await this.repository.fetchAll();
        console.log('SavedGames - ENTITY - fetchAll() - games: ' + JSON.stringify(items));
        this.games = items.map((item) => {
            return {
                id: item.id,
                lastUpdate: item.lastUpdate
            };
        });
        console.log('SavedGames - ENTITY - fetchAll() - result: ' + JSON.stringify(this.games));
    }
}
module.exports = SavedGames;