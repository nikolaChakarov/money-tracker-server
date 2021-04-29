const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        min: [3, 'Username is 3 characters long or more']
    },
    password: {
        type: String,
        required: true,
        min: [3, 'Password is 3 characters long or more']
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction'
    }]

});

const User = mongoose.model('user', userSchema);

module.exports = User;