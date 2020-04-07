module.exports = {
  broadcast: (message, users, socket) => {
    users.forEach((user) => {
      if (user.socket != socket) {
        user.socket.send(JSON.stringify(message));
      }
    });
  },
  sendToUser: (message, socket) => {
    socket.send(JSON.stringify(message));
  },
}