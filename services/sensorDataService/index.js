const mongoose = require('mongoose');
const SensorData = mongoose.model('SensorData');

const insertData = async (param, value, userIndex) =>
    new SensorData({
        type: param,
        value: parseInt(value, 10),
        userId: userIndex
    }).save();

const fetchData = (index = 1) => SensorData.find({ userId: index });

module.exports = { insertData, fetchData };
