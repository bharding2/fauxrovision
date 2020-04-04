const messageUtils = require('../utils/message_utils');
const roomUtils = require('../utils/room_utils');

module.exports = (data, ws, rooms) => {
  if (data.action === 'assign') {
    assignControlAction(data, ws, rooms);
  }
}

const assignControlAction = (data, ws, rooms) => {
  let room = roomUtils.findRoomWithId(data.roomId, rooms);

  if (room) {
    room.users.forEach((user) => {
      if (user.username === data.toUsername) {
          user.haveControl = true;

          user.ws.send(JSON.stringify({
            event: 'control', 
            action: 'youhavecontrol', 
            youHaveControl: user.haveControl,
          }));
      } else if (data.username == user.username) {
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
        username: data.toUsername,
      }, ws);
    });
  }
};