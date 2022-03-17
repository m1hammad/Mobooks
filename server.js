// Dependencies
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const express = require('express')
require('dotenv').config();
const flash = require('connect-flash')

require('./config/database')



// Port Configuration
const PORT = process.env.PORT || 4000;

// Initialize Express Application
const app = express();

// set the view engine
app.set('view engine', 'ejs')

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

let session = require('express-session');
let passport = require('./helper/ppConfig');

app.use(session({
    secret: process.env.secret,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 360000}
  }))
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(flash())
  
  
  // Sharing the information with all pages.
  app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next()
  })

// Import routes
const indexRoute = require('./routes/index')
const bookIndex = require('./routes/bookList')
const apiRoute = require('./routes/api')
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')

// Mouent routes
app.use('/',indexRoute)
app.use('/books',bookIndex)
app.use('/api', apiRoute)
app.use("/auth", authRoute)
app.use('/profile', profileRoute)

// connect to port
app.listen(PORT, () => console.log(`listening to port: ${PORT}`))
