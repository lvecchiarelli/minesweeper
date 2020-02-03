'use strict';
class Cell {
    constructor(isMine) {
        this.isMine = isMine;
        this.isFlagged = false;
        this.isRevealed = false;
        this.isQuestion = false;
        this.minesCount = 0;
    }
    toggleFlagged() {
        this.isFlagged = !this.isFlagged;
    }
    setRevealed() {
        this.isRevealed = true;
    }
}
module.exports = Cell;