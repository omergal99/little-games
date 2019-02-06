'use strict'
console.log('Chess');

/*
Start with the given chess project, add the following features:
• Implement the function: markCellsForRook
• Implement the function: markCellsForBishop
• Implement the function: markCellsForKing
• Implement the function: markCellsForQueen
• BONUS: Implement the function: markCellsForKnight
*/

// ***************
// function eat? V
// function whose turn? 
// pawn reach end line? 
// when shah- defend the king 
// when chess - winner 
// ***************

// Pieces Types
var KING_WHITE = '♔';
var QUEEN_WHITE = '♕';
var ROOK_WHITE = '♖';
var BISHOP_WHITE = '♗';
var KNIGHT_WHITE = '♘';
var PAWN_WHITE = '♙';
var KING_BLACK = '♚';
var QUEEN_BLACK = '♛';
var ROOK_BLACK = '♜';
var BISHOP_BLACK = '♝';
var KNIGHT_BLACK = '♞';
var PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            var piece = ''
            if (i === 1) piece = PAWN_BLACK;
            if (i === 6) piece = PAWN_WHITE;
            board[i][j] = piece;
        }
    }

    board[0][0] = board[0][7] = ROOK_BLACK;
    board[0][1] = board[0][6] = KNIGHT_BLACK;
    board[0][2] = board[0][5] = BISHOP_BLACK;
    board[0][3] = QUEEN_BLACK;
    board[0][4] = KING_BLACK;

    board[7][0] = board[7][7] = ROOK_WHITE;
    board[7][1] = board[7][6] = KNIGHT_WHITE;
    board[7][2] = board[7][5] = BISHOP_WHITE;
    board[7][3] = QUEEN_WHITE;
    board[7][4] = KING_WHITE;

    // board[5][3] = BISHOP_BLACK;

    // TODO: build the board 8 * 8
    console.table(board);
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // TODO: figure class name
            var className = ((i + j) % 2 === 0) ? 'white' : 'black';
            var tdId = `cell-${i}-${j}`;

            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this)">
                            ${cell}
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {
    // TODO: if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        console.log('AHA');
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        return;
    }
    cleanBoard();

    if (gSelectedElCell === elCell) {
        gSelectedElCell = null;
    } else {

        elCell.classList.add('selected');
        gSelectedElCell = elCell;

        // console.log('elCell.id: ', elCell.id);
        var cellCoord = getCellCoord(elCell.id);
        var piece = gBoard[cellCoord.i][cellCoord.j];

        var possibleCoords = [];
        switch (piece) {
            case ROOK_BLACK:
            case ROOK_WHITE:
                possibleCoords = getAllPossibleCoordsRook(cellCoord);
                break;
            case BISHOP_BLACK:
            case BISHOP_WHITE:
                possibleCoords = getAllPossibleCoordsBishop(cellCoord);
                break;
            case KNIGHT_BLACK:
            case KNIGHT_WHITE:
                possibleCoords = getAllPossibleCoordsKnight(cellCoord);
                break;
            case PAWN_BLACK:
            case PAWN_WHITE:
                possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
                break;
            case KING_BLACK:
            case KING_WHITE:
                possibleCoords = getAllPossibleCoordsKing(cellCoord);
                break;
            case QUEEN_BLACK:
            case QUEEN_WHITE:
                possibleCoords = getAllPossibleCoordsQueen(cellCoord);
                break;
        }
        markCells(possibleCoords);
    }

}

function movePiece(elFromCell, elToCell) {

    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);

    // update the MODEl
    var piece = gBoard[fromCoord.i][fromCoord.j];
    gBoard[fromCoord.i][fromCoord.j] = '';
    gBoard[toCoord.i][toCoord.j] = piece;
    // update the DOM
    elFromCell.innerText = '';
    elToCell.innerText = piece;

}

function markCells(coords) {

    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
        elCell.classList.add('mark')
    }

    // TODO: query select them one by one and add mark 
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}

function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];

    var diff = (isWhite) ? -1 : 1;
    var nextCoord = {
        i: pieceCoord.i + diff,
        j: pieceCoord.j
    };

    if (pieceCoord.j + 1 <= 7) {
        var edibleRight = {
            i: pieceCoord.i + diff,
            j: pieceCoord.j + 1
        }
        if (gBoard[edibleRight.i][edibleRight.j] !== '' &&
            isWhite !== isColorWhite(gBoard[edibleRight.i][edibleRight.j])) {
            res.push(edibleRight);
        }
    }
    if (pieceCoord.j - 1 >= 0) {
        var edibleLeft = {
            i: pieceCoord.i + diff,
            j: pieceCoord.j - 1
        }
        if (gBoard[edibleLeft.i][edibleLeft.j] !== '' &&
            isWhite !== isColorWhite(gBoard[edibleLeft.i][edibleLeft.j])) {
            res.push(edibleLeft);
        }
    }

    if (isEmptyCell(nextCoord)) {
        res.push(nextCoord);
    } else {
        return res;
    }

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
        diff *= 2;
        nextCoord = {
            i: pieceCoord.i + diff,
            j: pieceCoord.j
        };
        if (isEmptyCell(nextCoord)) res.push(nextCoord);
    }

    return res;
}

function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];

    var j = pieceCoord.j; // >> |up
    for (var idx = pieceCoord.i - 1; idx >= 0; idx--) {
        var coord = {
            i: idx,
            j: j
        };
        if (!isEmptyCell(coord)) {
            if (isColorWhite(gBoard[coord.i][coord.j]) !==
                isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                res.push(coord);
            }
            break;
        } else {
            res.push(coord);
        }
    }

    // >> |down
    for (var idx = pieceCoord.i + 1; idx < 8; idx++) {
        var coord = {
            i: idx,
            j: j
        };
        if (!isEmptyCell(coord)) {
            if (isColorWhite(gBoard[coord.i][coord.j]) !==
                isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                res.push(coord);
            }
            break;
        } else {
            res.push(coord);
        }
    }
    var i = pieceCoord.i; // >> -left
    for (var idx = pieceCoord.j - 1; idx >= 0; idx--) {
        var coord = {
            i: i,
            j: idx
        };
        if (!isEmptyCell(coord)) {
            if (isColorWhite(gBoard[coord.i][coord.j]) !==
                isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                res.push(coord);
            }
            break;
        } else {
            res.push(coord);
        }
    }
    // >> -right
    for (var idx = pieceCoord.j + 1; idx < 8; idx++) {
        var coord = {
            i: i,
            j: idx
        };
        if (!isEmptyCell(coord)) {
            if (isColorWhite(gBoard[coord.i][coord.j]) !==
                isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                res.push(coord);
            }
            break;
        } else {
            res.push(coord);
        }
    }

    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];

    var i = pieceCoord.i - 1; // >> /up
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        var coord = {
            i: i--,
            j: idx
        };
        if (!isEmptyCell(coord)) {
            if (isColorWhite(gBoard[coord.i][coord.j]) !==
                isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                res.push(coord);
            }
            break;
        } else {
            res.push(coord);
        }
    }
    i = pieceCoord.i - 1; // >> \up
    for (var idx = pieceCoord.j - 1; i >= 0 && idx >= 0; idx--) {
        var coord = {
            i: i--,
            j: idx
        };
        if (!isEmptyCell(coord)) {
            if (isColorWhite(gBoard[coord.i][coord.j]) !==
                isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                res.push(coord);
            }
            break;
        } else {
            res.push(coord);
        }
    }
    i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j - 1; i < 8 && idx >= 0; idx--) {
        var coord = {
            i: i++,
            j: idx
        };
        if (!isEmptyCell(coord)) {
            if (isColorWhite(gBoard[coord.i][coord.j]) !==
                isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                res.push(coord);
            }
            break;
        } else {
            res.push(coord);
        }
    }

    i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j + 1; i < 8 && idx < 8; idx++) {
        var coord = {
            i: i++,
            j: idx
        };
        if (!isEmptyCell(coord)) {
            if (isColorWhite(gBoard[coord.i][coord.j]) !==
                isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                res.push(coord);
            }
            break;
        } else {
            res.push(coord);
        }
    }

    return res;
}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];

    for (var i = pieceCoord.i - 2; i <= pieceCoord.i + 2; i++) {
        for (var j = pieceCoord.j - 2; j <= pieceCoord.j + 2; j++) {
            var i2 = (i - pieceCoord.i) ** 2;
            var j2 = (j - pieceCoord.j) ** 2;
            if ((i2 + j2) === 5 && i >= 0 && j >= 0 && i < 8 && j < 8) {
                var coord = {
                    i: i,
                    j: j
                };
                if (!isEmptyCell(coord)) {
                    if (isColorWhite(gBoard[coord.i][coord.j]) !==
                        isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                        res.push(coord);
                    }
                } else {
                    res.push(coord);
                }
            }
        }
    }
    return res;
}

function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];

    for (var i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
        for (var j = pieceCoord.j - 1; j <= pieceCoord.j + 1; j++) {
            if ((i !== pieceCoord.i || j !== pieceCoord.j) &&
                (i >= 0 && j >= 0 && i < 8 && j < 8)) {
                var coord = {
                    i: i,
                    j: j
                };
                if (!isEmptyCell(coord)) {
                    if (isColorWhite(gBoard[coord.i][coord.j]) !==
                        isColorWhite(gBoard[pieceCoord.i][pieceCoord.j])) {
                        res.push(coord);
                    }
                } else {
                    res.push(coord);
                }
            }
        }
    }

    return res;
}

function getAllPossibleCoordsQueen(pieceCoord) {

    var resBishop = getAllPossibleCoordsBishop(pieceCoord);
    var resRook = getAllPossibleCoordsRook(pieceCoord);
    var res = resBishop.concat(resRook);

    return res;
}

function isColorWhite(cell) {
    if (cell === KNIGHT_WHITE || cell === ROOK_WHITE || cell === QUEEN_WHITE ||
        cell === BISHOP_WHITE || cell === KING_WHITE || cell === PAWN_WHITE) {
        return true;
    } else {
        return false;
    }
}