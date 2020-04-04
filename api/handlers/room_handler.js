const messageUtils = require('../utils/message_utils');
const roomUtils = require('../utils/room_utils');

module.exports = (data, ws, rooms) => {
  let action = data.action;

  if (action === 'create') {
    createRoom(data, ws, rooms);
  } else if (action === 'join') {
    joinRoom(data, ws, rooms);
  } else if (action === 'leave') {
    leaveRoom(data, ws, rooms);
  }
};

const createRoom = (data, ws, rooms) => {
  rooms.push({
    roomId: data.roomId, 
    users: [{
      username: data.username, 
      ws: ws, 
      haveControl: true,
    }],
  });

  ws.send(JSON.stringify({
    event: 'control', 
    action: 'youhavecontrol', 
    youHaveControl: true,
  }));
};

const joinRoom = (data, ws, rooms) => {
  let room = roomUtils.findRoomWithId(data.roomId, rooms);

  if (room) {
    room.users.push({
      username: data.username, 
      ws: ws, 
      haveControl: false,
    });

    notifyUsers(data, ws, room.users);
  } else {
    createRoom(data, ws);
  }
};

const leaveRoom = (data, ws) => {
  let users;

  rooms.forEach(room => {
    room.users.forEach((user, index, object) => {
      if (user.ws == ws) {
        users = room.users;
        object.splice(index, 1);
      } else {
        messageUtils.broadcast({
          event: 'online',
          action: 'left',
          username: data.username
        }, room.users, ws);
      }
    })
  })
};

const notifyUsers = (data, ws, users) => {
  messageUtils.broadcast({      
    event: 'online',
    action: 'joined',
    users: {
      username: data.username, 
      haveControl: false
    }
  }, users, ws)

  const usersPyload = [];

  users.forEach((user) => {
    if (user.ws != ws) {
      usersPyload.push({
        username: user.username, 
        haveControl: user.haveControl,
      });
    }
  });

  messageUtils.sendToUser({      
    event: 'online',
    action: 'alreadyjoined',
    haveControl: false,
    users: usersPyload,
  }, ws);
}