module.exports = {
  findRoomWithId: (id, rooms) => {
    let roomFound;

    rooms.forEach(room => {
      if(room.roomId === id) {
        roomFound = room;
      }
    });

    return roomFound;
  },
};