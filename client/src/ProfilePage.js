import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // adjust path if needed
import avatar from "./images/default_avatar.png";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    savedHouses: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
        // Later: Fetch profileData from MongoDB here using user.uid
      } else {
        setFirebaseUser(null);
      }
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  const handleEdit = () => {
    // Later: Show a form or navigate to an EditProfilePage
    alert("Edit profile clicked! (Hook this up later)");
  };

  if (!firebaseUser) return <p>Please log in to view your profile.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <img src={avatar} alt="Profile" style={{ width: "120px", height: "120px", borderRadius: "50%", marginRight: "30px" }} />
        <div>
          <h1>{profileData.firstName || firebaseUser.displayName || "User"} {profileData.lastName}</h1>
          <p>{firebaseUser.email}</p>
          <p>UID: {firebaseUser.uid}</p>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>Account Settings</h2>
        <button onClick={handleEdit}>Edit Profile</button>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>Saved Houses ({profileData.savedHouses.length})</h2>
        {profileData.savedHouses.map((house, index) => (
          <div key={index} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
            <h4>{house.address}</h4>
            <p>{house.price}</p>
          </div>
        ))}
      </div>

      <Link to="/home">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
