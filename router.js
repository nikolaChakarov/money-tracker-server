const router = require('express').Router();

const users = require('./services/users');
const transactions = require('./services/tarnsactions');

router.use('/api/users', users);
router.use('/api/transactions', transactions);


module.exports = router;