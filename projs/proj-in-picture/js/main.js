'use strict'
console.log('Main');
/*
1. gQuests = [{id: 1, opts:[], correctOptIndex:1 }] gCurrQuestIdx = 0
2. Note: It is convenient to have the images named by the quest id (e.g. : 1.jpg)
3. If the player is correct, move on to next quest
4. Some more functions:
a. initGame()
b. createQuests()
c. renderQuest()
d. checkAnswer(optIdx)
5. Create 3 questions
*/
var images;
var actors;
var copyimages;
var copyActors;
var lengthGame;
var lengthGameActors;

function initGame() {
    images = ['עומר גל', 'סאוסאן שושן', 'ניב סער', 'נטלי פלביץ',
        'שחר זילברמן', 'שירי רון', 'אופיר טופז', 'אלכס יורין',
        'דני בוריסוב', 'יוסי דגן',
    ];
    copyimages = images.slice();
    lengthGame = copyimages.length;
    // lengthGame = 4;
    createQuests();
    switchNextQuest();
    var playAgain = document.getElementById('playAgainId');
    playAgain.classList.add('hide');
    var msg = document.getElementById('winnerId');
    msg.classList.add('hide');
}

function initGameActors() {
    actors = ['Adam Sandler', 'Adrien Brody', 'Angelina Jolie', 'Chris Evans',
        'Chris Hemsworth', 'Daniel Radcliffe', 'Dwayne Johnson', 'Edde Murphy',
        'Freddie Mercury', 'George Clooney', 'Jackie Chan', 'Leonardo DiCaprio',
        'Will Smith', 'Jason Statham', 'Emilia Clarke', 'Brad Pitt',
        'Claire Forlani', 'Omar Sy', 'Johnny Depp', 'James Franco',
        'Jessica Alba', 'Jennifer Aniston', 'Cameron Diaz', 'Dolph Lundgren',
        'Kevin Costner', 'Morgan Freeman', 'Nicolas Cage', 'Natalie Portman',
        'Gal Gadot', 'Paul Walker', 'Penelope Cruz', 'Sandra Bullock',
        'Jason Momoa', 'Vin Diesel', 'Daniel Craig',
    ];
    copyActors = actors.slice();
    // lengthGameActors = copyActors.length;
    lengthGameActors = 10;
    createQuestsActors();
    switchNextQuestActors();
    var playAgain2 = document.getElementById('playAgainId2');
    playAgain2.classList.add('hide');
    var msg2 = document.getElementById('winnerId2');
    msg2.classList.add('hide');
}


var gQuests = [];
var gQuestsActors = [];
var gIndex = 0;
var gIndexActors = 2;
var countIdAuto = 100;
var imageName;
var actorName;
var correctIndex;
var correctIndexActors;
console.log(gQuests);
console.log(gQuestsActors);

function createQuests() {
    for (var i = 0; i < lengthGame; i++) {
        var obj = {
            id: countIdAuto++,
            imgSrc: imgRandom(),
            opts: optsRandom(),
            correctOptIndex: correctIndex
        }
        gQuests.push(obj);
    }
}

function createQuestsActors() {
    for (var i = 0; i < lengthGameActors; i++) {
        var obj = {
            id: countIdAuto++,
            imgSrc: imgRandomActors(),
            opts: optsRandomActors(),
            correctOptIndex: correctIndexActors
        }
        gQuestsActors.push(obj);
    }
}

function imgRandom() {
    var randIdx = Math.floor(Math.random() * images.length);
    imageName = images[randIdx];
    images.splice(randIdx, 1);
    var srcTxt = '"img/programers/' +
        imageName +
        '.jpg"';
    return srcTxt;
}

function imgRandomActors() {
    var randIdx = Math.floor(Math.random() * actors.length);
    actorName = actors[randIdx];
    actors.splice(randIdx, 1);
    var srcTxt = '"img/actors/' +
        actorName +
        '.jpg"';
    return srcTxt;
}

function optsRandom() {
    var names = ['', ''];
    var randIdx = Math.floor(Math.random() * 2);
    correctIndex = randIdx;
    names[randIdx] = imageName;
    var EmptyIdx = (randIdx) ? 0 : 1;
    var randActorsIdx = Math.floor(Math.random() * copyimages.length);
    names[EmptyIdx] = copyimages[randActorsIdx];
    while (copyimages[randActorsIdx] === imageName) {
        randActorsIdx = Math.floor(Math.random() * copyimages.length);
        names[EmptyIdx] = copyimages[randActorsIdx];
    }
    return names;
}

function optsRandomActors() {
    var names = ['', ''];
    var randIdx = Math.floor(Math.random() * 2);
    correctIndexActors = randIdx;
    names[randIdx] = actorName;
    var EmptyIdx = (randIdx) ? 0 : 1;
    var randActorsIdx = Math.floor(Math.random() * copyActors.length);
    names[EmptyIdx] = copyActors[randActorsIdx];
    while (copyActors[randActorsIdx] === actorName) {
        randActorsIdx = Math.floor(Math.random() * copyActors.length);
        names[EmptyIdx] = copyActors[randActorsIdx];
    }
    return names;
}

function checkAnswer(optIdx) {
    userX(optIdx)
    if (optIdx === gQuests[gIndex - 1].correctOptIndex) {
        setTimeout(function() {
            switchNextQuest();
        }, 250);
    }
}

function checkAnswerActors(optIdx) {
    userXActors(optIdx)
    if (optIdx - 2 === gQuestsActors[gIndexActors - 1].correctOptIndex) {
        setTimeout(function() {
            switchNextQuestActors();
        }, 250);
    }
}

function userX(optIdx) {
    var optColor = document.getElementById('answer' + optIdx);
    if (optIdx === gQuests[gIndex - 1].correctOptIndex) {
        optColor.classList.add('rightStyle');
        setTimeout(function() {
            optColor.classList.remove('rightStyle');
        }, 300);
        if (gQuests.length > gIndex) {
            var msgRight = document.getElementById('rightId');
            msgRight.classList.remove('hide');
            setTimeout(function() {
                msgRight.classList.add('hide');
            }, 250);
        }
    } else {
        optColor.classList.add('wrongStyle');
        setTimeout(function() {
            optColor.classList.remove('wrongStyle');
        }, 300);
        if (gQuests.length > gIndex) {
            var msgWrong = document.getElementById('wrongId');
            msgWrong.classList.remove('hide');
            setTimeout(function() {
                msgWrong.classList.add('hide');
            }, 300);
        }
    }
}

function userXActors(optIdx) {
    var optColor = document.getElementById('answer' + optIdx);
    if (optIdx - 2 === gQuestsActors[gIndexActors - 1].correctOptIndex) {
        optColor.classList.add('rightStyle');
        setTimeout(function() {
            optColor.classList.remove('rightStyle');
        }, 300);
        if (gQuestsActors.length > gIndexActors) {
            var msgRight = document.getElementById('rightId2');
            msgRight.classList.remove('hide');
            setTimeout(function() {
                msgRight.classList.add('hide');
            }, 250);
        }
    } else {
        optColor.classList.add('wrongStyle');
        setTimeout(function() {
            optColor.classList.remove('wrongStyle');
        }, 300);
        if (gQuestsActors.length > gIndexActors) {
            var msgWrong = document.getElementById('wrongId2');
            msgWrong.classList.remove('hide');
            setTimeout(function() {
                msgWrong.classList.add('hide');
            }, 300);
        }
    }
}

function switchNextQuest() {
    if (gQuests.length > gIndex) {
        var strImg = '<td colspan="2">' +
            '<img src=' + gQuests[gIndex].imgSrc +
            'alt=""' +
            '></td>';
        var elImg = document.querySelector('.img');
        elImg.innerHTML = strImg;

        var strOpts = '<td id="answer0" onclick="checkAnswer(0)">' +
            gQuests[gIndex].opts[0] +
            '</td>' +
            '<td id="answer1" onclick="checkAnswer(1)">' +
            gQuests[gIndex].opts[1] +
            '</td>';
        var elopt = document.querySelector('.opt');
        elopt.innerHTML = strOpts;

        gIndex++;
    } else {
        var msg = document.getElementById('winnerId');
        msg.classList.remove('hide');
        var playAgain = document.getElementById('playAgainId');
        playAgain.classList.remove('hide');
    }
}

function switchNextQuestActors() {
    if (gQuestsActors.length > gIndexActors) {
        var strImg = '<td colspan="2">' +
            '<img src=' + gQuestsActors[gIndexActors].imgSrc +
            'alt=""' +
            '></td>';
        var elImg = document.querySelector('.img2');
        elImg.innerHTML = strImg;

        var strOpts = '<td id="answer2" onclick="checkAnswerActors(2)">' +
            gQuestsActors[gIndexActors].opts[0] +
            '</td>' +
            '<td id="answer3" onclick="checkAnswerActors(3)">' +
            gQuestsActors[gIndexActors].opts[1] +
            '</td>';
        var elopt = document.querySelector('.opt2');
        elopt.innerHTML = strOpts;

        gIndexActors++;
    } else {
        var msg = document.getElementById('winnerId2');
        msg.classList.remove('hide');
        var playAgain = document.getElementById('playAgainId2');
        playAgain.classList.remove('hide');
    }
}