// src/ChatPage.js
import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function ChatPage() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [chattingWith, setChattingWith] = useState(null);

  // Watch auth state for user ID
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

  // Fetch all users except current
  useEffect(() => {
    if (!currentUserId) return;
    fetch('http://localhost:5002/api/all-users')
      .then((res) => res.json())
      .then((data) => {
        const others = data.filter((u) => u.uid !== currentUserId);
        setAllUsers(others);
        if (!chattingWith && others.length > 0) {
          setChattingWith(others[0]); // Auto-select first chat
        }
      });
  }, [currentUserId]);

  if (!currentUserId) return <p>Loading chat...</p>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h3 style={{ padding: '1rem', backgroundColor: '#990000', color: 'white' }}>Your Chats</h3>
        {allUsers.map((user) => {
  const isActive = chattingWith?.uid === user.uid;

  return (
    <div
      key={user.uid}
      onClick={() => setChattingWith(user)}
      style={{
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#e6e6e6' : 'white',
        borderBottom: '1px solid #ddd',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = '#f5f5f5';
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = 'white';
      }}
    >
      {user.firstName} {user.lastName}
    </div>
  );
})}

      </div>

      {/* Chat Window */}
      <div style={{ flex: 1 }}>
        {chattingWith ? (
          <ChatWindow
            key={chattingWith.uid} // force remount when switching chats
            currentUserId={currentUserId}
            chattingWith={chattingWith}
          />
        ) : (
          <div style={{ padding: '2rem' }}>Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
