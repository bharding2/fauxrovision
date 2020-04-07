module.exports = {
  broadcast: (message, users, socket) => {
    users.forEach((user) => {
      if (user.ws != socket) {
        user.ws.send(JSON.stringify(message));
      }
    });
  },
  sendToUser: (message, socket) => {
    socket.send(JSON.stringify(message));
  },
}