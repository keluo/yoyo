var express = require('express');
var app = express();
var port = process.env.PORT || 6088;


app.use(express.static(__dirname + '/static'));

app.use(function (req, res) {
  res.sendfile('./static/index.html')
})

var io = require('socket.io').listen(app.listen(port))


var messages = []

io.sockets.on('connection', function (socket) {
  socket.on('messages.read', function () {
    socket.emit('messages.read', messages)
  })
  socket.on('messages.create', function (message) {
    messages.push(message)
    io.sockets.emit('messages.add', message)
  })
})


console.log('yoyo is on port ' + port + '!');