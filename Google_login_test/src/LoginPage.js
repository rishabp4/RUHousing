import React from 'react';

function LoginPage({ onLogin }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login Page</h1>
      <button
        onClick={onLogin}
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginPage;
