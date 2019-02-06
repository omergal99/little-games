'use strict';
var WALL = '🏠';
var FOOD = '💎';
var foodInStart = 56;
// var POWER_FOOD = '👵';
var POWER_FOOD = '<img src="img/puki2.png">';

var timeToEat = 5000;
var EMPTY = ' ';
var emptyCells = [];
/*

אם יש מתחת למפלצת שאכלתי יהלום אז
להעלים את היהלום וגם:
score++
ובכל מקרה אם אכלתי מפלצת מאחוריה ישאר ריק
food = wmpty
*/
var gBoard;
var gGame = {
  score: 0,
  bonus: 0,
  isOn: false
};
var charryRun = setInterval(function () {
  createCharry(gBoard, emptyCells);
}, charryTimeRun);

function init() {
  clearInterval(gIntervalGhosts);
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  gGame.score = 0;
  document.querySelector('header h3 span').innerText = gGame.score;
  var playAgain = document.getElementById('playAgainId');
  playAgain.style.display = 'none';
  var win = document.getElementById('winnerId');
  win.style.display = 'none';
  var lose = document.getElementById('loseId');
  lose.style.display = 'none';
  emptyCells = [];
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if ((i === 1 || i === 8) && (j === 1 || j === 8)) {
        board[i][j] = POWER_FOOD;
      }
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span')
    .innerText = (gGame.score + gGame.bonus);
}

function updatebonus(value) {
  gGame.bonus += value;
  document.querySelector('header h3 span')
    .innerText = (gGame.score + gGame.bonus);
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = 0;
  var playAgain = document.getElementById('playAgainId');
  playAgain.style.display = 'block';
  if (gGame.score >= foodInStart) {
    var win = document.getElementById('winnerId');
    win.style.display = 'block';
  } else {
    var lose = document.getElementById('loseId');
    lose.style.display = 'block';
  }
  charryRun = clearInterval(charryRun);
}

function handleKey(event) {
  if (event.key === ' ') {
    init();
  }
}