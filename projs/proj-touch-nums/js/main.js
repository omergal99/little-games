'use strict'
console.log('touch nums!');

/*
• User sees a board with 16 cells, containing numbers 1..16, in a random order
o Hint: use an HTML table
o Hint: Nice technique for building the board: place the 16 numbers in a simple array,
     shuffle it, then build the <table> by popping a number from the nums array.
o Note: there is no need to use as matrix in this exercise
• User should click the buttons in a sequence (1, 2, 3,… 16)
• When user clicks the a button - call a function cellClicked(clickedNum)
o If right – the button changes its color
o When user clicks the wrong button noting happen
• When user clicks the first number, game time starts and presented (3 digits after the dot,
     like in: 12.086)
• Add difficulties (larger boards: 25, 36)
*/

var difficulties = 25;
var currentNum = 1;
var stopWatch;

var audioWin = new Audio('sound/win.mp3');
var audioWrong = new Audio('sound/wrong.mp3');
var audioRight = new Audio('sound/right.mp3');

function initGame() {
    currentNum = 1;
    stopWatch = clearInterval(stopWatch);
    var elStopWatch = document.querySelector('.stopWatch');
    elStopWatch.innerHTML = '00 : 00 : 000';
    createBoard();
    var finishGame = document.querySelector('.finishGame');
    finishGame.classList.add('hide');

}

function selectLevel(elSelected, level) {
    var elLevels = document.querySelectorAll('.levels td');
    for (var i = 0; i < elLevels.length; i++) {
        elLevels[i].style.color = 'rgb(36, 32, 32)';
        elLevels[i].style.backgroundColor = 'rgb(167, 209, 243)';
        elLevels[i].style.border = '1.5px solid rgb(31, 57, 78)';
    }
    elSelected.style.color = 'rgb(211, 206, 206)';
    elSelected.style.backgroundColor = 'rgb(33, 48, 56)';
    elSelected.style.border = '1.5px solid rgb(161, 209, 248)';

    difficulties = level;
    initGame();
}

function cellClicked(elNum, clickedNum) {
    var elStopWatch = document.querySelector('.stopWatch');
    var finishGame = document.querySelector('.finishGame');
    if (currentNum === clickedNum) {
        markNum(elNum);
        if (clickedNum % 10 === 0 && clickedNum !== difficulties) {
            audioRight.play();
        }
        currentNum++;
        if (clickedNum === 1) {
            var start = Date.now();
            stopWatch = setInterval(function() {
                calcStopWatch(elStopWatch, Date.now() - start)
            }, 1)
        }
        if (clickedNum === difficulties) {
            audioWin.play();
            stopWatch = clearInterval(stopWatch);
            var msgGame = '<tr><td>W e l l &nbsp;&nbsp; p l a y e d ! !</td></tr>' +
                '<tr><td>&nbsp; Level ' + difficulties +
                ':&nbsp;&nbsp;&nbsp;' + elStopWatch.innerHTML +
                '&nbsp;</td></tr>';
            finishGame.innerHTML = msgGame;
            finishGame.classList.remove('hide');
        }
    } else {
        audioWrong.play();
    }
}

function calcStopWatch(elStopWatch, timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = (time.getMilliseconds() / 1).toFixed(0);
    if (milliseconds.length < 2) milliseconds = '0' + milliseconds;

    if (minutes.length < 2) { minutes = '0' + minutes; }
    if (seconds.length < 2) { seconds = '0' + seconds; }

    elStopWatch.innerHTML = minutes + ' : ' + seconds + ' : ' + milliseconds;
}

function createBoard() {
    var randomNums = randomArr();
    var strTable = '';
    for (var i = 0; i < (difficulties ** 0.5); i++) {
        strTable += '<tr>';
        for (var j = 0; j < (difficulties ** 0.5); j++) {
            var number = (randomNums[0]) ? randomNums[0] : '';
            strTable += '<td onclick="cellClicked(this,' +
                number + ')">' + number +
                '</td>';
            randomNums.splice(0, 1);
        }
        strTable += '</tr>';
    }
    var elTable = document.querySelector('.tableGame');
    elTable.innerHTML = strTable;
}

function randomArr() {
    var nums = [];
    var randomNums = [];
    for (var i = 0; i < difficulties; i++) {
        nums.push(i + 1);
    }
    // return nums;
    var tempLength = difficulties;
    for (var i = 0; i < difficulties; i++) {
        var randIdx = Math.floor(Math.random() * tempLength);
        randomNums.push(nums[randIdx]);
        nums.splice(randIdx, 1);
        tempLength--;
    }
    return randomNums;
}

function markNum(elNum) {
    // add color
    // hover down
    elNum.style.color = 'rgb(20, 19, 19)';
    elNum.style.backgroundColor = 'rgb(131, 204, 155)';
}