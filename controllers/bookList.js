const Books = require('../models/Books')
const Authors = require('../models/Authors')

exports.books_get = (req, res) => {
    Books.find().populate('author')
    .then(books =>{
        res.render('books/bookList', {data: books})
    })
    .catch(err => console.log(err))
}



exports.books_get_details= (req,res)=>{
    Books.findById(req.params.id).populate('author')
    .then(book => {
        res.render('books/details',{data: book})
    })
}