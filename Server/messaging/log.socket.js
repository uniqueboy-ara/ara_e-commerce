module.exports = (io, socket) => {
    console.log('--[log.socket] IS ONLINE');
    socket.on('add', data => {
        //Do some work
        io.emit('new-log', 'Added');
    });
}

