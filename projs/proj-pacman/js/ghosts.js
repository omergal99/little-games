'use strict'

// var GHOST = '&#9781;';
var GHOST = '☠';
// var GHOST = '<img src="img/puki.png">';

var gIntervalGhosts;
var gGhosts;
var gLocateGhost = 2;

function createGhost(board) {
    var ghost = {
        location: {
            i: gLocateGhost++,
            j: 2
        },
        color: getRandomColor(),
        currCellContent: FOOD,
        eatable: false,
        eated: false
    };
    gGhosts.push(ghost);
    // board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    // Empty the gGhosts array, create some ghosts
    gGhosts = [];

    createGhost(board);
    // renderCell(gGhosts[0].location, getGhostHTML(board));
    createGhost(board);
    // renderCell(gGhosts[1].location, getGhostHTML(board));
    gLocateGhost = 2;

    // Run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 500)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (ghost.eated === false) {
            // Create the moveDiff
            var moveDiff = getMoveDiff();
            // console.log('moveDiff', moveDiff);
            var nextLocation = {
                i: ghost.location.i + moveDiff.i,
                j: ghost.location.j + moveDiff.j,
            }
            // console.log('nextLocation', nextLocation);

            var nextCell = gBoard[nextLocation.i][nextLocation.j]
            // If WALL return
            if (nextCell === GHOST) {
                console.log('Ghost Hitting a GHOST');
                return;
            }
            if (nextCell === WALL) {
                console.log('Ghost Hitting a Wall');
                return;
            }

            // DETECT gameOver
            if (nextCell === PACMAN) {
                if (ghost.eatable === false) {
                    renderCell(ghost.location, getGhostHTML(ghost));
                    gameOver();
                } else {
                    ghost.eated = true;
                    renderCell(ghost.location, EMPTY);
                }
            } 
                // Set back what we stepped on
                gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
                renderCell(ghost.location, ghost.currCellContent);

                // Move the ghost MODEL
                ghost.currCellContent = nextCell;
                ghost.location = nextLocation
                gBoard[ghost.location.i][ghost.location.j] = GHOST;

                // Updade the DOM 
                renderCell(ghost.location, getGhostHTML(ghost));
            
        }
    }
}

// There are 4 options where to go
function getMoveDiff() {
    // return { i: getRandomIntInclusive(-1, 1), j: getRandomIntInclusive(-1, 1) }
    var opts = [{
        i: 0,
        j: 1
    }, {
        i: 1,
        j: 0
    }, {
        i: -1,
        j: 0
    }, {
        i: 0,
        j: -1
    }];
    return opts[getRandomIntInclusive(0, opts.length - 1)];
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}