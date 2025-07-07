import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../api/socket';
import customAxios from '../api/customAxios';

function Chat() {
  const { postId, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const currentId = localStorage.getItem('userId');
  const roomId = `${postId}-${[currentId, receiverId].sort().join('-')}`;
  const bottomRef = useRef(null);

  useEffect(() => {
    const messageHistory = async () => {
      try {
        const res = await customAxios.get(`/messages/${postId}/${receiverId}`);
        setHistory(res.data.findChat || []);
      } catch (err) {
        console.log('error: ', err);
      }
    };

    messageHistory();
  }, [postId,receiverId]);

  useEffect(() => {
    socket.emit('join-room', roomId);

    socket.on('receive-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receive-message');
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, history]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const message = {
      senderId: currentId,
      roomId,
      text,
      postId,
      receiverId,
    };

    socket.emit('send-message', message);
    setMessages((prev) => [...prev, message]);
    setText('');
  };

  return (
    <div className="flex flex-col h-screen px-4 py-6 bg-gray-50">
      <h1 className="text-xl font-semibold mb-4">Chat</h1>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 bg-white p-4 rounded shadow">
        {history.map((msg, i) => (
          <div
            key={`history-${i}`}
            className={`max-w-xs p-2 rounded ${
              msg.senderId === currentId
                ? 'ml-auto bg-blue-100 text-right'
                : 'mr-auto bg-gray-200 text-left'
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}

        {messages.map((msg, i) => (
          <div
            key={`new-${i}`}
            className={`max-w-xs p-2 rounded ${
              msg.senderId === currentId
                ? 'ml-auto bg-blue-100 text-right'
                : 'mr-auto bg-gray-200 text-left'
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
