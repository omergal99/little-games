'use strict';

function init() {
    console.log('init on');
    createUsers();
}

function showPage() {
    document.querySelector('.enter').classList.toggle('hide');
    document.querySelector('.page').classList.toggle('hide');
}

function confirmLogin() {
    var userName = document.querySelector('.user-name').value;
    var password = document.querySelector('.password').value;

    var user = doLogin(userName, password);

    if (user) {
        if (user.isAdmin) {
            document.querySelector('.div-admin').innerHTML = `<button onclick="window.location.href='admin.html'" type="button" class="admin-btn">ADMIN</button>`;
        }
        document.querySelector('.hello-user').innerHTML = `Welcome back: ${userName} !`;
        showPage();
    } else {
        var elInvalidContent = document.querySelector('.invalid-content');
        elInvalidContent.innerHTML = `Wrong Credentials`;
        setTimeout(function() {
            elInvalidContent.innerHTML = '';
        }, 3000);
    }
}