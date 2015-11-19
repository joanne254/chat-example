var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// 'io' is the client side
// 'socket' is a channel transporting events/communications
io.on('connection', function(socket){
	console.log('A user just connected.');

	// Emit to sender only
	socket.emit('chat_message', 'Oh, hi there!');

	socket.on('chat_message', function(msg){
		console.log('Message: ' + msg);

		// Emit to all clients
		io.emit('chat_message', msg);
	});

	socket.on('disconnect', function(){
		console.log('User just disconnected.');
	});
});

http.listen(5000, function(){
	console.log('Listening on *:5000');
});
