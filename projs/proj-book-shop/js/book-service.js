'use strict';

var gBooks;
var gCurrentIdUpdate;
var gCurrentIdRead;
var gSortBy;
var gIsAscSort = true;

function createBooks() {
    var books = [];
    var bookNames = listBookNames();
    for (var i = 0; i < 15; i++) {
        var bookName = bookNames[i];
        books.push(createBook(bookName));
    }
    gBooks = books;
}

function createBook(bookName) {
    var uniqueId = sureUniqueId(gBooks);
    if (isInTheBookNames(bookName)) {
        var image = `<img src="img/books/${bookName}.jpg" alt="img not upload:${bookName}" height="100">`;
    } else {
        var image = 'Book Picture';
    }
    return {
        id: uniqueId,
        name: bookName,
        price: getRandomIntInclusive(25, 65) * 10 + 9.99,
        inStock: getRandomIntInclusive(0, 35),
        rate: getRandomIntInclusive(0, 9),
        imgUrl: image
    }
}

function deleteBook(bookId) {
    var bookIndex = getIdxBookById(bookId);
    gBooks.splice(bookIndex, 1);
    // $(`.${bookId}`).addClass('hide');
}

function addBook(name, price, img) {
    var newBook = createBook(name);
    newBook.price = price;
    newBook.imgUrl = img;
    gBooks.unshift(newBook);
}

function updateBook(bookPrice) {
    var bookId = gCurrentIdUpdate;
    var bookIndex = getIdxBookById(bookId);
    gBooks[bookIndex].price = bookPrice;
}

function readBook(bookId) {
    var book = getBookById(bookId);
    var $jumbotron = $('.jumbotron');
    $jumbotron.find('h2').text('Id: ' + book.id);
    $jumbotron.find('.h3-read1').text('Name: ' + book.name);
    // $jumbotron.find('.h3-read1').text('<span style="text-decoration:underline">Name: </span>' + book.name);
    $jumbotron.find('.h3-read2').text('Price: $' + book.price);
    $jumbotron.find('.h3-read3').text('Quantity: ' + book.inStock);
    $jumbotron.find('.p-read1').html(book.imgUrl);
}

function getBookById(bookId) {
    var selectedBook = gBooks.find(function(book) {
        return bookId === book.id;
    })
    return selectedBook;
}

function getIdxBookById(bookId) {
    var bookIndex = gBooks.findIndex(function(book) {
        return bookId === book.id;
    });
    return bookIndex;
}

function getBooks() {
    return gBooks;
}

function saveBookUpdateId(bookId) {
    gCurrentIdUpdate = bookId;
}

function getBookUpdateId() {
    return gCurrentIdUpdate;
}

function saveBookReadId(bookId) {
    gCurrentIdRead = bookId;
}

function getBookReadId() {
    return gCurrentIdRead;
}


function addRate(bookId) {
    var bookIndex = getIdxBookById(bookId);
    if (gBooks[bookIndex].rate < 9) {
        gBooks[bookIndex].rate++;
    }
}

function subRate(bookId) {
    var bookIndex = getIdxBookById(bookId);
    if (gBooks[bookIndex].rate > 0) {
        gBooks[bookIndex].rate--;
    }
}


function setSortBy(propName) {
    if (gSortBy === propName) {
        gIsAscSort = !gIsAscSort;
    } else {
        gIsAscSort = true;
    }
    gSortBy = propName;
}

function getBooksForDisplay() {

    var booksForDisplay = gBooks.slice();
    booksForDisplay.sort(function(a, b) {
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
    gBooks = booksForDisplay;
}