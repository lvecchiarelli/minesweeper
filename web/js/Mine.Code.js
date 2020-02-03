const K_TRUE = 'true';
const K_FALSE = 'false';
const K_EASY = 'Easy';
const K_MEDIUM = 'Medium';
const K_HARD = 'Hard';
const BASE_URL = 'https://ccrqjfy7k4.execute-api.us-east-1.amazonaws.com/dev/minesweeper'
let currentGame;
let isGameOver = false;
//Smile face button
function ShowAllButton() {
    var oButtonContainer = document.createElement('div');
    var oButtonSelf = document.createElement('div');
    oButtonContainer.className = 'container_border';
    oButtonContainer.style.width = '65px';
    oButtonSelf.className = 'mine_up';
    oButtonSelf.style.width = '60px';
    oButtonSelf.style.height = '38x';
    oButtonSelf.innerText = 'Show all';
    with(oButtonSelf) {
        onmousedown = function() {
            ShowAllMines()
            oButtonSelf.className = 'mine_down';
        }
        onmouseup = function() {
            oButtonSelf.className = 'mine_up';
        }
        onmouseout = function() {
            oButtonSelf.className = 'mine_up';
        }
    }
    //oButtonSelf.appendChild(oText);
    oButtonContainer.appendChild(oButtonSelf);
    return oButtonContainer;
}
//Expand the main frame after game over
function ShowAllMines() {
    let i;
    let oMine, oBomb, oError;
    var accumulate = currentGame.size * currentGame.size;
    for (i = 0; i < accumulate; i++) {
        oMine = document.getElementById('mine_' + i);
        if (oMine.getAttribute('isRevealed') === K_FALSE) {
            if (oMine.getAttribute('isFlagged') === K_FALSE && oMine.getAttribute('isMine') === K_TRUE) {
                //else show a mine flag
                if (oMine.hasChildNodes()) {
                    oMine.removeChild(oMine.firstChild);
                }
                oMine.className = 'mine_down_bomb';
                oBomb = document.createElement('img');
                oBomb.style.width = '15px';
                oBomb.style.height = '15px';
                oBomb.style.padding = '0px';
                oBomb.style.margin = '0px';
                oBomb.src = 'images/bomb.gif';
                oMine.appendChild(oBomb);
                oMine.setAttribute('expanded', true);
            }
            //if flag is wrong, then show error flag
            if (oMine.getAttribute('isFlagged') === K_TRUE && oMine.getAttribute('isMine') === K_TRUE) {
                if (oMine.hasChildNodes()) {
                    oMine.removeChild(oMine.firstChild);
                }
                oMine.className = 'mine_down_bomb';
                oMine.innerText = '';
                oError = document.createElement('img');
                oError.style.width = '15px';
                oError.style.height = '15px';
                oError.style.padding = '0px';
                oError.style.margin = '0px';
                oError.src = 'images/error.gif';
                oMine.appendChild(oError);
                oMine.setAttribute('expanded', true);
            }
        }
    }
}
//Game over
function GameOver(result) {
    switch (result) {
        //success
        case 0:
            alert('Awesome! You\'ve won!!!');
            break;
        case 1:
            ShowAllMines();
            alert('You lose, please try again!');
            break;
    }
    isGameOver = true; //it's over
}
//Check whether the game finished
function CheckGameStatus() {
    let is_win = true;
    //Condition of success:
    //1. All blocks that not a mine is opened 
    //2. All mines have been tagged correctly
    for (let i = 0; i < currentGame.size * currentGame.size; i++) {
        const oMine = document.getElementById('mine_' + i);
        if (oMine.getAttribute('isMine') === K_TRUE) {
            if (oMine.getAttribute('isFlagged') === K_FALSE) {
                is_win = false;
                break;
            }
        } else {
            if (oMine.getAttribute('isRevealed') === K_FALSE) {
                is_win = false;
                break;
            }
        }
    }
    if (is_win) {
        GameOver(0);
    }
}
//Mine object
function MineButton(element, mine_index) {
    var oMine = document.createElement('div');
    var temp_value; //value under current block
    var oBomb, oFlag; //object of 'mine' and 'mine flag'
    var source; //click source
    var isRevealed, isFlagged;
    oMine.id = 'mine_' + mine_index;
    oMine.className = 'mine_up';
    oMine.style.width = '18px';
    oMine.style.height = '18px';
    oMine.setAttribute('mine_element', JSON.stringify(element));
    oMine.setAttribute('mine_index', mine_index);
    oMine.setAttribute('isMine', element.isMine);
    oMine.setAttribute('isFlagged', element.isFlagged);
    oMine.setAttribute('isRevealed', element.isRevealed);
    oMine.setAttribute('isQuestion', element.isQuestion);
    //left mouse button response to onmouseup event, right mouse button response to onmousedown event
    with(oMine) {
        //change the visual style
        onmousedown = function() {
            //if game already over then do nothing
            if (isGameOver) return;
            //left mouse button
            if (event.button === 0) {
                //don't response to 'expanded' and 'marked' case
                if (this.getAttribute('isFlagged') === K_TRUE || this.getAttribute('isRevealed') === K_TRUE) {
                    return;
                }
                this.setAttribute('isRevealed', true);
                this.className = 'mine_down';
                let mineElement = JSON.parse(this.getAttribute('mine_element'));
                if (!mineElement.isMine) {
                    if (mineElement.minesCount === 0) {
                        oMine.className = 'mine_down';
                    }
                    if (mineElement.minesCount >= 1 && mineElement.minesCount <= 8) {
                        oMine.className = 'mine_down_' + mineElement.minesCount;
                        oMine.innerText = mineElement.minesCount;
                    }
                }
                if (mineElement.isMine) {
                    this.className = 'mine_down_bomb_blast';
                    //check whether exploded
                    //avoid recreate
                    if (this.hasChildNodes()) {
                        this.removeChild(this.firstChild);
                    }
                    oBomb = document.createElement('img');
                    oBomb.style.width = '15px';
                    oBomb.style.height = '15px';
                    oBomb.style.padding = '0px';
                    oBomb.style.margin = '0px';
                    oBomb.src = 'images/bomb.gif';
                    this.appendChild(oBomb);
                    ShowAllMines();
                    GameOver(1);
                }
                CheckGameStatus();
            }
            //right mouse button
            if (event.button === 2) {
                //if game already over then do nothing
                if (isGameOver) return;
                //if button is opened, do nothing
                isRevealed = this.getAttribute('isRevealed');
                if (isRevealed === K_TRUE) {
                    return;
                }
                //check whether it is expanded
                isFlagged = this.getAttribute('isFlagged');
                isQuestion = this.getAttribute('isQuestion');
                if (this.firstChild) this.removeChild(this.firstChild);
                if (isFlagged === K_FALSE && isQuestion === K_FALSE) {
                    this.className = 'mine_up';
                    //mark as a mine
                    oFlag = document.createElement('img');
                    oFlag.style.width = '15px';
                    oFlag.style.height = '15px';
                    oFlag.style.padding = '0px';
                    oFlag.style.margin = '0px';
                    oFlag.src = 'images/flag.gif';
                    //avoid recreate
                    this.appendChild(oFlag);
                    this.setAttribute('isFlagged', true);
                    this.setAttribute('isQuestion', false);
                    //update remaining mine count
                    currentGame.minesLeft--;
                    oLeftBox.innerText = currentGame.minesLeft.toString();
                    CheckGameStatus();
                } else if (isFlagged === K_TRUE) {
                    //mark question
                    this.setAttribute('isFlagged', false);
                    this.setAttribute('isQuestion', true);
                    this.innerText = '?';
                    this.className = 'mine_up';
                    //update remaining mine count
                    currentGame.minesLeft++;
                    oLeftBox.innerText = currentGame.minesLeft.toString();
                } else {
                    //clear the mark
                    this.setAttribute('isFlagged', false);
                    this.setAttribute('isQuestion', false);
                    this.innerText = '';
                    this.className = 'mine_up';
                }
            }
        }
    }
    return oMine;
}

function difficulty_onchange() {
    console.log(event);
    if (event.target.value === K_EASY) {
        startMinesweeper(0);
    } else if (event.target.value === K_MEDIUM) {
        startMinesweeper(1);
    } else if (event.target.value === K_HARD) {
        startMinesweeper(2);
    }
}

function FunctionBar(mine_num) {
    var oFunctionBar = document.createElement('div');
    oFunctionBar.className = 'function_bar_div';
    var oFunctionPanel = document.createElement('div');
    oFunctionPanel.className = 'panel_down_div';
    oLeftBox = document.createElement('div');
    oLeftBox.className = 'function_left_div';
    oLeftBox.innerText = mine_num;
    oRightBox = document.createElement('select');
    oRightBox.options[0] = new Option(K_EASY);
    oRightBox.options[1] = new Option(K_MEDIUM);
    oRightBox.options[2] = new Option(K_HARD);
    oRightBox.className = 'function_right_div';
    if (currentGame.difficulty === '0') {
        oRightBox.value = K_EASY;
    } else if (currentGame.difficulty === '1') {
        oRightBox.value = K_MEDIUM;
    } else if (currentGame.difficulty === '2') {
        oRightBox.value = K_HARD;
    }
    oRightBox.onchange = difficulty_onchange;
    var oMidBox = document.createElement('div');
    oMidBox.className = 'function_mid_div';
    //var oShowAllButton = new ShowAllButton();
    //oMidBox.appendChild(oShowAllButton);
    oFunctionPanel.appendChild(oMidBox);
    oFunctionPanel.appendChild(oLeftBox);
    oFunctionPanel.appendChild(oRightBox);
    oFunctionBar.appendChild(oFunctionPanel);
    return oFunctionBar;
}

function MineArea(game) {
    let index;
    let oMineButton;
    let oMinePanel = document.createElement('div');
    oMinePanel.className = 'panel_down_nopadding_div';
    let oMineTable = document.createElement('table');
    oMineTable.className = 'mine_area_table';
    let oMineTableBody = document.createElement('tbody');
    index = 0;
    let tableRow = null;
    game.board.forEach(element => {
        const row = Math.floor(index / game.size);
        const col = Math.floor(index % game.size);
        if (col === 0) {
            tableRow = oMineTableBody.insertRow(-1);
        }
        let cell = tableRow.insertCell(-1);
        oMineButton = new MineButton(element, index);
        updateCellState(oMineButton);
        cell.appendChild(oMineButton);
        index++;
    });
    oMineTable.appendChild(oMineTableBody);
    oMinePanel.appendChild(oMineTable);
    return oMinePanel;
}
//main frame object
function MainFrame(game) {
    //each mine 18px + panel'border 3px + main_container's border 6px;
    var all_width = 24 * game.size + 6;
    var oMainContainer = document.createElement('div');
    oMainContainer.className = 'main_container';
    oMainContainer.style.width = all_width + 'px';
    var oFunctionBar = new FunctionBar(game.minesLeft);
    oMainContainer.appendChild(oFunctionBar);
    var oMineArea = new MineArea(game);
    oMainContainer.appendChild(oMineArea);
    return oMainContainer;
}

function AvoidContextMenu() {
    event.cancelBubble = true
    event.returnValue = false;
    return;
}

function AvoidRightClick(e) {
    if (window.Event) {
        if (e.which == 2 || e.which == 3) return;
    } else
    if (event.button == 2 || event.button == 3) {
        event.cancelBubble = true
        event.returnValue = false;
        return;
    }
}

function DisableContextMenu() {
    if (window.Event) document.captureEvents(Event.MOUSEUP);
    document.oncontextmenu = AvoidContextMenu; // for IE5+
    document.onmousedown = AvoidRightClick; // for all others
}

function drawBoard(data) {
    //remove previous existing board
    var e = document.getElementById('playground');
    var child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
    //disable the context event
    DisableContextMenu();
    currentGame = data;
    updateMinesLeft();
    oMainFrame = new MainFrame(data);
    document.getElementById('playground').appendChild(oMainFrame);
}

function updateMinesLeft() {
    currentGame.minesLeft = currentGame.mines - currentGame.board.filter(function(item) {
        return item.isFlagged;
    }).length;
}

function startMinesweeper(difficulty) {
    const url = BASE_URL + '/newgame/' + difficulty;
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            drawBoard(data);
        },
        error: function(request, error) {
            alert('Request: ' + JSON.stringify(request) + '\nError: ' + JSON.stringify(error));
        }
    });
}

function saveGame() {
    const url = BASE_URL;
    let data = {
        'id': currentGame.id,
        'size': currentGame.size,
        'mines': currentGame.mines,
        'board': new Array(currentGame.size * currentGame.size)
    };
    for (let row = 0; row < currentGame.size; row++) {
        for (let col = 0; col < currentGame.size; col++) {
            const element = (row * currentGame.size) + col;
            oMine = document.getElementById('mine_' + element);
            const mineElement = JSON.parse(oMine.getAttribute('mine_element'));
            const cell = {
                'isMine': oMine.getAttribute('isMine') === K_TRUE,
                'isFlagged': oMine.getAttribute('isFlagged') === K_TRUE,
                'isRevealed': oMine.getAttribute('isRevealed') === K_TRUE,
                'isQuestion': oMine.getAttribute('isQuestion') === K_TRUE,
                'minesCount': mineElement.minesCount,
            }
            data.board[element] = cell;
        }
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        success: function(saved) {
            currentGame = saved;
            updateMinesLeft();
            loadSavedGames();
            alert('Game saved');
        },
        error: function(request, error) {
            alert('Request: ' + JSON.stringify(request) + '\nError: ' + JSON.stringify(error));
        }
    });
}

function loadSavedGames() {
    const url = BASE_URL;
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            updateSavedGamesList(data);
        },
        error: function(request, error) {
            alert('Request: ' + JSON.stringify(request) + '\nError: ' + JSON.stringify(error));
        }
    });
}

function updateSavedGamesList(data) {
    //remove previous existing board
    var savedGames = document.getElementById('savedGames');
    var child = savedGames.lastElementChild;
    while (child) {
        savedGames.removeChild(child);
        child = savedGames.lastElementChild;
    }
    const sortedData = data.sort(function(a, b) {
        if (a.lastUpdate > b.lastUpdate) return -1;
        if (a.lastUpdate < b.lastUpdate) return 1;
        return 0;
    });
    sortedData.forEach(element => {
        p = document.createElement('p');
        a = document.createElement('a');
        a.href = '#';
        a.ID = element.id;
        a.innerHTML = 'ID: ' + element.id + ', Last update: ' + element.lastUpdate;
        a.addEventListener("click", loadGame, false);
        // Append the link to the div
        p.appendChild(a);
        savedGames.appendChild(p);
    });
}

function loadGame(event) {
    const url = BASE_URL + '/' + event.target.ID;
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            drawBoard(data);
        },
        error: function(request, error) {
            alert('Request: ' + JSON.stringify(request) + '\nError: ' + JSON.stringify(error));
        }
    });
}

function updateCellState(cell) {
    const mineElement = JSON.parse(cell.getAttribute('mine_element'));
    const isRevealed = cell.getAttribute('isRevealed');
    const isFlagged = cell.getAttribute('isFlagged');
    const isQuestion = cell.getAttribute('isQuestion');
    if (isRevealed === K_TRUE) {
        if (!mineElement.isMine) {
            if (mineElement.minesCount === 0) {
                cell.className = 'mine_down';
            }
            if (mineElement.minesCount >= 1 && mineElement.minesCount <= 8) {
                cell.className = 'mine_down_' + mineElement.minesCount;
                cell.innerText = mineElement.minesCount;
            }
        }
        if (mineElement.isMine) {
            cell.className = 'mine_down_bomb_blast';
            //avoid recreate
            if (cell.hasChildNodes()) {
                cell.removeChild(cell.firstChild);
            }
            oBomb = document.createElement('img');
            oBomb.style.width = '15px';
            oBomb.style.height = '15px';
            oBomb.style.padding = '0px';
            oBomb.style.margin = '0px';
            oBomb.src = 'images/bomb.gif';
            cell.appendChild(oBomb);
        }
    } else {
        //check whether it is expanded
        if (cell.firstChild) cell.removeChild(cell.firstChild);
        if (isFlagged === K_TRUE) {
            cell.className = 'mine_up';
            //avoid recreate
            if (cell.hasChildNodes()) {
                cell.removeChild(cell.firstChild);
            }
            oFlag = document.createElement('img');
            oFlag.style.width = '15px';
            oFlag.style.height = '15px';
            oFlag.style.padding = '0px';
            oFlag.style.margin = '0px';
            oFlag.src = 'images/flag.gif';
            //avoid recreate
            cell.appendChild(oFlag);
        }
        if (isQuestion === K_TRUE) {
            //mark question
            cell.setAttribute('isFlagged', false);
            cell.setAttribute('isQuestion', true);
            cell.innerText = '?';
            cell.className = 'mine_up';
        }
    }
}