'use strict';

function init() {
    createBooks();
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtml = books.map(function(book) {
        return `<tr class="${book.id}">
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>💲${book.price}</td>
        <td>${book.inStock}</td>
        <td>
        <button class="btn btn-outline-danger" onclick="onSubRate('${book.id}')" type="button">➖</button>
        <span style="font-size:22px;">⭐${book.rate}⭐</span>  
        <button class="btn btn-outline-success" onclick="onAddRate('${book.id}')" type="button">➕</button>
        </td>
        <td>${book.imgUrl}</td>
        <td><button class="btn btn-primary" onclick="onReadBook('${book.id}')">Read</button>
        <button class="btn btn-warning" onclick="openUpdatePrice('${book.id}')">Update</button>
        <button class="btn btn-danger" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>`;
    })
    $('.book-list-body').html(strHtml.join(''));
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function openNewBookWindow() {
    $('.form-new-book').toggleClass('hide');
    if ($('.btn-create-book').html() === 'Create new book' ||
        $('.btn-create-book').html() === 'Open new book') {
        $('.btn-create-book').html('Close new book');
    } else {
        $('.btn-create-book').html('Open new book');
    }
}

function readAndAddNewBook() {
    var name = $('.name-input').val();
    var price = $('.price-input').val();
    var img = $('.custom-file-input').val();
    addBook(name, price, img);
    $('.btn-create-book').html('Create new book');
    $('.form-new-book').addClass('hide');
    renderBooks();
}

function openUpdatePrice(bookId) {
    if (getBookUpdateId() === bookId && !$('.form-update-price').hasClass('hide')) {
        $('.form-update-price').addClass('hide');
    } else {
        $('.form-update-price').removeClass('hide');
    }
    $('.label-update').html(`Update book price of book Id: ${bookId}`);
    saveBookUpdateId(bookId);
}

function readAndUpdateBook() {
    var bookPrice = $('.price-input-update').val();
    updateBook(bookPrice);
    renderBooks();
}

function closeUpdateWindow() {
    $('.form-update-price').addClass('hide');
}

function onReadBook(bookId) {
    if (getBookReadId() === bookId && !$('.jumbotron').hasClass('hide')) {
        $('.jumbotron').addClass('hide');
    } else {
        $('.jumbotron').removeClass('hide');
    }
    saveBookReadId(bookId);
    readBook(bookId);
}

function closeReadWindow() {
    $('.jumbotron').addClass('hide');
}

function onAddRate(bookId) {
    addRate(bookId);
    renderBooks();
}

function onSubRate(bookId) {
    subRate(bookId);
    renderBooks();
}

function sortBy(elTh) {
    // var dataTh = $('data-th').attr(elTh); // TO ASK - Why sont working
    var dataTh = elTh.getAttribute('data-th');
    setSortBy(dataTh);
    getBooksForDisplay();
    renderBooks();
}