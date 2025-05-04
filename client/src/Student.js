import React from 'react';
import background1 from './images/background1.png';
import { useNavigate } from 'react-router-dom';

function Student() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${background1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        position: 'relative'
      }}
    >
      <button
        onClick={() => navigate("/new-user")}
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          background: 'transparent',
          border: '2px solid white',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '10px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        ⬅ Back
      </button>

      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 0 15px rgba(255, 0, 0, 0.5)',
        color: 'white',
        width: '360px'
      }}>
        <h2 className="text-center mb-4">Welcome, RU Student!</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email" className="form-control mb-3" />
          <input type="text" placeholder="RUID" className="form-control mb-3" />
          <input type="text" placeholder="First Name" className="form-control mb-3" />
          <input type="text" placeholder="Last Name" className="form-control mb-3" />
          <input type="text" placeholder="Username" className="form-control mb-3" />
          <input type="password" placeholder="Password" className="form-control mb-4" />
          <button type="submit" className="btn btn-danger w-100" style={{ borderRadius: '10px' }}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Student;
