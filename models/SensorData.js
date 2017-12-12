const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sensorDataSchema = new mongoose.Schema({
    type: {
        type: String
    },
    value: {
        type: Number
    },
    user: {
        //TEMP: omit Mongo objectId for test data
        // type: mongoose.Schema.ObjectId,
        // ref: 'User'
        type: Number
        // ref: 'User'
    }
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
