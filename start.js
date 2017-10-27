const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import env variables from variables.env
dotenv.config({ path: 'variables.env' });

// connect to db
mongoose.connect(process.env.DATABASE, {
    useMongoClient: true
});
mongoose.connection.on('error', err => {
    console.log(`🚫 🚫 🚫 → ${err.message}`);
});

require('./models/Post');
require('./models/Data');
require('./arduino');
