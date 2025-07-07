import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import customAxios from '../api/customAxios';

function PersonalChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchInbox = async () => {
      try {
        const res = await customAxios.get(`/inbox/${userId}`);
        setMessages(res.data);
        console.log('inbox loaded: ', res.data);
      } catch (err) {
        console.log('error: ', err);
      }
    };

    fetchInbox();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">New Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500">You have no conversations yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <Link
              to={`/chat/${message.postId}/${message.senderId}`}
              key={`${message.postId}-${message.senderId}-${index}`}
              className="block p-4 bg-white rounded shadow hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-blue-600">
                Conversation with: <span className="text-gray-800">anonymous</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Last message: {message.lastMessage}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonalChat;

