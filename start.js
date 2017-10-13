const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

// Import env variables from variables.env
dotenv.config({ path: 'variables.env' });

// connect to db
mongoose.connect(process.env.DATABASE, {
    useMongoClient: true
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
    console.log(`🚫 🚫 🚫 → ${err.message}`);
});

// Import Models here

// Start server
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
