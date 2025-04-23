import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // adjust path
import avatar from "./images/default_avatar.png";

function ProfilePage() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
  });

  // 🔄 Detect logged-in user from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        // ✅ Fetch profile data from your backend
        const res = await fetch(`http://localhost:5002/api/profile?uid=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setProfileData({ firstName: data.firstName || "", lastName: data.lastName || "" });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!firebaseUser) return;

    const res = await fetch("http://localhost:5002/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      }),
    });

    const result = await res.json();
    alert(result.message || "Saved!");
  };

  if (!firebaseUser) return <p>Please log in to see your profile.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {firebaseUser.email}</h2>

      <img src={avatar} alt="avatar" width={100} style={{ borderRadius: "50%" }} />

      <div>
        <input
          type="text"
          name="firstName"
          value={profileData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          style={{ margin: "10px", padding: "5px" }}
        />
        <input
          type="text"
          name="lastName"
          value={profileData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          style={{ margin: "10px", padding: "5px" }}
        />
      </div>

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
  console.log("User UID:", firebaseUser?.uid);
console.log("Profile Data:", profileData);

}

export default ProfilePage;
