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

// Import Models here
require('./models/Post');

// Start server
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
