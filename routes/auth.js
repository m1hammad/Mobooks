// Shorthand
const router = require('express').Router()
const {body} = require('express-validator')
const authCntrl = require('../controllers/auth')

// Routes for authentication


router.get('/signup', authCntrl.auth_signup_get)

router.post('/signup', [
    body('firstName').isLength({min: 3}).withMessage('First name must be atlase 3 characters long'),
    body('lastName').isLength({min: 3}),
    body('emailAddress').isEmail(),
    body('password').isLength({min : 6})
], 
authCntrl.auth_signup_post)

router.get('/signin', authCntrl.auth_signin_get)

router.post('/signin', authCntrl.auth_signin_post)

router.get('/logout', authCntrl.auth_logout_get)

module.exports = router