const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    shoppingListId: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;