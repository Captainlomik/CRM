const moonguse = require('mongoose')
const Schema = moonguse.Schema

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    order: {
        type: Number,
        required: true
    },
    list: [{
        name: {
            type: String
        },
        quantity: {
            type: Number
        },
        cost: {
            type: Number
        }
    }],
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = moonguse.model('orders', orderSchema)