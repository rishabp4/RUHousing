// src/ChatWindow.js
import React, { useState, useEffect, useRef } from "react";
import bgpattern from './images/backchat.png'; // Adjust the path if necessary
import { io } from 'socket.io-client';


const socket = io('http://localhost:5002');
function ChatWindow({ currentUserId, chattingWith, goBack }) {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [justSentMessage, setJustSentMessage] = useState(false);
  const bottomRef = useRef(null);
  


  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchMessages = async (scroll = false) => {
    try {
      const res = await fetch(`http://localhost:5002/api/chat?user1=${currentUserId}&user2=${chattingWith.uid}`);
      if (res.ok) {
        const chatHistory = await res.json();
        setMessages(chatHistory);
  
        // Wait for DOM to update, then scroll
        if (scroll) {
          setTimeout(() => scrollToBottom(), 0);
        }
  
      } else {
        console.error("Failed to fetch chat history");
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };
  

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const res = await fetch('http://localhost:5002/api/chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: currentUserId,
          receiverId: chattingWith.uid,
          message: newMessage.trim(),
        }),
      });

      if (res.ok) {
        setNewMessage("");
        setJustSentMessage(true); // trigger scroll on next message update
        socket.emit('sendMessage', {
          senderId: currentUserId,
          receiverId: chattingWith.uid,
          message: newMessage.trim(),
        });
        
        setNewMessage("");
        setJustSentMessage(true);
        
        
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (chattingWith?.uid) {
      fetchMessages(true); // scroll on chat switch or initial load
    }
  }, [chattingWith?.uid]);
  //
  useEffect(() => {
    socket.connect(); //  Establish the socket connection
    return () => {
      socket.disconnect(); //  Clean up when ChatWindow unmounts
    };
  }, []);
  
  //!! Socket.io logic
  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    
  
    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  
  //!! Socket.io logic ends
  
  useEffect(() => {
    if (justSentMessage) {
      scrollToBottom();
      setJustSentMessage(false);
    } else {
      // scroll after receiving a message
      setTimeout(() => scrollToBottom(), 100); // small delay ensures DOM update
    }
  }, [messages]);
  

  return (
    <div style={{ 
      padding: "2rem", 
      backgroundColor: "#121212",  // dark background
      height: "100vh",             // make it full height
      color: "white",              // text will now be white
      display: "flex",
      flexDirection: "column"
    }}>
  
      {goBack && (
        <button onClick={goBack} style={{ marginBottom: "1rem", padding: "8px" }}>
          Back to Find Users
        </button>
      )}

<div style={{ marginBottom: '1rem' }}>
  <h2 style={{ margin: 0 }}>Chat with {chattingWith.firstName}</h2>
  <p style={{ margin: 0, fontSize: '14px', color: '#aaa' }}>Online</p> {/* Or "Last seen 2 hours ago" */}
</div>


<div
  style={{
    flex: 1,
    overflowY: "auto",
    backgroundImage: `url(${bgpattern})`, //! the background image :3, julio was here!
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: "10px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  }}
>

        {messages.map((msg, index) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <div
              key={index}
              style={{
                alignSelf: isMine ? "flex-end" : "flex-start",
                backgroundColor: isMine ? "#005c4b" : "#2e2e2e", // Dark green for sender, gray for receiver
                color: "white",
                padding: "10px 14px",
                borderRadius: "18px",
                maxWidth: "60%",
                wordBreak: "break-word",
                fontSize: "15px",
                marginBottom: "6px"
              }}
              
            >
              <strong>{isMine ? "You" : chattingWith.firstName}:</strong> {msg.message}
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      <div>
      <input
  type="text"
  placeholder="Type your message"
  value={newMessage}
  onChange={(e) => setNewMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }}
  style={{
    padding: "10px",
    width: "70%",
    backgroundColor: "#1e1e1e",
    color: "white",
    border: "1px solid #555",
    borderRadius: "20px"
  }}
/>

<button
  onClick={sendMessage}
  style={{
    padding: "10px 20px",
    marginLeft: "10px",
    backgroundColor: "#cc0033", // Rutgers red
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer"
  }}
>
  Send
</button>

      </div>
    </div>
  );
}

export default ChatWindow;
