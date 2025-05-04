// src/ChatPage.js
import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import avatar from "./images/default_avatar.png";

function ChatPage() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [chattingWith, setChattingWith] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(400); // default width
  const [isResizing, setIsResizing] = useState(false);

  // ✅ Resize logic (global mouse move)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= window.innerWidth / 2) {
          setSidebarWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

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

  useEffect(() => {
    if (!currentUserId) return;
    fetch('http://localhost:5002/api/all-users')
      .then((res) => res.json())
      .then((data) => {
        const others = data.filter((u) => u.uid !== currentUserId);
        setAllUsers(others);
        if (!chattingWith && others.length > 0) {
          setChattingWith(others[0]);
        }
      });
  }, [currentUserId]);

  if (!currentUserId) return <p>Loading chat...</p>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
  style={{
    width: `${sidebarWidth}px`,
    minWidth: '200px',
    maxWidth: `${window.innerWidth / 2}px`,
    backgroundColor: '#121212',
    borderRight: '1px solid #333',
    overflowY: 'auto',
    color: 'white',
    boxShadow: '2px 0 6px rgba(0,0,0,0.4)' // 🔥 Adds right-side glow
  }}
>
<input
  type="text"
  placeholder="Search chats..."
  style={{
    width: '90%',
    margin: '10px',
    padding: '8px 12px',
    borderRadius: '20px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#1e1e1e',
    color: 'white',
  }}
/>


        <h3 style={{ padding: '1rem', backgroundColor: '#cc0033', color: 'white', margin: 0 }}>
  Your Chats
</h3>


        {allUsers.map((user) => {
          const isActive = chattingWith?.uid === user.uid;
          return (
            <div
  key={user.uid}
  onClick={() => setChattingWith(user)}
  style={{
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#cc0033' : '#1c1c1c', // Scarlet red if selected
    color: isActive ? 'white' : '#f0f0f0',
    borderBottom: '1px solid #333',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
  }}
  
  onMouseEnter={(e) => {
    if (!isActive) e.currentTarget.style.backgroundColor = '#2a2a2a';
  }}
  onMouseLeave={(e) => {
    if (!isActive) e.currentTarget.style.backgroundColor = '#1c1c1c';
  }}
  
>
<img
  src={`http://localhost:5002/api/profile-photo/${user.uid}`}
  alt="profile"
  onError={(e) => (e.target.src = avatar)}
  style={{
    width: 48, //! JULIO WAS HERE, change photo size at will
    height: 48,
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: 10,
  }}
/>

  <span>{user.firstName} {user.lastName}</span>
</div>

          );
        })}
      </div>

      {/* Drag Handle */}
      <div
        onMouseDown={() => setIsResizing(true)}
        style={{
          width: '6px',
          cursor: 'col-resize',
          backgroundColor: '#ddd',
          zIndex: 10,
        }}
      ></div>

      {/* Chat Window */}
      <div style={{ flex: 1 }}>
        {chattingWith ? (
          <ChatWindow
            key={chattingWith.uid}
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
