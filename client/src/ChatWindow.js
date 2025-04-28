// src/ChatWindow.js
import React, { useState, useEffect } from "react";

function ChatWindow({ currentUserId, chattingWith, goBack }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:5002/api/chat?user1=${currentUserId}&user2=${chattingWith.uid}`);
      if (res.ok) {
        const chatHistory = await res.json();
        setMessages(chatHistory);
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
        fetchMessages(); // Refresh messages after sending
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Auto-refresh every 3 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={goBack} style={{ marginBottom: "1rem", padding: "8px" }}>
        Back to Find Users
      </button>

      <h2>Chat with {chattingWith.firstName}</h2>

      <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid gray", padding: "10px", marginBottom: "1rem" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.senderId === currentUserId ? "You" : chattingWith.firstName}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
