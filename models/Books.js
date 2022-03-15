const mongoose = require('mongoose')
const booksSchema = mongoose.Schema({
    title: String,
    genre: Array,
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }],
    publisher: String,
    publishDate: String,
    description: String,
    imageLink: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    viewCount: {
        type: Number,
        min: 0,
        default: 0,
    },
    ratingCount: {
        type: Number,
        min: 0,
        default: 0,
    },
    averageRating: {
        type: Number
    }
})

module.exports = mongoose.model('Books', booksSchema);
