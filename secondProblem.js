/**
 * Given the Harry Potter API - https://docs.potterdb.com/apis/rest
    Fetch the list of books and select the first book
    Fetch the chapters for that book and print the “summary” value of the last chapter to
    the console.
    Also include error handling in case the API is unavailable.
 */

const axios = require('axios')
const BOOKS_ENDPOINT = 'https://api.potterdb.com/v1/books33'


// getchapter details by book_id and chapter_id and print summary

function errorHandler(error) {
    switch(error.status){
        case 404:
            console.log('The endpoint looking for is not available or incorrect. Please check')
            break;
        case 500:
            console.log(`There's internal server error from the API provider. Please try after sometime`)
            break;
        case 402:
            console.log(`The request is invalid. Please reform the request`)
            break;
        default:
            console.log(`There's something wrong with the request/response. Please check the logged response\n` + JSON.stringify(error))
    }
}

function printChapterSummary(bookId, chapterId) {
    if(!bookId || !chapterId) {
        console.log('book_id and chapter_id are required')
        return;
    }
    let CHAPTER_ENDPOINT  = `https://api.potterdb.com/v1/books/${bookId}/chapters/${chapterId}`
    axios.get(CHAPTER_ENDPOINT)
        .then(function(response){
            try{
                console.log(response.data.data.attributes.summary)
            }catch(e) {
                console.log('Summary does not exist')
            }
        }).catch(errorHandler)
}

// getAll parameter is a boolean get all the books or get single book
async function getBooks(getAll){
    let endPoint = getAll ? BOOKS_ENDPOINT : BOOKS_ENDPOINT + '?page[size]=1'
    await axios.get(endPoint)
        .then(function(response){
            let books = response.data.data;
            if(books && books.length) {
                let firstBook = response.data[0]
                let bookId, chapterId;
                try{
                    bookId = books[0].id;
                    let chapters = books[0].relationships.chapters.data
                    chapterId = chapters[chapters.length - 1].id
                }catch(e){}
                printChapterSummary(bookId, chapterId)
            }else {
                console.log(`No books fetched at the moment`)
            }
        }).catch(errorHandler)
}

getBooks(true)