const CREATED_ROOM = 'created-room';

const socketIO = require('socket.io');
var db = require('../db');

const init = (app, server) => {
  const io = socketIO(server);
  io.sockets.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message',  msg);
    });
  });
};

module.exports = {init: init};
