const app = require('./app');
const io = require('socket.io');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
io.listen(server);

module.exports = { app, io };
