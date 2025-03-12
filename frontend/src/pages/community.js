import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';

const Community = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch rooms
    socket.on('update rooms', (rooms) => {
      setRooms(rooms);
    });

    // Receive messages
    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('update rooms');
      socket.off('chat message');
    };
  }, []);

  const joinRoom = (roomName) => {
    socket.emit('join room', roomName);
    setCurrentRoom(roomName);
    setMessages([]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && currentRoom) {
      socket.emit('chat message', { roomId: currentRoom, msg: message });
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Community Hub</h2>
      <div className="mb-4">
        <button
          onClick={() => {
            const roomName = prompt('Enter a name for the new room:');
            if (roomName) socket.emit('create room', roomName);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Room
        </button>
        <select
          onChange={(e) => joinRoom(e.target.value)}
          className="border p-2 ml-4"
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <div className="chat-box border p-4 h-64 overflow-y-scroll mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2">
            {msg}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow border p-2"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default Community;