const Books = require('../models/Books')
const Authors = require('../models/Authors')

exports.books_get = (req, res) => {
    Books.find()
    .then(books =>{
        res.render('books/bookList', {data: books})
    })
    .catch(err => console.log(err))
}
exports.books_post = (req, res) => {
    const books = new Books(req.body)
    const authors = new Authors(req.body)
    books.author.push(authors._id)
    authors.book.push(books._id)
    console.log("these are the BOOKS::::::",books)
    console.log("these are the AUTHORS::::::",authors)
    
    res.redirect('/books/all')
}