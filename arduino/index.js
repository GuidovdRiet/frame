const { Sensor, Board } = require('johnny-five');
const io = require('socket.io');
const throttle = require('lodash/throttle');
const board = new Board();

board.on('ready', () => {
    const pulseSensor = new Sensor({ pin: 'A0', freq: 10 });
    const gsrLeftSensor = new Sensor({ pin: 'A5', freq: 25 });
    const gsrRightSensor = new Sensor({ pin: 'A4', freq: 25 });

    pulseSensor.scale([0, 100]).on('change', throttle(function() {}, 5000));

    gsrLeftSensor.scale([0, 100]).on('change', function() {});

    gsrRightSensor.scale([0, 1024]).on('change', throttle(function() {}, 1000));
});
