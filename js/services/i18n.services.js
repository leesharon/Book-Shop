'use strict'

var gTrans = {
    title: {
        en: 'My Book Shop',
        he: 'חנות הספרים שלי'
    },
    
    heading: {
        en: 'Welcome to my Book Shop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },

    search: {
        en: 'search',
        he: 'חיפוש'
    },

    'search-placeholder': {
        en: 'Search for a book',
        he: 'חפש ספר'
    },

    'sort-by': {
        en: 'Sort by',
        he: 'סדר לפי'
    },

    'sort-by-highest-price': {
        en: 'Highest Price',
        he: 'מחיר הכי גבוה'
    },
    
    'sort-by-lowest-rate': {
        en: 'Lowest Rate',
        he: 'דירוג הכי נמוך'
    },

    'th-id': {
        en: 'Id',
        he: 'מספר'
    },

    'th-title': {
        en: 'Title',
        he: 'שם'
    },

    'th-price': {
        en: 'Price',
        he: 'מחיר'
    },

    'th-actions': {
        en: 'Actions',
        he: 'מחיר'
    },

    'th-rate': {
        en: 'Rate',
        he: 'דירוג'
    },

    'btn-read': {
        en: 'Read',
        he: 'קרא'
    },

    'btn-update': {
        en: 'Rate',
        he: 'דרג'
    },

    'btn-remove': {
        en: 'Delete',
        he: 'מחק'
    },

    'new-book': {
        en: 'Create new book +',
        he: 'הוסף ספר חדש +'
    },

    'modal-price': {
        en: 'Price: ',
        he: 'מחיר: '
    },

    'modal-details': {
        en: 'Book Details:',
        he: 'תיאור הספר:'
    },

    'modal-label': {
        en: 'Rate this book (0 to 10):',
        he: 'דרג את הספר (1-10):'
    },

    'modal-close': {
        en: 'Close',
        he: 'סגור'
    },

    'modal-update-h4': {
        en: 'What is the new book price?',
        he: 'מה מחיר הספר החדש?'
    },

    'modal-update-btn': {
        en: 'Update',
        he: 'עדכן'
    },

    'modal-new-book-title': {
        en: 'Book Title',
        he: 'שם הספר'
    },

    'modal-new-book-Price': {
        en: 'Book Price',
        he: 'מחיר הספר'
    },

    'modal-new-book-btn': {
        en: 'Submit',
        he: 'אישור'
    },

    'modal-book-deleted': {
        en: 'Book was deleted',
        he: 'הספר נמחק'
    },

    'prev-btn': {
        en: 'Previous',
        he: 'הקודם'
    },

    'next-btn': {
        en: 'Next',
        he: 'הבא'
    }

}

var gCurrLang = 'en'

function getTrans(transKey) {
    const key = gTrans[transKey]

    if (!key) return 'UNKNOWN'

    let translateVal = key[gCurrLang]
    if (!translateVal) translateVal = key['en']
    return translateVal
}

function setLang(lang) {
    gCurrLang = lang
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')

    els.forEach(el => {
        const translateKey = el.dataset.trans
        const translateVal = getTrans(translateKey)
        el.innerText = translateVal

        if (el.placeholder !== undefined) el.placeholder = translateVal
    })


}