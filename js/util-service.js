'use strict';

function makeId() {
    var length = 4;
    var txt = '';
    // var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var possible = '0123456789';
    var possibleWord = 'ABC';
    txt += possibleWord.charAt(Math.floor(Math.random() * possibleWord.length));
    for (var i = 0; i < length - 1; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function sureUniqueId(arr) {
    if (arr) {
        var uniqueId;
        var isUnique = false;
        while (!isUnique) {
            uniqueId = makeId();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id !== uniqueId) {
                    isUnique = true;
                } else {
                    isUnique = false;
                    break;
                }
            }
        }
        return uniqueId;
    } else {
        return makeId();
    }
}

function isInTheBookNames(bookName) {
    var bookNames = listBookNames();
    return bookNames.find(function (book) {
        return bookName === book;
    })
}

function listBookNames() {
    return ['Snake', 'In-Picture', 'chess', 'pacman', 'bookShop', 'Shula'];
}

function getRandomDoubleInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var number = Math.random() * (max - min + 1) + min;
    return number.toFixed(2);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    return JSON.parse(str);

}