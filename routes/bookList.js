const router = require('express').Router();

const bookCtrl = require('../controllers/bookList')

router.get('/all',bookCtrl.books_get)

router.post('/add', bookCtrl.books_post)

router.get('/detail/:id', bookCtrl.books_get_details)

module.exports = router