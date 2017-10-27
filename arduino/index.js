const mongoose = require('mongoose');
const Data = mongoose.model('Data');
const { Sensor, Board } = require('johnny-five');
const { io } = require('../setup');
const throttle = require('lodash/throttle');
const board = new Board();

board.on('ready', () => {
    const pulseSensor = new Sensor({ pin: 'A0', freq: 10 });
    const gsrSensor = new Sensor({ pin: 'A5', freq: 25 });
    // const gsrRightSensor = new Sensor({ pin: 'A4', freq: 25 });

    pulseSensor.scale([0, 100]).on('change', throttle(function() {}, 2000));

    gsrSensor.scale([0, 100]).on(
        'change',
        throttle(async value => {
            // const data = new Data({ type: 'GSR', value });
            // await data.save();
        }, 5000)
    );
});
