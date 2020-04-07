const roomHandler = require('./room_handler');
const syncHandler = require('./sync_handler');
const chatHandler = require('./chat_handler');
const controlHandler = require('./control_handler');

module.exports = (message, socket, rooms) => {
  let event = message.event;

  if (event === 'room') {
    roomHandler(message, socket, rooms);
  } else if (event === 'sync') {
    syncHandler(message, socket, rooms);
  } else if (event === 'chat') {
    chatHandler(message, socket, rooms);
  } else if (event === 'control') {
    controlHandler(message, socket, rooms);
  }
}