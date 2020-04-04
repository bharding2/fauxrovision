const messageUtils = require('../utils/message_utils');
const roomUtils = require('../utils/room_utils');

module.exports = (data, ws, rooms) => {
  let room = roomUtils.findRoomWithId(data.roomId, rooms);

  if (room) {
    messageUtils.broadcast(data, room.users, ws);
  }
};