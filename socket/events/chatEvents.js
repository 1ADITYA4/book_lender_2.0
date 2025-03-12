const setupChatEvents = (io) => {
    const rooms = new Map();
  
    io.on('connection', (socket) => {
      console.log('New client connected');
  
      // Create a new room
      socket.on('create room', (roomName) => {
        if (!rooms.has(roomName)) {
          rooms.set(roomName, new Set());
          io.emit('update rooms', Array.from(rooms.keys()));
        }
      });
  
      // Join a room
      socket.on('join room', (roomName) => {
        if (rooms.has(roomName)) {
          socket.join(roomName);
          rooms.get(roomName).add(socket.id);
        }
      });
  
      // Send a message to a room
      socket.on('chat message', ({ roomId, msg }) => {
        io.to(roomId).emit('chat message', msg);
      });
  
      // Handle disconnection
      socket.on('disconnect', () => {
        rooms.forEach((clients, roomId) => {
          if (clients.has(socket.id)) {
            clients.delete(socket.id);
            if (clients.size === 0) {
              rooms.delete(roomId);
              io.emit('update rooms', Array.from(rooms.keys()));
            }
          }
        });
        console.log('Client disconnected');
      });
    });
  };
  
  module.exports = setupChatEvents;