'use strict';
console.log('util js on');

/*
functions assistent
*/

function calcStopWatch(elStopWatch, timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = (time.getMilliseconds() / 10).toFixed(0);

    if (milliseconds.length < 2) milliseconds = '0' + milliseconds;
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    elStopWatch.innerHTML = minutes + ':' + seconds;
}

function handleKey(event) {
    if (event.key === ' ') {
        initGame();
    }
}