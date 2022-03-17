const express = require('express')
const router = require('express').Router();
const methodOverride = require('method-override')
const isLoggedIn = require('../helper/isLoggedIn')

const profileCtrl = require('../controllers/profile')
router.use(methodOverride('_method'))
router.use(express.urlencoded({extended: true}))


router.get('/:id', profileCtrl.profile_list_get)

router.get('/detail/:id', isLoggedIn,profileCtrl.profile_book_get_details)

router.get('/delete/:id', isLoggedIn, profileCtrl.profile_book_delete_get)

router.post('/add', isLoggedIn, profileCtrl.profile_books_post)

router.put('/rating/:id', isLoggedIn, profileCtrl.profile_rating_post)

module.exports = router