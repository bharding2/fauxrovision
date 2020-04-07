const messageUtils = require('../utils/message_utils');
const roomUtils = require('../utils/room_utils');

module.exports = (message, socket, rooms) => {
  if (message.action === 'assign') {
    assignControlAction(message, socket, rooms);
  }
}

const assignControlAction = (message, socket, rooms) => {
  let room = roomUtils.findRoomWithId(message.roomId, rooms);

  if (room) {
    room.users.forEach((user) => {
      if (user.username === message.toUsername) {
          user.haveControl = true;

          user.socket.send(JSON.stringify({
            event: 'control', 
            action: 'youhavecontrol', 
            youHaveControl: user.haveControl,
          }));
      } else if (message.username == user.username) {
        user.haveControl = false;

        user.ws.send(JSON.stringify({
          event: 'control', 
          action: 'youhavecontrol', 
          youHaveControl: user.haveControl,
        }));
      }

      messageUtils.sendToUser({
        event: 'online',
        action: 'newcontroller',
        username: message.toUsername,
      }, socket);
    });
  }
};