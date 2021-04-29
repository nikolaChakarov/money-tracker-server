const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

const isAuth = require('../middleware/isAuth');

// GET all transactions
// private
router.get('/', isAuth, async (req, res) => {

    try {
        const transactions = await Transaction.find();
        res.send(transactions);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }

});

// GET transaction by ID
// private
router.get('/:_id', isAuth, async (req, res) => {
    const _id = req.params._id;

    try {
        const transaction = await Transaction.findOne({ _id });
        res.send(transaction);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }

});

// DELETE transaction by ID
// private
router.delete('/:_id', isAuth, async (req, res) => {
    const _id = req.params._id;

    try {
        const transaction = await Transaction.findOneAndDelete({ _id });
        res.send(transaction);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }

});

// POST create transaction
// private
router.post('/', isAuth, [
    check('name', 'Please enter transaction name').not().isEmpty()
], async (req, res) => {

    const { name, amount } = req.body;

    try {
        const transaction = new Transaction({ name, amount });
        await transaction.save();
        res.send(transaction);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }

})

module.exports = router;