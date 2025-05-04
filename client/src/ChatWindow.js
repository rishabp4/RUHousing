// src/ChatWindow.js
import React, { useState, useEffect, useRef } from "react";
import bgpattern from './images/backchat.jpg'; // Adjust the path if necessary
import { io } from 'socket.io-client';


const socket = io('http://localhost:5002');
function ChatWindow({ currentUserId, chattingWith, goBack }) {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [justSentMessage, setJustSentMessage] = useState(false);
  const bottomRef = useRef(null);
// !! Socket.io, real time updates, typing indicator, etc.
  const [isTyping, setIsTyping] = useState(false);
const typingTimeoutRef = useRef(null);
  


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
  
//! typing indicator logic
const handleTyping = () => {
  socket.emit("typing", { to: chattingWith.uid, from: currentUserId });

  if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

  typingTimeoutRef.current = setTimeout(() => {
    socket.emit("stopTyping", { to: chattingWith.uid, from: currentUserId });
  }, 1000);
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
  
    socket.on('typing', (data) => {
      if (data.from === chattingWith.uid) {
        setIsTyping(true);
      }
    });
  
    socket.on('stopTyping', (data) => {
      if (data.from === chattingWith.uid) {
        setIsTyping(false);
      }
    });
  
    return () => {
      socket.off('receiveMessage');
      socket.off('typing');
      socket.off('stopTyping');
    };
  }, [chattingWith.uid]);
  
  
  //!! Socket.io logic ends
  
  useEffect(() => {
    setTimeout(() => scrollToBottom(), 50);
  }, [messages, isTyping]);
  
  

  return (
    <div style={{ 
      backgroundColor: "#121212",
      height: "100vh",
      color: "white",
      display: "flex",
      flexDirection: "column"
    }}>
    
      {/* Header */}
      {goBack && (
        <button onClick={goBack} style={{ margin: "1rem", padding: "8px" }}>
          ← Back
        </button>
      )}
      <div style={{
        padding: "1rem",
        backgroundColor: "#202c33",
        borderBottom: "1px solid #333",
        display: "flex",
        flexDirection: "column"
      }}>
        <h2 style={{ margin: 0 }}>Chat with {chattingWith.firstName}</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#aaa' }}>Online</p>
      </div>
  
      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundImage: `url(${bgpattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: "10px",
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
                backgroundColor: isMine ? "#005c4b" : "#3a3a3a",
                color: "white",
                padding: "10px 14px",
                borderRadius: isMine ? "18px 18px 0 18px" : "18px 18px 18px 0",
                maxWidth: "60%",
                wordBreak: "break-word",
                fontSize: "16px",
                marginBottom: "8px",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
                animation: "fadeIn 0.3s ease"
              }}
            >
              <strong>{isMine ? "You" : chattingWith.firstName}:</strong> {msg.message}
            </div>
          );
        })}
  
        {isTyping && (
          <div style={{ fontSize: "16px", color: "#ccc", fontWeight: "bold", margin: "8px 12px" }}>
            {chattingWith.firstName} is typing
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
            <style>
              {`
                .dot {
                  animation: blink 1s infinite;
                }
                .dot:nth-child(2) {
                  animation-delay: 0.2s;
                }
                .dot:nth-child(3) {
                  animation-delay: 0.4s;
                }
                @keyframes blink {
                  0% { opacity: 0 }
                  50% { opacity: 1 }
                  100% { opacity: 0 }
                }
              `}
            </style>
          </div>
        )}
  
        <div ref={bottomRef}></div>
      </div>
  
      {/* Input Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#202c33',
        borderTop: '1px solid #333'
      }}>
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          style={{
            flex: 1,
            padding: "10px 15px",
            backgroundColor: "#2a3942",
            color: "white",
            border: "none",
            borderRadius: "20px",
            fontSize: "15px",
            outline: "none",
            marginRight: "10px",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#cc0033",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.4)"
          }}
        >
          ⇨
        </button>
      </div>
    </div>
  );
  
}

export default ChatWindow;
