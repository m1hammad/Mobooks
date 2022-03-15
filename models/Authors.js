const mongoose = require('mongoose')
const authorsSchema = mongoose.Schema({
    name: String,
    book: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }],
})

module.exports = mongoose.model('Author', authorsSchema)