const mongoose = require('mongoose');
const SensorData = mongoose.model('SensorData');

const insertData = async (param, value, userId) => {
    await new SensorData({
        type: param,
        value: parseInt(value, 10),
        user: userId
    }).save();
};

const fetchData = async (userId = null) => {};

module.exports = { insertData, fetchData };
