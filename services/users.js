const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// REGISTER
// POST /api/users
// public

router.post('/register', [
    check('username').custom((username) => {
        if (username.length < 3) {
            throw ('Please provide username 3 characters long or more')
        }
        return true;
    }),
    check('password').custom((password) => {
        if (password.length < 3) {
            throw ('Please provide password 3 characters long or more')
        }
        return true;
    }),
    check('password2').custom((password2, { req }) => {
        if (password2 !== req.body.password) {
            throw ('Password is not the same')
        }
        return true;
    }),

], async (req, res) => {

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        res.status(400).json({ msg: validation.errors.map(el => el.msg) });
        return;
    }

    try {

        const { username, password } = req.body;

        let currentUser = await User.findOne({ username });

        if (currentUser) {
            throw ('Username already exists');
        }

        const encrypted = await bcrypt.hash(password, config.SALT);

        currentUser = new User({ username, password: encrypted });
        await currentUser.save();

        jwt.sign({
            user: {
                id: currentUser.id
            }
        },
            config.SECRET,
            { expiresIn: 36000 },
            (err, token) => {
                if (err) {
                    throw (err);
                }
                res.json({ token })
            }
        )


    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err });
    }

});

// LOGIN
// POST /api/users/login
// public

router.post('/login', [

    check('username', 'Please enter username 3 characters long or more').isLength({ min: 3 }),
    check('password', 'Please enter password 3 characters long or more').isLength({ min: 3 })

], async (req, res) => {

    const { username, password } = req.body;

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        res.status(400).json({ msg: validation.errors.map(el => el.msg) });
        return;
    }

    try {

        const currentUser = await User.findOne({ username });

        if (!currentUser) {
            throw ('invalid credentials');
        }

        const isPassOk = await bcrypt.compare(password, currentUser.password);

        if (!isPassOk) {
            throw ('invalid credentials');
        }

        jwt.sign({
            user: {
                id: currentUser.id
            }
        },
            config.SECRET,
            { expiresIn: 36000 },
            (err, token) => {
                if (err) {
                    throw (err);
                }
                res.status(200).json({ token })
            }
        )


    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err })
    }

});

module.exports = router;