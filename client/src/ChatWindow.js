// src/ChatWindow.js
import React, { useState, useEffect, useRef } from "react";

function ChatWindow({ currentUserId, chattingWith, goBack }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [justSentMessage, setJustSentMessage] = useState(false);
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
      fetchMessages(true); // scroll on chat switch or initial load
    }
  }, [chattingWith?.uid]);
  
  

  

  useEffect(() => {
    if (justSentMessage) {
      scrollToBottom();
      setJustSentMessage(false);
    }
  }, [messages]);

  return (
    <div style={{ padding: "2rem" }}>
      {goBack && (
        <button onClick={goBack} style={{ marginBottom: "1rem", padding: "8px" }}>
          Back to Find Users
        </button>
      )}

      <h2>Chat with {chattingWith.firstName}</h2>

      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid gray",
          padding: "10px",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {messages.map((msg, index) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <div
              key={index}
              style={{
                alignSelf: isMine ? "flex-end" : "flex-start",
                backgroundColor: isMine ? "#dcf8c6" : "#f1f0f0",
                padding: "8px 12px",
                borderRadius: "12px",
                maxWidth: "60%",
                wordBreak: "break-word",
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
          style={{ padding: "5px", width: "70%" }}
        />

        <button onClick={sendMessage} style={{ padding: "5px 10px", marginLeft: "5px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
