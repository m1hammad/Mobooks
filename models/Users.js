const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [2, "First name must be more than 2 characters"],
        maxlength: [99, 'Dude, STOP!!!'],
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "First name must be more than 2 characters"],
        maxlength: [99, 'Dude, STOP!!!'],
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6,"Password must be atleast 6 characters"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    book: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }],
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
},
{
    timestamps: true,
}
)

userSchema.methods.verifyPassword = function(password){
    console.log(password)
    console.log(this)
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)