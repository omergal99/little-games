'use strict';
console.log('main js on');

/*
main js
*/

var gBoard;
var gLevel = {
    SIZE: 6,
    MINES: 5
};
var hints = 3;
var inHint = false;
var gGame;
var EMPTY = '';
var MINE = '💥';
var FLAG = '📌';
var stopWatch;
var gStart;
var timeIsPoints;
var firstClick = true;
var best4 = 0;
var best6 = 0;
var best8 = 0;
var time4 = 0;
var time6 = 0;
var time8 = 0;
var isFlagBtnOn = false;
// CR - ADD CSS CLASSES instead of js
var CLICK_COLOR_ODD = 'rgb(159, 227, 229)';
var CLICK_COLOR_EVEN = 'rgb(138, 205, 207)';
var EMPTY_COLOR_ODD = '#ffe7b4';
var EMPTY_COLOR_EVEN = '#e6ce9a';
console.log('Global variabels on');

function initGame() {
    gGame = {
        uniqTouch: 0,
        shownCount: 0,
        markedCount: gLevel.MINES,
        hintRunTime: false
    }
    console.log('InitGame on');
    gBoard = buildBoard();
    renderBoard(gBoard, '.gameBoard');
    stopWatch = clearInterval(stopWatch);
    var elStopWatch = document.querySelector('.stopWatch');
    elStopWatch.innerHTML = '00:00';
    var elScore = document.querySelector('.score');
    elScore.innerHTML = gGame.shownCount;
    var elFlags = document.querySelector('.flags');
    elFlags.innerHTML = gGame.markedCount;
    var elSmile = document.querySelector('.smile');
    elSmile.innerHTML = '😄😊😄';
    hints = 3;
    var elHints = document.querySelector('.hints');
    elHints.innerHTML = '⚡' + hints + '⚡';
    var elWinner = document.querySelector('.winner');
    elWinner.classList.add('hide');
    var elLoser = document.querySelector('.loser');
    elLoser.classList.add('hide');
    var elBtnFlag = document.querySelector('.flagButton');
    elBtnFlag.innerHTML = '<img width="28" src="img/officeGray.png">';
    elBtnFlag.style.display = 'inline-block';
    elBtnFlag.style.backgroundColor = '#c2ae90';
    isFlagBtnOn = false;
    inHint = false;
    firstClick = true;
    localStorageOnLoad();
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                isHint: false
            };
        }
    }
    return board;
}

function putRandomMines(board, mines, idxI, idxJ) {
    var countCells = board.length * board[0].length;
    // CR - how mines can be bigger than countCells?
    // CR - you can get mines number from level object
    mines = (mines > countCells) ? countCells : mines;
    for (var i = 0; i < mines; i++) {
        var randI = Math.floor(Math.random() * board.length);
        var randJ = Math.floor(Math.random() * board[0].length);
        while (board[randI][randJ].isMine ||
            ((idxI === randI) && (idxJ === randJ))) {
            randI = Math.floor(Math.random() * board.length);
            randJ = Math.floor(Math.random() * board[0].length);
        }
        board[randI][randJ].isMine = true;
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = negsCount(board, i, j);
        }
    }
}

function negsCount(board, rowIdx, colIdx) {
    var countMines = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (!(i === rowIdx && j === colIdx) &&
                (i >= 0 && j >= 0 && i < board.length && j < board[0].length)) {
                if (board[i][j].isMine === true) {
                    countMines++;
                }
            }
        }
    }
    return countMines;
}

function renderBoard(board, selector) {
    var strHTML = '<tbody class="bodyBoard">';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cellContant = suitableContact(board[i][j], i, j);
            var addStyle = backColor(cellContant, (i + j) % 2 === 0);
            var addClass = (gGame.uniqTouch === -1) ? '' : 'class="tdHover"';

            strHTML += '<td ' + addStyle +
                addClass +
                'onmousedown="smileChange()"' +
                ' onmouseup="findClicked(event,this,' + i + ',' + j + ')">' +
                cellContant +
                '</td>';
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody>';
    var elTable = document.querySelector(selector);
    elTable.innerHTML = strHTML;
}

function suitableContact(cell, i, j) {
    if (cell.isShown === false) {
        if (cell.isMarked === true) {
            return FLAG;
        }
        return EMPTY;
    } else {
        if (cell.isMine === true) {
            return MINE;
        } else {
            return colorDigit(cell.minesAroundCount, i, j);
        }
    }
}

function colorDigit(number, i, j) {
    if ((i + j) % 2 === 0) {
        var bacColor = 'style="background-color: ' + CLICK_COLOR_ODD + '";';
    } else {
        var bacColor = 'style="background-color: ' + CLICK_COLOR_EVEN + '";';
    }
    switch (number) {
        case 0:
            return '<span style="background-color:' + bacColor + ';";></span>';
        case 1:
            return '<span style="color: rgb(24, 118, 210);  font-size: 22px;">' + number + '</span>';
        case 2:
            return '<span style="color: rgb(56, 142, 60); font-size: 23px;">' + number + '</span>';
        case 3:
            return '<span style="color: rgb(232, 116, 8); font-size: 24px;">' + number + '</span>';
        case 4:
            return '<span style="color: rgb(123, 31, 162); font-size: 25px;">' + number + '</span>';
        default:
            return '<span style="color: rgb(211, 47, 47); font-size: 26px;">' + number + '</span>';
    }
}

function backColor(cellContant, num) {
    if (cellContant !== FLAG && cellContant !== EMPTY) {
        if (num) {
            return 'style="background-color: ' + CLICK_COLOR_ODD + '";';
        } else {
            return 'style="background-color: ' + CLICK_COLOR_EVEN + '";';
        }
    } else {
        if (num) {
            return 'style="background-color: ' + EMPTY_COLOR_ODD + '";';
        } else {
            return 'style="background-color: ' + EMPTY_COLOR_EVEN + '";';
        }
    }
}

function findClicked(event, elCell, i, j) {
    var eventNum = event.which;
    if (isFlagBtnOn === true && eventNum === 1) {
        eventNum = 3;
    }
    if (gGame.uniqTouch >= 0 || firstClick === true) {
        var elSmile = document.querySelector('.smile');
        elSmile.innerHTML = '😄😊😄';
        if (eventNum === 1) {
            cellClicked(elCell, i, j);
        }
        if (eventNum === 3) {
            cellMarked(elCell);
            // CR = you can change the cell.isMarked inside cellMarked()
            if (gBoard[i][j].isMarked === false) {
                gBoard[i][j].isMarked = true;
            } else {
                gBoard[i][j].isMarked = false;
            }
        }
    }
}

function cellClicked(elCell, i, j) {
    // CR - if cell is shown or marked - return first
    if (firstClick === true) {
        putRandomMines(gBoard, gLevel.MINES, i, j);
        setMinesNegsCount(gBoard);
        firstClick = false;
    }
    if (inHint === true) {
        inHint = false;
        gGame.hintRunTime = true;
        showForSec(i, j);
    } else if (gGame.hintRunTime === false) {
        var elStopWatch = document.querySelector('.stopWatch');
        var elScore = document.querySelector('.score');
        if (gBoard[i][j].isMarked === false) {

            if (gBoard[i][j].isShown === false) {
                gGame.uniqTouch++;
                gGame.shownCount += 100;
                gBoard[i][j].isShown = true;
            }

            if (gGame.uniqTouch === 1) {
                // CR - you can start gStart from the first Click - firstClick === true
                gStart = Date.now();
                stopWatch = setInterval(function() {
                    calcStopWatch(elStopWatch, Date.now() - gStart)
                }, 1000)
            }

            if (gBoard[i][j].isMine === true) {
                gGame.uniqTouch = -1;
                gameOver();
            }

            if (gGame.uniqTouch === gLevel.SIZE ** 2 - gLevel.MINES) {
                gGame.uniqTouch = -1;
                gameWin();
            }

            if (gBoard[i][j].isMine === false) {
                if (gGame.uniqTouch !== -1) {
                    timeIsPoints = Math.floor((Date.now() - gStart) / 100);
                    if (gBoard[i][j].minesAroundCount === 0) {
                        expandShown(gBoard, elCell, i, j);
                    }
                }
                elScore.innerHTML = gGame.shownCount - timeIsPoints;
            }
        }
        renderBoard(gBoard, '.gameBoard');
    }
}

function expandShown(board, elCell, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (!(i === rowIdx && j === colIdx) &&
                (i >= 0 && j >= 0 && i < board.length && j < board[0].length)) {
                if (board[i][j].isShown === false) {
                    cellClicked(elCell, i, j);
                }
            }
        }
    }
}

function cellMarked(elCell) {
    if (gGame.hintRunTime === false) {
        if (elCell.innerHTML === FLAG) {
            elCell.innerHTML = EMPTY;
            gGame.markedCount++;
        } else if (elCell.innerHTML === EMPTY) {
            elCell.innerHTML = FLAG;
            gGame.markedCount--;
        }
        var elFlags = document.querySelector('.flags');
        elFlags.innerHTML = gGame.markedCount;
    }
}

function selectLevel(elSelected, level, mines) {
    var elLevels = document.querySelectorAll('.levels tr .level');
    for (var i = 0; i < elLevels.length; i++) {
        elLevels[i].style.color = 'rgb(36, 32, 32)';
        elLevels[i].style.backgroundColor = '#31bdc2';
        elLevels[i].style.border = '1.5px solid rgb(43, 83, 116)';
    }
    elSelected.style.color = 'rgb(211, 206, 206)';
    elSelected.style.backgroundColor = '#175255';
    elSelected.style.border = '1.5px solid #439497';

    gLevel.SIZE = level;
    gLevel.MINES = mines;
    initGame();
}

function hintActive(elHints) {
    if (hints > 0 && gGame.uniqTouch >= 0 && inHint === false) {
        hints--;
        elHints.innerHTML = '⚡' + hints + '⚡';
        inHint = true;
    }
}

function showForSec(rowIdx, colIdx) {
    var matrix = [];
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        matrix[i] = [];
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i >= 0 && j >= 0 && i < gLevel.SIZE && j < gLevel.SIZE) {
                matrix[i][j] = (gBoard[i][j].isShown);
                gBoard[i][j].isShown = true;
            }
        }
    }
    renderBoard(gBoard, '.gameBoard');
    setTimeout(function() {
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (i >= 0 && j >= 0 && i < gLevel.SIZE && j < gLevel.SIZE) {
                    gBoard[i][j].isShown = matrix[i][j];
                }
            }
        }
        renderBoard(gBoard, '.gameBoard');
        gGame.hintRunTime = false;
    }, 450);
}

function gameWin() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine === true) {
                gBoard[i][j].isShown = false;
                gBoard[i][j].isMarked = true;
            }
        }
    }
    stopWatch = clearInterval(stopWatch);
    var elSmile = document.querySelector('.smile');
    elSmile.innerHTML = '🤩😎🤩';
    var elWinner = document.querySelector('.winner');
    elWinner.classList.remove('hide');
    var time = document.querySelector('.stopWatch').innerHTML;
    var newScore = gGame.shownCount - timeIsPoints;
    localStorgeBest(newScore, time);
    var elflagBtn = document.querySelector('.flagButton');
    elflagBtn.style.display = 'none';
}

function gameOver() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine === true) {
                gBoard[i][j].isShown = true;
            }
        }
    }
    stopWatch = clearInterval(stopWatch);
    var elSmile = document.querySelector('.smile');
    elSmile.innerHTML = '😵😑😵';
    var elLoser = document.querySelector('.loser');
    elLoser.classList.remove('hide');
    var elflagBtn = document.querySelector('.flagButton');
    elflagBtn.style.display = 'none';
}

function MarkOnOff(elBtnFlag) {
    if (isFlagBtnOn) {
        elBtnFlag.innerHTML = '<img width="28" src="img/officeGray.png">';
        elBtnFlag.style.backgroundColor = '#c2ae90';
    } else {
        elBtnFlag.innerHTML = '<img width="28" src="img/officeColor.png">';
        elBtnFlag.style.backgroundColor = '#fcbb5a';
    }
    isFlagBtnOn = !isFlagBtnOn;
}

function smileChange() {
    var elSmile = document.querySelector('.smile');
    elSmile.innerHTML = '😄😮😄';
}

function localStorgeBest(newScore, time) {
    if (gLevel.SIZE === 4) {
        if (best4 === 0 || best4 === "let's play!") {
            localStorage.setItem("bestScore-4", newScore);
            localStorage.setItem("time4", time);
            best4 = localStorage.getItem("bestScore-4");
            time4 = localStorage.getItem("time4");
        } else {
            if (best4 < newScore) {
                localStorage.setItem("bestScore-4", newScore);
                localStorage.setItem("time4", time);
                best4 = localStorage.getItem("bestScore-4");
                time4 = localStorage.getItem("time4");
            }
        }
        var elBest4 = document.querySelector('.best4');
        elBest4.classList.remove('hide');
        elBest4.innerHTML = "4🤞4 Best Score: " + best4 +
            ', Time: ' + time4;
    }
    if (gLevel.SIZE === 6) {
        if (best6 === 0 || best6 === "let's play!") {
            localStorage.setItem("bestScore-6", newScore);
            localStorage.setItem("time6", time);
            best6 = localStorage.getItem("bestScore-6");
            time6 = localStorage.getItem("time6");
        } else {
            if (best6 < newScore) {
                localStorage.setItem("bestScore-6", newScore);
                localStorage.setItem("time6", time);
                best6 = localStorage.getItem("bestScore-6");
                time6 = localStorage.getItem("time6");
            }
        }
        var elBest6 = document.querySelector('.best6');
        elBest6.classList.remove('hide');
        elBest6.innerHTML = "6🤞6 Best Score: " + best6 +
            ', Time: ' + time6;
    }
    if (gLevel.SIZE === 8) {
        if (best8 === 0 || best8 === "let's play!") {
            localStorage.setItem("bestScore-8", newScore);
            localStorage.setItem("time8", time);
            best8 = localStorage.getItem("bestScore-8");
            time8 = localStorage.getItem("time8");
        } else {
            if (best6 < newScore) {
                localStorage.setItem("bestScore-8", newScore);
                localStorage.setItem("time8", time);
                best8 = localStorage.getItem("bestScore-8");
                time8 = localStorage.getItem("time8");
            }
        }
        var elBest8 = document.querySelector('.best8');
        elBest8.classList.remove('hide');
        elBest8.innerHTML = "8🤞8 Best Score: " + best8 +
            ', Time: ' + time8;
    }
}

function localStorageOnLoad() {
    var elBest4 = document.querySelector('.best4');
    elBest4.classList.add('hide');
    if (gLevel.SIZE === 4) {
        if (localStorage.getItem("bestScore-4") === null) {
            localStorage.setItem("bestScore-4", "let's play!");
            localStorage.setItem("time4", "00:00");
        } else {
            best4 = localStorage.getItem("bestScore-4");
            time4 = localStorage.getItem("time4");
        }
    }
    var elBest6 = document.querySelector('.best6');
    elBest6.classList.add('hide');
    if (gLevel.SIZE === 6) {
        if (localStorage.getItem("bestScore-6") === null) {
            localStorage.setItem("bestScore-6", "let's play!");
            localStorage.setItem("time6", "00:00");
        } else {
            best6 = localStorage.getItem("bestScore-6");
            time6 = localStorage.getItem("time6");
        }
    }
    var elBest8 = document.querySelector('.best8');
    elBest8.classList.add('hide');
    if (gLevel.SIZE === 8) {
        if (localStorage.getItem("bestScore-8") === null) {
            localStorage.setItem("bestScore-8", "let's play!");
            localStorage.setItem("time8", "00:00");
        } else {
            best8 = localStorage.getItem("bestScore-8");
            time8 = localStorage.getItem("time8");
        }
    }
}