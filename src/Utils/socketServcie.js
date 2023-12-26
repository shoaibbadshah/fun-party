import io from 'socket.io-client';

const SOCKET_URL = 'https://apis.shareslate.fun';
// const SOCKET_URL =
//   'https://1b34-2407-d000-a-820b-ce0a-e039-f9ed-134.ngrok-free.app';

class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });
      // console.log("initializing socket", this.socket)

      this.socket.emit('connection', (data) => {
        console.log('=== socket connected ====', data);
      });

      this.socket.on('disconnect', (data) => {
        console.log('=== socket disconnected ====');
      });

      this.socket.on('error', (data) => {
        console.log('socekt error', data);
      });
    } catch (error) {
      console.log('scoket is not inialized', error);
    }
  };

  emit(event, data = {}) {
    this.socket.emit(event, data);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }

  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }
}

const socketServcies = new WSService();

export default socketServcies;
