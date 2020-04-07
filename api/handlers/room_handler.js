const messageUtils = require('../utils/message_utils');
const roomUtils = require('../utils/room_utils');

module.exports = (message, socket, rooms) => {
  let action = message.action;

  if (action === 'create') {
    createRoom(message, socket, rooms);
  } else if (action === 'join') {
    joinRoom(message, socket, rooms);
  } else if (action === 'leave') {
    leaveRoom(message, socket, rooms);
  }
};

const createRoom = (message, socket, rooms) => {
  rooms.push({
    roomId: message.roomId, 
    users: [{
      username: message.username, 
      ws: socket, 
      haveControl: true,
    }],
  });

  socket.send(JSON.stringify({
    event: 'control', 
    action: 'youhavecontrol', 
    youHaveControl: true,
  }));
};

const joinRoom = (message, socket, rooms) => {
  let room = roomUtils.findRoomWithId(message.roomId, rooms);

  if (room) {
    room.users.push({
      username: message.username, 
      ws: socket, 
      haveControl: false,
    });

    notifyUsers(message, socket, room.users);
  } else {
    createRoom(message, socket);
  }
};

const leaveRoom = (message, socket) => {
  let users;

  rooms.forEach(room => {
    room.users.forEach((user, index, object) => {
      if (user.ws == socket) {
        users = room.users;
        object.splice(index, 1);
      } else {
        messageUtils.broadcast({
          event: 'online',
          action: 'left',
          username: message.username
        }, room.users, socket);
      }
    })
  })
};

const notifyUsers = (message, socket, users) => {
  messageUtils.broadcast({      
    event: 'online',
    action: 'joined',
    users: {
      username: message.username, 
      haveControl: false
    }
  }, users, socket)

  const usersPyload = [];

  users.forEach((user) => {
    if (user.ws != socket) {
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
  }, socket);
}