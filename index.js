var express = require('express');
var socketio = require('socket.io');

//set up express app
app = express();

//static files
app.use(express.static('public'));
//template engine
app.set('view engine', 'pug');

var path = require('path');
app.use("/public", express.static(path.join(__dirname, 'public')));

//start the server
var server = app.listen(7878, function(){
    console.log('listening on port 7878');
});

//setup and pass server to socket
io = socketio(server);
io.on('connection', (socket) => {
    console.log(socket.id);
});

app.get('/', function(req, res){
    res.render('homepage');
});

