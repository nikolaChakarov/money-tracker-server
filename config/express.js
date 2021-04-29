const express = require('express');
const router = require('../router');
const cors = require('../middleware/cors');

const configExpress = (app) => {

    app.use(cors);

    app.use(express.json());

    app.use(router);

}

module.exports = configExpress;