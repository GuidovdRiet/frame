const { Sensor, Board } = require('johnny-five');
const io = require('socket.io-client')('http://45.77.159.108:7777');
const throttle = require('lodash/throttle');

const insertData = require('../services/sensorDataService/insertData');

io.on('GSR', async ({ value }) => {
    await insertData('GSR', value);
    console.log('inserted GSR value', value);
});

io.on('pulse', async ({ value }) => {
    await insertData('pulse', value);
    console.log('inserted pulse value', value);
});

new Board().on('ready', () => {
    const gsrLeftSensor = new Sensor({ pin: 'A5', freq: 25 });
    const gsrRightSensor = new Sensor({ pin: 'A4', freq: 25 });

    gsrLeftSensor.on(
        'change',
        throttle(() => {
            io.emit('rightData', {
                data: gsrLeftSensor.value
            });
        }, 2500)
    );

    gsrRightSensor.on(
        'change',
        throttle(() => {
            io.emit('leftData', {
                data: gsrRightSensor.value
            });
        }, 2500)
    );
});
