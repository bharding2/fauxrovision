const express = require('express');
const http = require('http');
const WebSocket = require('ws').Server;
const messageHandler = require('./handlers/message_handler');

const server = http.createServer();
const app = express();
const port = process.env.PORT || 5555;
const wsServer = new WebSocket({server});

const rooms = [];

server.on('request', app);

wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(JSON.parse(message));

    messageHandler(JSON.parse(message), socket, rooms);
  });
});

server.listen(port, () => {
  console.log(`Listening on ${port}!`);
});
