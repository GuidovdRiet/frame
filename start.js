const dotenv = require('dotenv');
const mongoose = require('mongoose');
const io = require('socket.io');

// Import env variables from variables.env
dotenv.config({ path: 'variables.env' });

// connect to db
mongoose.connect(process.env.DATABASE, {
    useMongoClient: true
});
mongoose.connection.on('error', err => {
    console.log(`🚫 🚫 🚫 → ${err.message}`);
});

// Import Models here
require('./models/Post');

// Start server
require('./arduino');
require('./setup');
