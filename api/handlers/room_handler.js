const messageUtils = require('../utils/message_utils');
const roomUtils = require('../utils/room_utils');

module.exports = (message, socket, rooms) => {
  if (message.action === 'create') {
    createRoom(message, socket, rooms);
  } else if (message.action === 'join') {
    joinRoom(message, socket, rooms);
  } else if (message.action === 'leave') {
    leaveRoom(message, socket, rooms);
  }
};

const createRoom = (message, socket, rooms) => {
  rooms.push({
    roomId: message.roomId, 
    users: [{
      username: message.username, 
      socket: socket, 
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
  const room = roomUtils.findRoomWithId(message.roomId, rooms);

  if (room) {
    room.users.push({
      username: message.username, 
      socket: socket, 
      haveControl: false,
    });

    notifyUsers(message, socket, room.users);
  } else {
    createRoom(message, socket);
  }
};

const leaveRoom = (message, socket, rooms) => {
  rooms.forEach(room => {
    room.users.forEach((user, index, arr) => {
      if (user.socket == socket) {
        arr.splice(index, 1);
      } else {
        messageUtils.broadcast({
          event: 'online',
          action: 'left',
          username: message.username
        }, room.users, socket);
      }
    });
  });
};

const notifyUsers = (message, socket, users) => {
  messageUtils.broadcast({      
    event: 'online',
    action: 'joined',
    users: {
      username: message.username, 
      haveControl: false
    }
  }, users, socket);

  const usersPayload = [];

  users.forEach((user) => {
    if (user.socket != socket) {
      usersPayload.push({
        username: user.username, 
        haveControl: user.haveControl,
      });
    }
  });

  messageUtils.sendToUser({      
    event: 'online',
    action: 'alreadyjoined',
    haveControl: false,
    users: usersPayload,
  }, socket);
}