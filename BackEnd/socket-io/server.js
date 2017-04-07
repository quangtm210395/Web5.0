const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

app.use(express.static('client'));

mongoose.connect('mongodb://localhost/web5');

var Message = mongoose.model('Message', {content: String});

server.listen(8080, function () {
  console.log('server running at 8080');
});

app.get('/allMsg', function(req, res) {
  Message.find().exec(function(err, msgs) {
    if (err) console.log(err);
    else {
      res.json(msgs);
    }
  });
});

io.on('connection', function (socket) {
  socket.broadcast.emit('news', 'new user had just connected!');
  
  socket.on('clientSend', function (msg) {
    var newMess = new Message({content: msg});
    newMess.save(function(err, data){
      if (err) console.log(err);
      else io.emit('serverSend', msg);
    });
    
  })
});