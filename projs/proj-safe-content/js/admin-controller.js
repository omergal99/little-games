'use strict';

function init() {

    var user = getLoggedinUser();
    if (!user || !user.isAdmin) {
        window.location = '/';
        return;
    }

    console.log('init on');
    createUsers();
    renderUsers();
    renderToCards(gUsers);
}

function renderUsers() {
    var users = getUsersForDisplay();

    var strHTML = `<tr>`;
    Object.keys(users[0]).forEach(function (propName) {
        strHTML += '<th data-th="' + propName + '" onclick="sortBy(this)">' + propName + '</th>';
    });
    strHTML += `</tr>`;
    document.querySelector('.users-table-head').innerHTML = strHTML;

    strHTML = '';
    users.forEach(function (user) {
        strHTML += `<tr>`;
        Object.values(user).forEach(function (value) {
            strHTML += `<td>${value}</td>`;
        });
        strHTML += `</tr>`;
    });

    document.querySelector('.users-table-body').innerHTML = strHTML;
}

function sortBy(elTh) {
    var propName = elTh.getAttribute('data-th');
    setSortBy(propName);
    renderUsers();
}

function renderToCards() {
    var users = getUsersForDisplay();

    var strHTML = '';

    users.forEach(function (user) {
        strHTML += `<div class="pictureArr">${user.userName}<img src="img/login2.jpg"></div>`;
    });
    strHTML += `</table>`;

    document.querySelector('.users-div2').innerHTML = strHTML;
}