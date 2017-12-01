const mongoose = require('mongoose');
const SensorData = mongoose.model('SensorData');

const insertData = async (param, value) => {
    await new SensorData({
        type: param,
        value
    }).save();
};

module.exports = insertData;
