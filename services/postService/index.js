const schedule = require('node-schedule');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const SensorData = mongoose.model('SensorData');

const rule = new schedule.RecurrenceRule();
rule.second = 1;

const job = schedule.scheduleJob(rule, async () => {
    const users = await User.find();
    users.forEach(async user => {
        const sensorData = await SensorData.find({ user: user.index });

        const gsrData = sensorData.filter(d => {
            console.log(d.user, user.index);
            d.type === 'GSR';
        });
        const gsrTotal = gsrData.reduce(
            (accumulator, data) => accumulator + data.value,
            0
        );
        const gsrMedior = gsrTotal / gsrData.length;

        const pulseData = sensorData.filter(d => d.type === 'Pulse');
        const pulseTotal = pulseData.reduce(
            (accumulator, data) => accumulator + data.value,
            0
        );
        const pulseMedior = pulseTotal / pulseData.length;

        // console.log(gsrTotal, user.email);
    });
});
