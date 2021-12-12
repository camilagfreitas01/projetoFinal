const mongoose =  require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)