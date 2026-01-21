import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io.connect('http://localhost:5000');

const Chat = ({ workspaceId }) => {
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (workspaceId) {
      socket.emit('join_workspace', workspaceId);
    }

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, [workspaceId]);

const sendMessage = (e) => {
  e.preventDefault();
  
  // Safety check: Don't send if user isn't loaded or message is empty
  if (!user || !user.username) {
    return alert("Please wait for user profile to load.");
  }
  if (!message.trim()) return; 

  const messageData = { 
    text: message,         // FIXED: Changed from newMessage to message
    sender: user.username, 
    workspaceId: workspaceId,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
  };
  
  socket.emit('send_message', messageData);
  setMessage("");         // FIXED: Changed from setNewMessage to setMessage
};

  return (
    <div className="flex flex-col h-[500px] bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === user.username ? 'items-end' : 'items-start'}`}>
            <span className="text-xs text-gray-400">{msg.sender} • {msg.time}</span>
            <div className={`mt-1 p-2 rounded-lg ${msg.sender === user.username ? 'bg-blue-600' : 'bg-gray-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700 flex gap-2">
        <input 
          type="text" value={message}
          className="flex-1 bg-gray-700 rounded p-2 outline-none focus:ring-1 ring-blue-500"
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded font-bold">Send</button>
      </form>
    </div>
  );
};

export default Chat;