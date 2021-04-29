const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

});

const transaction = mongoose.model('transaction', TransactionSchema);

module.exports = transaction;