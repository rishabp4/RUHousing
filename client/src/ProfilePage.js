import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // adjust path
import avatar from "./images/default_avatar.png";
import RoommatesForm from './RoommatesForm'; // Adjust the path if necessary

function ProfilePage() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(null); // State to hold the Firebase UID

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        setUserId(user.uid); // Set the userId state

        // Save the userId to localStorage upon login/auth state change
        localStorage.setItem('userId', user.uid);

        const res = await fetch(`http://localhost:5002/api/profile?uid=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched Profile Data:", data); // Debugging
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
        } else {
          console.error("Failed to fetch profile data");
        }
      } else {
        setFirebaseUser(null);
        setUserId(null);
        setFirstName("");
        setLastName("");
        localStorage.removeItem('userId'); // Optionally remove userId from localStorage on logout
      }
    });
    return () => unsubscribe();
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSave = async () => {
    if (!firebaseUser) return;

    const res = await fetch("http://localhost:5002/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        firstName: firstName,
        lastName: lastName,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      alert(result.message || "Profile Saved!");
    } else {
      const errorResult = await res.json();
      alert(errorResult.error || "Failed to save profile.");
    }
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
          value={firstName}
          onChange={handleFirstNameChange}
          placeholder="First Name"
          style={{ margin: "10px", padding: "5px" }}
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          placeholder="Last Name"
          style={{ margin: "10px", padding: "5px" }}
        />
      </div>

      <button onClick={handleSave}>Save Profile</button>

      {/* Pass the lifted state and userId as props to RoommatesForm */}
      <RoommatesForm firstName={firstName} lastName={lastName} userId={userId} />
    </div>
  );
}

export default ProfilePage;

