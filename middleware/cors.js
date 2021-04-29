const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000'
}

module.exports = cors(corsOptions);