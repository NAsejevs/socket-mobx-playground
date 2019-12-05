import io from 'socket.io-client';
const serverIp = "http://localhost:3001";

const socket = io(serverIp, {
    autoConnect: false,
});

export default socket;
