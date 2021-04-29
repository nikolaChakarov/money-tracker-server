const express = require('express');
const configExpress = require('./config/express');
const configMongoose = require('./config/mongoose');

const config = require('./config');

const app = express();

configExpress(app);
const db = configMongoose();

db.then(() => {
    app.listen(config.PORT, () => {
        console.log(`App is listening at port ${config.PORT}`);
    });
}).catch(err => {
    console.log(err);
});


