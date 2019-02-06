'use strict';

var gUsers = [];
var gSortBy = 'userName';
var gIsAscSort = true;
const USERS_KEY = 'users';
const LOGGEDIN_USER_KEY = 'loggedinUser';

function createUsers() {

    var users = loadFromStorage(USERS_KEY);

    if (!users || users.length === 0) {
        users = [
            createUser('admin', 'admin'),
            createUser('shiri', 'omerIsTheKing'),
            createUser('yaron', 'iHaveAPuki'),
            createUser('omer', '1324'),
            createUser('batata', 'batata')

        ];
    }
    users[0].isAdmin = true;

    gUsers = users;
    saveToStorage(USERS_KEY, gUsers);
}

function createUser(userName, password) {
    return {
        userName: userName,
        password: password,
        lastLoginTime: new Date().toLocaleString(),
        isAdmin: false
    }
}

function addUser(userName, password) {
    gUsers.push(createUser(userName, password));
    saveToStorage(USERS_KEY, gUsers);
}

function doLogin(userName, password) {
    var user = gUsers.find(function(user) {
        return user.userName === userName && user.password === password
    });
    if (user) {
        user.lastLoginTime = new Date().toLocaleString();
        saveToStorage(USERS_KEY, gUsers)
        saveToStorage(LOGGEDIN_USER_KEY, user)

    }
    return user;
}

function setSortBy(propName) {
    if (gSortBy === propName) {
        gIsAscSort = !gIsAscSort;
    } else {
        gIsAscSort = true;
    }
    gSortBy = propName;
}

function getUsersForDisplay() {

    var usersForDisplay = gUsers.slice();
    usersForDisplay.sort(function(a, b) {
        var x = a[gSortBy];
        var y = b[gSortBy];
        if (x < y) {
            return (gIsAscSort) ? -1 : 1;
        }
        if (x > y) {
            return (gIsAscSort) ? 1 : -1;
        }
        return 0;
    });

    return usersForDisplay;
}

function getLoggedinUser() {
    return loadFromStorage(LOGGEDIN_USER_KEY);
}