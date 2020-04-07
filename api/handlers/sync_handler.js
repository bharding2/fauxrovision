const messageUtils = require('../utils/message_utils');

module.exports = (message, socket, rooms) => {
  rooms.forEach((room) => {
    room.users.forEach((user) => {
      if (user.socket == socket) {
        messageUtils.broadcast(message, room.users, socket);
      }
    });
  });
};