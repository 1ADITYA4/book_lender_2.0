const setupSocketEvents = (io) => {
    const rooms = new Map();
  
    io.on('connection', (socket) => {
      console.log('New client connected');
  
      socket.on('join room', (roomId) => {
        socket.join(roomId);
        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(socket.id);
      });
  
      socket.on('leave room', (roomId) => {
        socket.leave(roomId);
        if (rooms.has(roomId)) {
          rooms.get(roomId).delete(socket.id);
          if (rooms.get(roomId).size === 0) {
            rooms.delete(roomId);
          }
        }
      });
  
      socket.on('chat message', ({ roomId, msg }) => {
        io.to(roomId).emit('chat message', msg);
      });
  
      socket.on('disconnect', () => {
        rooms.forEach((clients, roomId) => {
          if (clients.has(socket.id)) {
            clients.delete(socket.id);
            if (clients.size === 0) {
              rooms.delete(roomId);
            }
          }
        });
        console.log('Client disconnected');
      });
    });
  };
  
  module.exports = { setupSocketEvents };
