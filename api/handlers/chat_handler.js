const messageUtils = require('../utils/message_utils');
const roomUtils = require('../utils/room_utils');

module.exports = (message, socket, rooms) => {
  let room = roomUtils.findRoomWithId(message.roomId, rooms);

  if (room) {
    messageUtils.broadcast(message, room.users, socket);
  }
};