// API's for authentication
const User = require('../models/Users')
const bcrypt = require('bcrypt')
let passport = require('../helper/ppConfig');
const salt = 10;
const {validationResult} = require('express-validator')

// HTTP GET - Signup - load the signup form 
exports.auth_signup_get = (req, res) => {
    res.render('auth/signup')
}

// HTTP POST - Signup - to post data
exports.auth_signup_post = (req, res) => {
    const user = new User(req.body)

    let hash = bcrypt.hashSync(req.body.password, salt)
    console.log(hash)
    user.password = hash;
    user.save()
    .then(() => {
        res.redirect("/");
      })
    .catch(err => {
        if(err.code === 11000){
            req.flash('error','username already exists')
            res.redirect('/auth/signup')
        }
        else{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                // res.status(400).json({errors: errors.array})
                req.flash('validationErrors', errors.errors)
                res.redirect('/auth/signup')
            }
            
            // console.log(err);
            // res.send(err);
        }
    })
}

//HTTP GET - Signin - to load signin form 
exports.auth_signin_get = (req, res) => {
    res.render('auth/signin')
}
// HTTP POST - Signin - to post the data
exports.auth_signin_post = 
  passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/signin",
      failureFlash: 'Invalid username or password',
      successFlash: 'Login successful!',
  })
// HTTP GET - Logout - to logout user

exports.auth_logout_get = (req,res) => {
    req.logout()
    req.flash('success', "You are logged out")
    res.redirect('/auth/signin')
}