const mongoose = require('mongoose')

mongoose.connect(process.env.mongoDB_URL);
const db = mongoose.connection

db.on('connected', () => console.log(`Connected to MongoDB at ${db.port}`))