module.exports = {
  broadcast: (data, users, ws) => {
    users.forEach((user) => {
      if (user.ws != ws) {
        user.ws.send(JSON.stringify(data));
      }
    });
  },
  sendToUser: (message, ws) => {
    ws.send(JSON.stringify(message));
  },
}