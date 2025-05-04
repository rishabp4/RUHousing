import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background1 from './images/background1.png';

function NewUser() {
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
        onClick={() => navigate("/")}
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
        textAlign: 'center',
        color: 'white',
        width: '300px'
      }}>
        <h2 style={{ marginBottom: '30px' }}>Welcome, New User!</h2>
        <Link to="/student">
          <button className="btn btn-danger w-100 mb-3" style={{ borderRadius: '10px' }}>
            RU Student
          </button>
        </Link>
        <Link to="/landlord">
          <button className="btn btn-danger w-100" style={{ borderRadius: '10px' }}>
            RU Landlord
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NewUser;
