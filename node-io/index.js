const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>C\'est juste le serveur Socket bro.</h1>');
});

io.on('connection', (socket) => {
  console.log('A user connected, socketId: ' + socket.id);
  socket.on('disconnect', () => {
    console.log('A user disconnected, socketId' + socket.id);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});