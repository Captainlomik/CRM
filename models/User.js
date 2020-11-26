const moonguse = require('mongoose')
const Schema = moonguse.Schema

const userSchema = new Schema({
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

module.exports = moonguse.model('users', userSchema)

