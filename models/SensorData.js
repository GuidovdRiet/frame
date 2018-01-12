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
        type: Number
    }
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
