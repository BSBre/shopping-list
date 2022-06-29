const mongoose = require('mongoose')

const ShoppingListSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
})

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

module.exports = ShoppingList