import { io } from 'socket.io-client';

class SocketioService {
  socket;
  username;
  roomCode;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.username = 'Anonymous';
    this.socket.on('connection', () => {
      console.log('Connected to socket.io server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket.io server');
    });

    this.socket.on('room-created-code', (data) => {
        this.roomCode = data;
        console.log('room-created-code: ', this.roomCode);
    });
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
}

export default new SocketioService();