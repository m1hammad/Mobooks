const Books = require('../models/Books')
const Authors = require('../models/Authors')

exports.books_get = (req, res) => {
    Books.find().populate('author')
    .then(books =>{
        res.render('books/bookList', {data: books})
    })
    .catch(err => console.log(err))
}

//   FAVOURITE after I'm able to fully decipher it
exports.books_post = (req, res) => {
    Books.findOne({title: req.body.title})
    .then((book,err) => {
        if (!(book && book.title === req.body.title)){
            const books = new Books(req.body)
            Authors.findOne({name: req.body.name}).then( (obj,err) => {
                if (obj && obj.name === req.body.name) {
                    console.log('first',obj.name)
                    books.author.push(obj._id)
                    books.users.push(req.user._id)
                    obj.book.push(books._id)
                    obj.save()
                    books.save()
                    .then(() => {
                    res.redirect('/books/profile')
                    })
                    .catch(err => console.log(err))
                    
                }
                else {
                    console.log('second',obj)
                    obj = new Authors(req.body)
                    books.author.push(obj._id)
                    obj.book.push(books._id)
                    obj.save()
                    books.save()
                    .then(() => {
                    res.redirect('/books/profile')
                    })
                    .catch(err => console.log(err))
                }
            })
        }
        else{
            res.redirect('/')   // Add message that tells user the book has already been added
        }
    })
    .catch(err => console.log(err))
}


exports.books_get_details= (req,res)=>{
    Books.findById(req.params.id).populate('author')
    .then(book => {
        console.log(book)
        res.render('books/details',{data: book})
    })
}