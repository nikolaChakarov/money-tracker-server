const mongoose = require('mongoose');
const config = require('../config');

const configMongoose = () => {

    return mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('DB connected');
        })
        .catch(err => {
            console.log(err);
        });

}

module.exports = configMongoose;