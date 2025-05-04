import React, { useState, useEffect, useRef } from "react";
import bgpattern from './images/backchat.jpg'; // Use .jpg — change to .png if that's the correct version
import { io } from 'socket.io-client';

const socket = io("http://localhost:5002");

function ChatWindow({ currentUserId, chattingWith, goBack }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [justSentMessage, setJustSentMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const fetchMessages = async (scroll = false) => {
    try {
      const res = await fetch(`http://localhost:5002/api/chat?user1=${currentUserId}&user2=${chattingWith.uid}`);
      if (res.ok) {
        const chatHistory = await res.json();
        setMessages(chatHistory);
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
        setJustSentMessage(true);
        await fetchMessages();
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (chattingWith?.uid) {
      fetchMessages(true);
    }
  }, [chattingWith?.uid]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

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

  useEffect(() => {
    if (justSentMessage) {
      scrollToBottom();
      setJustSentMessage(false);
    }
  }, [messages]);

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
      {goBack && (
        <button onClick={goBack} style={{ margin: "1rem", padding: "8px" }}>
          ← Back
        </button>
      )}

<div style={{
  padding: "10px 20px",
  backgroundColor: "#202c33",
  borderBottom: "1px solid #333",
  display: "flex",
  alignItems: "center",
  gap: "12px"
}}>
  <img
    src={`http://localhost:5002/api/profile-photo/${chattingWith.uid}`}
    alt="avatar"
    onError={(e) => (e.target.src = require('./images/default_avatar.png'))}
    style={{
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      objectFit: "cover"
    }}
  />
  <div>
    <div style={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}>
      {chattingWith.firstName} {chattingWith.lastName}
    </div>
    <div style={{ color: "#0f0", fontSize: "13px" }}>Online</div>
  </div>
</div>


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
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      {!isMine && (
        <img
          src={`http://localhost:5002/api/profile-photo/${chattingWith.uid}`}
          alt="avatar"
          onError={(e) => (e.target.src = require('./images/default_avatar.png'))}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            marginRight: "10px",
            alignSelf: "flex-end",
          }}
        />
      )}

      <div
        style={{
          backgroundColor: isMine ? "#005c4b" : "#2c2c2c",
          color: "white",
          padding: "10px 14px",
          borderRadius: isMine ? "16px 16px 0 16px" : "16px 16px 16px 0",
          maxWidth: "60%",
          wordBreak: "break-word",
          fontSize: "15px",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
        }}
      >
        {msg.message}
      </div>
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
