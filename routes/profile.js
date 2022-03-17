const router = require('express').Router();

const profileCtrl = require('../controllers/profile')

router.get('/:id', profileCtrl.profile_list_get)

router.get('/detail/:id', profileCtrl.profile_book_get_details)

router.get('/delete/:id', profileCtrl.profile_book_delete_get)

router.post('/add', profileCtrl.profile_books_post)

module.exports = router