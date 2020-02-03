'use strict';
const Board = require('./board');
const Difficulty = require('./difficulty');
const uuidv4 = require('uuid/v4');
class Game {
    constructor(repository) {
        this.repository = repository;
        console.log('Game - ENTITY - constructor()');
    }
    newGame(difficulty) {
        //this.game = new Board(Difficulty.HARD);
        console.log('Game - ENTITY - newGame()');
        this.game = new Board(difficulty);
        this.game.difficulty = difficulty;
        return this;
    }
    async save() {
        if (!this.game.id || this.game.id === 0) {
            this.game.id = uuidv4();
        }
        this.game.lastUpdate = new Date().toISOString().replace(/T/, ' ') // replace T with a space
            .replace(/\..+/, ''); // delete the dot and everything after
        console.log('Game - ENTITY - save() - params: ' + JSON.stringify(this.game));
        await this.repository.save(this.game);
    }
    async load(id) {
        this.game = await this.repository.get(id);
    }
}
module.exports = Game;