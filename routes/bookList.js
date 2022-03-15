const router = require('express').Router();

const bookCtrl = require('../controllers/bookList')

router.get('/all',bookCtrl.books_get)

router.post('/random', bookCtrl.books_post)

module.exports = router