'use strict'

function onInit() {
    renderSortByQueryStringParams()
    renderBooks()
}

function renderBooks() {
    const books = getBooksForDisplay()

    var strHTML = books.map(book => `
        <tr>
            <td>#${book.id}</td>
            <td class="td-title">${book.title}</td>
            <td data-transcurr="td-price" data-price="${book.price}" class="price">$${book.price}</td>
            <td><button data-trans="btn-read" onclick="onReadBook('${book.id}')" class="read-btn">Read</button></td>
            <td><button data-trans="btn-update" onclick="onOpenUpdateModal('${book.id}')" class="update-btn">Update</button></td>
            <td><button data-trans="btn-remove" onclick="onRemoveBook('${book.id}')" class="remove-btn">Delete</button></td>
            <td class="rate">${book.rate}</td>
        </tr>
    `)

    document.querySelector('.book-tbody').innerHTML = strHTML.join('')
    renderPagination()
}

function renderPagination() {
    const pagesCount = Math.ceil(getgBooks().length / getPageSize())
    var strHTML = ``

    for (let i = 0; i < pagesCount; i++) {
        strHTML += `<a class="page-${i}" onclick="onPageSelection(this)">${i + 1}</a>`
    }
    document.querySelector('.btn-prev').nextElementSibling.innerHTML = strHTML

    const currPageIdx = getPageIdx()
    document.querySelector(`.page-${currPageIdx}`).classList.add('next')
}

function onPageSelection(elBtn) {
    changePageSelection(elBtn.innerText)
    renderBooks()
}

function onRemoveBook(bookId) {
    removeBook(bookId)

    const elMsg = document.querySelector('.user-msg')
    elMsg.classList.add('open')
    setTimeout(() => elMsg.classList.remove('open'), 2000);

    renderBooks()
}

function onOpenNewBookModal() {
    document.querySelector('.new-book-modal').classList.add('open')
}

function onAddBook(ev) {
    ev.preventDefault()

    const bookName = $('#title')
    const bookPrice = $('#price')
    addBook(bookName.val(), bookPrice.val())

    document.querySelector('.new-book-modal').classList.remove('open')
    bookName.value = ''
    bookPrice.value = ''

    renderBooks()
}

function onOpenUpdateModal(bookId) {
    document.querySelector('.update-modal').classList.add('open')
    document.querySelector('.update-modal button').setAttribute('onclick', `onUpdateBook('${bookId}')`)
}

function onUpdateBook(bookId) {
    const elInput = document.querySelector('.update-modal input')
    const newBookPrice = elInput.value
    updateBook(bookId, newBookPrice)
    document.querySelector('.update-modal').classList.remove('open')
    elInput.value = ''
    renderBooks()
}

function onReadBook(bookId) {
    const book = getBookById(bookId)
    const elModal = $('.modal')
    elModal.find('h3').innerText = book.title
    elModal.querySelector('.price-span-modal').innerText = book.price + '$'
    elModal.querySelector('p').innerText = book.details
    elModal.querySelector('.less-rate')
        .setAttribute('onclick', `onRateChange(false, '${book.id}')`)
    elModal.querySelector('.more-rate')
        .setAttribute('onclick', `onRateChange(true, '${book.id}')`)
    elModal.querySelector('.rate-input').value = book.rate
    elModal.classList.add('open')
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onRateChange(isMore, bookId) {
    const book = getBookById(bookId)
    rateChange(isMore, bookId)
    document.querySelector('.rate-input').value = book.rate

    // renderBooks()
    onSetSortBy()
}

function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const sortBy = {}

    sortBy[prop] = 1

    setSortBy(sortBy)
    renderBooks()
}

function onTHClick(elTH) {
    if (elTH.innerText.toUpperCase() === 'PRICE') {
        document.querySelector('.sort-by').value = 'maxPrice'
    } else if (elTH.innerText.toUpperCase() === 'RATE') {
        document.querySelector('.sort-by').value = 'minRate'
    }

    onSetSortBy()
}

function onRegexSearch(ev) {
    ev.preventDefault()

    const searchFor = document.querySelector('.search-bar').value
    const filterBy = {
        search: searchFor
    }

    setBookFilter(filterBy)
    renderBooks()

    const queryStringParams = `?search=${filterBy.search}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderSortByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        search: queryStringParams.get('search') || '',
    }

    if (!filterBy.search) return

    document.querySelector('.search-bar').value = filterBy.search
    setBookFilter(filterBy)

}

function onNextPage() {
    const isLastPage = nextPage()
    if (isLastPage) changePageBtnClass('btn-next')
    renderBooks()
}

function onPrevPage() {
    prevPage()
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang)

    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    doTrans()
    switchCurrency()

}

function changePageBtnClass(btnClass) {
    const elBtn = document.querySelector(`.${btnClass}`)

    if (elBtn.classList.contains('previous')) {
        elBtn.classList.remove('previous')
        elBtn.classList.add('next')
    } else {
        elBtn.classList.add('previous')
        elBtn.classList.remove('next')
    }
}