module.exports = {
  findRoomWithId: (id, rooms) => {
    return rooms.find((room) => {
      return room.roomId === id;
    });
  },
};