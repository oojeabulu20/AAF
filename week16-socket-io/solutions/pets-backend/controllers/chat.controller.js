module.exports.respond = function(endpoint,socket){
    console.log("A user connected");

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    // registering a new event
    socket.on('SEND_MESSAGE', (msg) => {
        console.log('Server Received: ' + JSON.stringify(msg));
        endpoint.emit('MESSAGE',  msg);
    });
}