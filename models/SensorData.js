const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sensorDataSchema = new mongoose.Schema({
    pulse: {
        type: Number
    },
    GSR: {
        type: Number
    }
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
