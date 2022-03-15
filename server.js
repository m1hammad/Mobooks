// Dependencies
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const express = require('express')
require('dotenv').config();

require('./config/database')



// Port Configuration
const PORT = process.env.PORT;

// Initialize Express Application
const app = express();

// set the view engine
app.set('view engine', 'ejs')

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

// Import routes
const indexRoute = require('./routes/index')
const bookIndex = require('./routes/bookList')
const apiRoute = require('./routes/api')
 

// Mouent routes
app.use('/',indexRoute)
app.use('/books',bookIndex)
app.use('/api', apiRoute)

// connect to port
app.listen(PORT, () => console.log(`listening to port: ${PORT}`))
