const mongoose = require('mongoose')

const ShoppingListItemSchema = mongoose.Schema({
    _id: {
        required: false,
        type: String,
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    checked: {
        type: Boolean,
        required: true
    },
    shoppingListId: {
        type: String,
        required: true
    }
})

const ShoppingListItem = mongoose.model('ShoppingListItem', ShoppingListItemSchema);

module.exports = ShoppingListItem