'use strict';


var gProjs;
var gCurrIdx;

function createprojs() {
    var projs = [];
    projs.push(createproj('proj-chess', 'Chess 🐴', 'board game', 'A powerful chess game that can be eaten whenever you want!', 'img/portfolio/Chess.png', 'img/portfolio/Chess theme.png', '15/01/19', ['Smart', 'Strategy']));
    projs.push(createproj('proj-in-picture', 'In Picture 👨‍👩‍👧‍👦', 'quiz', 'In this quiz you will have to choose the correct name according to the image that appears above it.', 'img/portfolio/In Picture.png', 'img/portfolio/In Picture theme.png', '26/01/19', ['Adults', 'General Knowledge']));
    projs.push(createproj('proj-shola-sptint-1', 'Shula 💣', 'board game', 'In this game you will have to win by discovering all the empty fields so that we can know where we can build beautiful new buildings.', 'img/portfolio/Shola.png', 'img/portfolio/Shola theme.png', '28/01/19', ['Childs', 'Data Analysis']));
    projs.push(createproj('proj-pacman', 'Pacman 🎮', 'board game', 'Get the funkman game with spectacular improvements.', 'img/portfolio/Pacman.png', 'img/portfolio/Pacman theme.png', '20/01/19', ['Love to eat', 'Old games']));
    projs.push(createproj('proj-book-shop', 'Book Shop 🛒', 'shopping!', 'Want to buy a good and prestigious book? You\'ve come to the right place.', 'img/portfolio/Book Shop.png', 'img/portfolio/Book Shop theme.png', '18/01/19', ['Love to read', 'Shopping online']));
    projs.push(createproj('proj-guess-who', 'Guess Who 🔮', 'prophecy game', 'You\'re going to enter the world on my senses, where we can know what you think at any moment.', 'img/portfolio/Guess Who.png', 'img/portfolio/Guess Who theme.png', '24/01/19', ['Confused', 'Telepathy']));
    projs.push(createproj('proj-touch-nums', 'Touch Nums 1️⃣', 'board game', 'In which we will see if you can break my record by clicking on the numbers in order.', 'img/portfolio/Touch Nums.png', 'img/portfolio/Touch Nums theme.png', '16/01/19', ['Love to touch', 'Dexterity']));
    projs.push(createproj('proj-layout', 'Layout Article 🗃', 'reading', 'A content-rich article is recommended for lovers of literary history.', 'img/portfolio/Layout Article.png', 'img/portfolio/Layout Article theme.png', '17/01/19', ['Scientists', 'Enrichment']));
    projs.push(createproj('proj-safe-content', 'Save Content 🔐', 'secret storage', 'Here you can keep all your secrets! Do not forget - the secret code is "admin".', 'img/portfolio/Save Content.png', 'img/portfolio/Save Content theme.png', '21/01/19', ['Privacy people', 'Encryption']));

    gProjs = projs;
}

function createproj(id, projName, title, desc, url, themeUrl, publisAt, labelsName) {
    return {
        id: id,
        name: projName,
        title: title,
        desc: desc,
        url: url,
        'theme-url': themeUrl,
        publishedAt: publisAt,
        labels: labelsName,
    }
}

function getprojs() {
    return gProjs;
}

function updateIndex(index) {
    gCurrIdx = index;
}

function getCurrIdx() {
    return gCurrIdx;
}