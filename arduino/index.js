const { Sensor, Board } = require('johnny-five');
const io = require('socket.io-client')('http://45.77.159.108:7777');
const throttle = require('lodash/throttle');

const { insertData } = require('../services/sensorDataService');

var rate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
sampleCounter = 0,
lastBeatTime = 0,
P = 512,
T = 512,
thresh = 525,
amp = 100,
firstBeat = true,
secondBeat = false,
IBI = 600,
Pulse = false,
BPM,
Signal,
QS = false;

module.exports = sessionUserId => {
    io.on('data', async ({ type, value, userId }) => {
        console.log('received data, inserting..', type, value, userId)
        await insertData(
            String(type),
            parseInt(value, 10),
            parseInt(userId, 10)
        );
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
            }, 15000)
        );

        gsrRightSensor.on(
            'change',
            throttle(() => {
                io.emit('data', {
                    type: 'GSR',
                    value: gsrRightSensor.value,
                    userId: sessionUserId
                });
            }, 10000)
        );

        var sensor = new Sensor({
            pin: 'A0',
            freq: 2
        });
    
        sensor.scale([0, 1024]).on('change', function() {
            Signal = this.scaled;
            calculate_bpm();
    
            if (QS === true) {
                console.log('EMITTING PULSE', BPM)
                io.emit('data', {
                    type: 'Pulse',
                    value: BPM,
                    userId: sessionUserId
                });
                QS = false;
            }
        });
    });

    function calculate_bpm() {
        // console.log('searching for pulse');
        sampleCounter += 2;
        N = sampleCounter - lastBeatTime;
    
        if (Signal < thresh && N > IBI / 5 * 3) {
            if (Signal < T) {
                T = Signal;
            }
        }
    
        if (Signal > thresh && Signal > P) {
            P = Signal;
        }
    
        if (Signal < thresh && Pulse === true) {
            Pulse = false;
            amp = P - T;
            thresh = amp / 2 + T;
            P = thresh;
            T = thresh;
        }
    
        if (N > 2500) {
            thresh = 512;
            P = 512;
            T = 512;
            lastBeatTime = sampleCounter;
            firstBeat = true;
            secondBeat = false;
        }
    
        if (N > 250) {
            // if((Pulse === false)){
            if (Signal > thresh && Pulse === false && N > IBI / 5 * 3) {
                Pulse = true;
                IBI = sampleCounter - lastBeatTime;
    
                lastBeatTime = sampleCounter;
    
                if (secondBeat) {
                    secondBeat = false;
                    for (var i = 0; i <= 9; i++) {
                        rate[i] = IBI;
                    }
                }
    
                if (firstBeat) {
                    firstBeat = false;
                    secondBeat = true;
                    return;
                }
    
                var runningTotal = 0;
    
                for (var i = 0; i <= 8; i++) {
                    rate[i] = rate[i + 1];
                    runningTotal += rate[i];
                    console.log(runningTotal);
                }
    
                rate[9] = IBI;
                runningTotal += rate[9];
                runningTotal /= 10;
                // console.log(runningTotal);
                BPM = 60000 / runningTotal;
                QS = true;
            }
        }
    }
}


