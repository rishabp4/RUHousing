import React from "react";
import { Link } from "react-router-dom";
import avatar from "./images/default_avatar.png";

function ProfilePage() {
  const profileStyles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      marginRight: "30px",
    },
    userInfo: {
      flex: 1,
    },
    name: {
      fontSize: "28px",
      margin: "0 0 10px 0",
      color: "#333",
    },
    email: {
      fontSize: "16px",
      color: "#666",
      margin: "0 0 5px 0",
    },
    memberSince: {
      fontSize: "14px",
      color: "#888",
      margin: 0,
    },
    section: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "20px",
      borderBottom: "2px solid #4CAF50",
      paddingBottom: "5px",
      color: "#333",
    },
    button: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      marginRight: "10px",
    },
    savedHouses: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    houseCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "15px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
  };

  // Sample data - replace with actual user data from your app
  const user = {
    name: "John Doe",
    email: "john.doe@rutgers.edu",
    memberSince: "January 2023",
    savedHouses: [
      { id: 1, address: "123 College Ave", price: "$1200/month" },
      { id: 2, address: "456 George St", price: "$1100/month" },
    ],
  };

  return (
    <div style={profileStyles.container}>
      <div style={profileStyles.header}>
        <img src={avatar} alt="Profile" style={profileStyles.avatar} />
        <div style={profileStyles.userInfo}>
          <h1 style={profileStyles.name}>{user.name}</h1>
          <p style={profileStyles.email}>{user.email}</p>
          <p style={profileStyles.memberSince}>Member since: {user.memberSince}</p>
        </div>
      </div>

      <div style={profileStyles.section}>
        <h2 style={profileStyles.sectionTitle}>Account Settings</h2>
        <button style={profileStyles.button}>Edit Profile</button>
        <button style={profileStyles.button}>Change Password</button>
        <button style={profileStyles.button}>Notification Settings</button>
      </div>

      <div style={profileStyles.section}>
        <h2 style={profileStyles.sectionTitle}>Saved Houses ({user.savedHouses.length})</h2>
        <div style={profileStyles.savedHouses}>
          {user.savedHouses.map((house) => (
            <div key={house.id} style={profileStyles.houseCard}>
              <h3>{house.address}</h3>
              <p>{house.price}</p>
              <button style={{ ...profileStyles.button, backgroundColor: "#e74c3c" }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={profileStyles.section}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <button style={profileStyles.button}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;