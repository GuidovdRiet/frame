const schedule = require('node-schedule');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const SensorData = mongoose.model('SensorData');
const retrievePosts = require('./retrievePosts');

const rule = new schedule.RecurrenceRule();
rule.second = 1;

const job = schedule.scheduleJob(rule, async () => {
    console.log('running job...');
    console.log('');
    const users = await User.find();
    await Promise.all([
        users.forEach(async user => {
            const sensorData = await SensorData.find({ userId: user.index });
            if (sensorData.length > 0) {
                const gsrData = sensorData.filter(d => d.type === 'GSR');
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

                //post random posts
                const gsrMessage = retrievePosts('GSR', gsrMedior, user.name);
                const pulseMessage = retrievePosts(
                    'Pulse',
                    pulseMedior,
                    user.name
                );

                const gsrPost = new Post({
                    title: 'How I feel today',
                    body: gsrMessage,
                    author: user._id,
                    created: Date.now()
                });

                const pulsePost = new Post({
                    title: 'How I feel today',
                    body: pulseMessage,
                    author: user._id,
                    created: Date.now()
                });

                await gsrPost.save();
                await pulsePost.save();
            }
        })
    ]);
});
