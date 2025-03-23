import React from 'react';

function HomePage({ onLogout, user }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Home Page</h1>
      {user && (
        <>
          <p>Welcome, {user.displayName}</p>
          <img src={user.photoURL} alt="profile" style={{ borderRadius: '50%' }} />
          <p>Email: {user.email}</p>
        </>
      )}
      <br />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
