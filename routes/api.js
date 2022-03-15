const router = require('express').Router();

const apiCtrl = require('../controllers/api')

router.get('/search', apiCtrl.api_books_get)

router.get('/detail/:id',apiCtrl.api_book_detail_get)

module.exports = router