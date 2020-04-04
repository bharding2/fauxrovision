const roomHandler = require('./room_handler');
const syncHandler = require('./sync_handler');
const chatHandler = require('./chat_handler');
const controlHandler = require('./control_handler');

module.exports = (data, ws, rooms) => {
  let event = data.event;

  if (event === 'room') {
    roomHandler(data, ws, rooms);
  } else if (event === 'sync') {
    syncHandler(data, ws, rooms);
  } else if (event === 'chat') {
    chatHandler(data, ws, rooms);
  } else if (event === 'control') {
    controlHandler(data, ws, rooms);
  }
}