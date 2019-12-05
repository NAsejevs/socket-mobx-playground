var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const messages = ["this is the first test message", "this is the second test message"];

io.on('connection', (socket) => {
    socket.emit("messages", messages);

    socket.on("message", (message) => {
        messages.push(message);
        io.emit("messages", messages);
    });

    setTimeout(() => {
        socket.disconnect();
    }, 3000);
});
  
http.listen(3001, () => {
    console.log('listening on localhost:3001');
});
