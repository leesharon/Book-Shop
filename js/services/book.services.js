'use strict'
const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5
var gBooks
var gBooksCopy
var gFilterBy = { regex: '', search: '' }
var gPageIdx = 0

_createBooks(20)

function getBooksForDisplay() {
    var books = gBooks
    const startIdx = gPageIdx * PAGE_SIZE

    if (!gFilterBy.regex) return books.slice(startIdx, startIdx + PAGE_SIZE)
    return books.filter(book => gFilterBy.regex.test(book.title))
}

function nextPage() {
    if ((gPageIdx + 1) * PAGE_SIZE >= gBooks.length) return true
    gPageIdx++
}

function prevPage() {
    if ((gPageIdx + 1) * PAGE_SIZE <= PAGE_SIZE) return
    gPageIdx--
}

function getPageIdx() {
    return gPageIdx
}

function changePageSelection(pageSelected) {
    gPageIdx = pageSelected - 1
}

function removeBook(bookId) {
    const bookIdx = getBookIdxById(bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(name, price) {
    gBooks.push(_createBook(name, price))
    _saveBooksToStorage()
}

function updateBook(bookId, bookPrice) {
    const bookIdx = getBookIdxById(bookId)
    gBooks[bookIdx].price = bookPrice
    _saveBooksToStorage()
}

function rateChange(isMore, bookId) {
    const bookIdx = getBookIdxById(bookId)
    if (isMore && gBooks[bookIdx].rate < 10) gBooks[bookIdx].rate++
    else if (!isMore && gBooks[bookIdx].rate > 0) gBooks[bookIdx].rate--
    _saveBooksToStorage()
}

function setSortBy(sortBy = {}) {
    if (sortBy.minRate !== undefined) {
        gBooks.sort((b1, b2) => b1.rate - b2.rate)
    } else if (sortBy.maxPrice !== undefined) {
        gBooks.sort((b1, b2) => b2.price - b1.price)
    }
}

function getPageIdx() {
    return gPageIdx
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function getBookIdxById(bookId) {
    return gBooks.findIndex(book => book.id === bookId)
}

function getPageSize() {
    return PAGE_SIZE
}

function _createBook(title, price = getRandomInt(5, 20), rate = 0) {
    return {
        id: makeId(2),
        title,
        price,
        details: makeLorem(40),
        rate
    }
}

function _createBooks(bookCount) {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = []
        for (let i = 0; i < bookCount; i++) {
            books.push(_createBook(makeLorem(2, getRandomInt(3, 6))))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getgBooks() {
    return gBooks
}

function setBookFilter(filterBy = {}) {
    if (filterBy.search !== undefined) {
        const regex = new RegExp(filterBy.search, 'ig')
        gFilterBy.search = filterBy.search
        gFilterBy.regex = regex
    }
}
