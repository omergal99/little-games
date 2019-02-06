'use strict';

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show();
    $('.quest button').show();

}

function renderQuest() {
    $('.quest h2').html(getCurrQuest().txt);
}

function onUserResponse(res) {
    var currQuest = getCurrQuest();
    if (isChildless(currQuest)) {
        if (res === 'yes') {
            $('.quest button').hide();
            $('.play-again').show();
        } else {
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        updateGLastRes(res);
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    if ($('#newGuess').val() !== '' && $('#newQuest').val() !== '') {
        var newGuessTxt = $('#newGuess').val() + '!';
        var newQuestTxt = $('#newQuest').val() + '?';
        var res = getCurrQuest().txt;
        addGuess(newQuestTxt, newGuessTxt, res);

        onRestartGame();
    } else {
        $('.wrong-fill').html('Oh no, I\'m empty');
        setTimeout(function() {
            $('.wrong-fill').html('');
        }, 1500)
    }
}

function playAgain() {
    onRestartGame();
    $('.quest').hide();
    $('.play-again').hide();
    init();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    resetLastRes();
}

function openTree() {

    var tree = getQuestsTree();
    var strTree = `<li>${tree.txt}</li><ul>`;
    renderTree(tree);
    strTree += '</ul> ';
    if ($('.tree-btn').html() === 'Open Tree') {
        $('.tree-btn').html('Close Tree');
    } else {
        $('.tree-btn').html('Open Tree');
    }
    $('.tree').html(strTree);
    $('.tree').toggleClass('hide');
    $('main').toggleClass('hide');

    function renderTree(tree) {
        var left = tree.yes;
        var right = tree.no;

        if (left) {
            if (left.yes) {
                strTree += `<li>${left.txt}</li><ul>`;
                renderTree(left);
                strTree += '</ul>';
            } else {
                strTree += `<li>${left.txt}</li>`;
            }
        }
        if (right) {
            if (right.yes) {
                strTree += `<li>${right.txt}</li><ul>`;
                renderTree(right);
                strTree += '</ul>';
            } else {
                strTree += `<li>${right.txt}</li>`;
            }
        }
    }
}