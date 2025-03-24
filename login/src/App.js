import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './firebase';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        setUser(result.user);
        console.log("User logged in:", result.user);
      })
      .catch(error => {
        console.error("Login error:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User logged out");
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      {user ? (
        <HomePage user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
