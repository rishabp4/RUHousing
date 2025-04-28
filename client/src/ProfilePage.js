import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";// julio? what are you doing here?
import { auth } from "./firebase"; // adjust path, omg julio was here one more time
import avatar from "./images/default_avatar.png";

import RoommatesForm from './RoommatesForm'; // Adjust the path if necessary
import FindUsers from "./FindUsers"; // julio was here again!
import ChatWindow from "./ChatWindow"; //FOR THE Chat duh, julio here!


function ProfilePage() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(null); // State to hold the Firebase UID
  const [netID, setNetID] = useState("");
  //!finduser and chat
  const [showFindUsers, setShowFindUsers] = useState(false);
  const [chattingWith, setChattingWith] = useState(null); // for chatting later

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        setUserId(user.uid); // Set the userId state

        // Save the userId to localStorage upon login/auth state change
        localStorage.setItem("userId", user.uid);

        const res = await fetch(
          `http://localhost:5002/api/profile?uid=${user.uid}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched Profile Data:", data); // Debugging
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setUserId(data.uid);
          setNetID(data.netID || "");
        } else {
          console.error("Failed to fetch profile data");
        }
      } else {
        setFirebaseUser(null);
        setUserId(null);
        setFirstName("");
        setLastName("");
        setNetID("");
        localStorage.removeItem("userId"); // Optionally remove userId from localStorage on logout
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
        netID: netID,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      alert(result.message || "Profile Saved!");

      // ✅ After saving, fetch the latest profile data
      const updatedProfile = await fetch(
        `http://localhost:5002/api/profile?uid=${firebaseUser.uid}`
      );
      if (updatedProfile.ok) {
        const updatedData = await updatedProfile.json();
        setFirstName(updatedData.firstName || "");
        setLastName(updatedData.lastName || "");
        setNetID(updatedData.netID || "");
      }
    } else {
      const errorResult = await res.json();
      alert(errorResult.error || "Failed to save profile.");
    }
  };

  //  These two conditions first:
  if (!firebaseUser) return <p>Please log in to see your profile.</p>;

//! CHATTTING WITH JULIO
if (chattingWith) {
  return (
    <ChatWindow
      currentUserId={userId}
      chattingWith={chattingWith}
      goBack={() => setChattingWith(null)}
    />
  );
}

// FPR THE USERS, JULIO BACK HERE
  if (showFindUsers) {
    return (
      <div style={{ padding: "2rem" }}>
        <button
          onClick={() => setShowFindUsers(false)}
          style={{ marginBottom: "1rem", padding: "8px" }}
        >
          Back to Profile
        </button>

        {/* 👇 Show FindUsers component */}
        <FindUsers
          currentUserId={userId}
          startChat={(user) => setChattingWith(user)}
        />
      </div>
    );
  }

  //  If not showing FindUsers, show normal profile, JULIO WAS HERE
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {firebaseUser.email}</h2>

      <img
        src={avatar}
        alt="avatar"
        width={100}
        style={{ borderRadius: "50%" }}
      />

      <br />
      <br />

      <button
        onClick={() => setShowFindUsers(true)}
        style={{ marginBottom: "1rem", padding: "8px" }}
      >
        Find Roommates
      </button>

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
        <input
          type="text"
          name="netID"
          value={netID}
          onChange={(e) => setNetID(e.target.value)}
          placeholder="NetID"
          style={{ margin: "10px", padding: "5px" }}
        />
      </div>

      <button onClick={handleSave}>Save Profile</button>

      {/* Pass the lifted state and userId as props to RoommatesForm */}
      <RoommatesForm
        firstName={firstName}
        lastName={lastName}
        userId={userId}
      />
    </div>
  );
}

export default ProfilePage;
