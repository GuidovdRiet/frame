const { Sensor, Board } = require('johnny-five');
const io = require('socket.io-client')('http://45.77.159.108:7777');
const throttle = require('lodash/throttle');

const { insertData } = require('../services/sensorDataService');

module.exports = sessionUserId => {
    io.on('data', async ({ type, value, userId }) => {
        await insertData(
            String(type),
            parseInt(value, 10),
            parseInt(userId, 10)
        );
        console.log('inserted value', type, value, userId);
    });

    new Board().on('ready', () => {
        const gsrLeftSensor = new Sensor({ pin: 'A5', freq: 25 });
        const gsrRightSensor = new Sensor({ pin: 'A4', freq: 25 });

        gsrLeftSensor.on(
            'change',
            throttle(() => {
                io.emit('data', {
                    type: 'GSR',
                    value: gsrLeftSensor.value,
                    userId: sessionUserId
                });
            }, 2500)
        );

        gsrRightSensor.on(
            'change',
            throttle(() => {
                io.emit('data', {
                    type: 'GSR',
                    value: gsrRightSensor.value,
                    userId: sessionUserId
                });
            }, 2500)
        );
    });
};
