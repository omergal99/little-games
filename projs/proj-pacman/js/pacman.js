'use strict'
var gPacman;
// const PACMAN = '🦆';
var PACMAN = '<img src="img/up2.png">';
// var CHERRY = '🍒';
var CHERRY = '<img src="img/shiri.png">';
var charryTimeRun = 15000;

function createPacman(board) {
  gPacman = {
    location: {
      i: 5,
      j: 6
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function createCharry(board, emptyCells) {
  if (emptyCells.length !== 0) {
    var rand = Math.floor(Math.random() * emptyCells.length);
    board[emptyCells[rand].i][emptyCells[rand].j] = CHERRY;
    renderCell({
      i: emptyCells[rand].i,
      j: emptyCells[rand].j
    }, CHERRY);
    emptyCells.splice(rand, 1);
  }
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  if (nextCell === POWER_FOOD && gGhosts[0].eatable === true) {
    return;
  }
  // Hitting FOOD? update score
  if (nextCell === CHERRY) {
    updatebonus(10);
  }
  if (nextCell === FOOD) {
    updateScore(1);
    if (gGame.score >= foodInStart) {
      gameOver();
    }
    emptyCells.push({
      i: nextLocation.i,
      j: nextLocation.j
    });
  } else if (nextCell === POWER_FOOD) {
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].color = 'red';
      gGhosts[i].eatable = true;
      renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
    }
    setTimeout(function () {
      for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = getRandomColor();
        gGhosts[i].eatable = false;
        gGhosts[i].eated = false;
      }
    }, timeToEat);
  } else if (nextCell === GHOST) {
    if (gGhosts[0].eatable === false) {
      gameOver();
      renderCell(gPacman.location, EMPTY);
      return;
    } else {
      for (var k = 0; k < gGhosts.length; k++) {
        if (
          gGhosts[k].location.i === nextLocation.i &&
          gGhosts[k].location.j === nextLocation.j) {
          gGhosts[k].eated = true;
          // if (gGhosts[k].currCellContent === FOOD) {
          //   updateScore(1);
          // }
        }
      }
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);



}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
    PACMAN = '<img src="img/up2.png">';
      nextLocation.i--;
      break;
    case 'ArrowDown':
    PACMAN = '<img src="img/down2.png">';
      nextLocation.i++;
      break;
    case 'ArrowLeft':
    PACMAN = '<img src="img/left2.png">';
      nextLocation.j--;
      break;
    case 'ArrowRight':
    PACMAN = '<img src="img/right2.png">';
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}