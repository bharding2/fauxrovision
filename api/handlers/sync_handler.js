const messageUtils = require('../utils/message_utils');

module.exports = (data, ws, rooms) => {
  rooms.forEach((room) => {
    room.users.forEach((user) => {
      if(user.ws == ws) {
        messageUtils.broadcast(data, room.users, ws);
      }
    });
  });
};