const Books = require('../models/Books')
const Authors = require('../models/Authors')
const { render } = require('ejs')
const Users = require('../models/Users')

exports.profile_list_get = async (req, res) => {
    // console.log(req.params.id)
    let user = await Users.findById(req.user.id)
    console.log(user)
    // user.populate('book')
    let books = await Books.find({_id: {$in: user.book}})
    res.render('profile/profile', {mydata: books})
    
}

exports.profile_book_get_details= (req,res)=>{
    Books.findById(req.params.id).populate('author')
    .then(book => {
        res.render('profile/profileDetails',{mydata: book})
    })
}

exports.profile_book_delete_get = async (req, res) => {
    let user = await Users.findById(req.user.id)
    await user.book.splice(user.book.indexOf(req.params.id), 1)
    await user.save()
    res.redirect(`/profile/${req.user._id}`)
}

exports.profile_rating_put = (req, res) => {
    
    Books.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect(`/profile/detail/${req.params.id}`)
    })
    .catch( err=> {
        console.log(err)
    })
}

exports.explore_delete = (req, res) => {
    Books.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/books/all')
    })
    .catch( err=> {
        console.log(err)
    })
}

//   FAVOURITE after I'm able to fully decipher it
exports.profile_books_post = async (req, res) => {
    let user = await Users.findById(req.user.id)
    Books.findOne({title: req.body.title})
    .then((book,err) => {
        
        if (!(book && book.title === req.body.title) ){
            const books = new Books(req.body)
            Authors.findOne({name: req.body.name}).then( (author,err) => {
                if (author && author.name === req.body.name) {
                    console.log('first',author.name)
                    books.author.push(author._id)
                    author.book.push(books._id)
                    console.log(books._id)
                    user.book.push(books._id)
                    books.user.push(req.user._id)
                    console.log('before', user)
                    user.save()
                    console.log('after', user)
                    author.save()
                    books.save()
                    .then(() => {
                        res.redirect(`/profile/${req.user._id}`)
                    })
                    .catch(err => console.log(err))
                    
                }
                else {
                    console.log('second',author)
                    author = new Authors(req.body)
                    books.author.push(author._id)
                    author.book.push(books._id)
                    console.log(books._id)
                    user.book.push(books._id)
                    books.user.push(req.user._id)
                    console.log('before', user)
                    console.log('after', user)
                    author.save()
                    books.save()
                    user.save()
                    .then(() => {
                        res.redirect(`/profile/${req.user._id}`)
                    })
                    .catch(err => console.log(err))
                }
            })
        }
        else if(book && !(book.user.includes(req.user.id))){
            console.log('im here')
            user.book.push(book._id)
            book.user.push(req.user._id)
            book.save()
            user.save()
            .then(() => {
                res.redirect(`/profile/${req.user._id}`)
            })
            .catch(err => console.log(err))
        }
        else{
            res.redirect('/')   // Add message that tells user the book has already been added
        }
    })
    .catch(err => console.log(err))
}