'use strict';

const Cell = require('./cell');
const Difficulty = require('./difficulty');

class Board {
    constructor(difficulty) {
        console.log('Board - Entity, constructor(), params: [difficulty: ' + difficulty + ']');
        this.id = 0;
        switch (difficulty) {
            case Difficulty.EASY:
                this.size = 9;
                this.mines = 10;
                break;
            case Difficulty.MEDIUM:
                this.size = 16;
                this.mines = 40;
                break;
            case Difficulty.HARD:
                this.size = 22;
                this.mines = 100;
                break;
        }
        this.createBoard(this.size, this.mines);
    }

    createBoard(size, mines) {
        console.log('Board - Entity, createBoard(), params: [size: ' + size + ', mines: ' + mines + ']');
        this.board = new Array(size * size);
        let minesLeft = mines;
        const max = (size * size) - 1;
        const min = 0;
        while (minesLeft) {
            const rnd = Math.floor(Math.random() * (max - min)) + min;
            if (!this.board[rnd]) {
                this.board[rnd] = new Cell(true);
                minesLeft--;
            }
        }
        for (let i = 0; i < this.board.length; i++) {
            if (!this.board[i]) {
                this.board[i] = new Cell(false);
            }
        }

        this.updateminesCount(size);
    }

    updateminesCount(size) {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const index = (row * size) + col;
                this.board[index].minesCount = 0;
                if (this.board[(row - 1)  * size + (col - 1)] && this.board[(row - 1)  * size + (col - 1)].isMine && row > 0 && col > 0) { 
                    this.board[index].minesCount++; }
                if (this.board[(row - 1)  * size + (col + 0)] && this.board[(row - 1)  * size + (col + 0)].isMine && row > 0) { 
                    this.board[index].minesCount++; }
                if (this.board[(row - 1)  * size + (col + 1)] && this.board[(row - 1)  * size + (col + 1)].isMine && row > 0 && col < size -1 ) { 
                    this.board[index].minesCount++; }
                if (this.board[(row + 0)  * size + (col - 1)] && this.board[(row + 0)  * size + (col - 1)].isMine && col > 0) { 
                    this.board[index].minesCount++; }
                if (this.board[(row + 0)  * size + (col + 1)] && this.board[(row + 0)  * size + (col + 1)].isMine && col < size -1) { 
                    this.board[index].minesCount++; }
                if (this.board[(row + 1)  * size + (col - 1)] && this.board[(row + 1)  * size + (col - 1)].isMine && row < size - 1 && col > 0) { 
                    this.board[index].minesCount++; }
                if (this.board[(row + 1)  * size + (col + 0)] && this.board[(row + 1)  * size + (col + 0)].isMine && row < size - 1) { 
                    this.board[index].minesCount++; }
                if (this.board[(row + 1)  * size + (col + 1)] && this.board[(row + 1)  * size + (col + 1)].isMine && row < size - 1 && col < size - 1) { 
                    this.board[index].minesCount++; }
            }
        }
    }
}

module.exports = Board;
