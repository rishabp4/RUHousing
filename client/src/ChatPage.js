// src/ChatPage.js
import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function ChatPage() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [chattingWith, setChattingWith] = useState(null);

  // Fetch logged-in user's UID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch other users
  useEffect(() => {
    if (!currentUserId) return;
    fetch('http://localhost:5002/api/all-users')
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data.filter((u) => u.uid !== currentUserId));
      });
  }, [currentUserId]);

  if (!currentUserId) return <p>Loading chat...</p>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h3 style={{ padding: '1rem', backgroundColor: '#990000', color: 'white' }}>Your Chats</h3>
        {allUsers.map((user) => (
          <div
            key={user.uid}
            onClick={() => setChattingWith(user)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: chattingWith?.uid === user.uid ? '#f0f0f0' : 'white',
              borderBottom: '1px solid #ddd'
            }}
          >
            {user.firstName} {user.lastName}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1 }}>
        {chattingWith ? (
          <ChatWindow
            currentUserId={currentUserId}
            chattingWith={chattingWith}
            goBack={() => setChattingWith(null)}
          />
        ) : (
          <div style={{ padding: '2rem' }}>Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
