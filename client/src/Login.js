import React from 'react';
import background from './images/background.webp';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';

import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("✅ User signed in:", result.user);
        navigate("/home");
      })
      .catch((error) => {
        console.error("❌ Google login failed:", error);
      });
  };

  return (
    <div 
      style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh'
      }}
    >
      <h2 style={{ textAlign: 'center', marginTop: '50px', marginLeft: '50px'}}>
        WELCOME!
        <form className="mt-5" style={{ width: '250px', height: '230px' }}> 
          <div className="col-auto d-flex justify-content-evenly align-items-center">
            <label htmlFor="inputEmail" className="visually-hidden">Email</label>
            <input type="text" className="form-control" id="inputEmail" placeholder="Email"/>
          </div>
          <div className="col-auto mt-2">
            <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
            <input type="password" className="form-control" id="inputPassword2" placeholder="Password"/>
          </div>
          <div className="col-auto mt-2">
            <button type="submit" className="btn btn-primary mb-3">Login</button>
          </div>
        </form>

        <div className="col-auto mt-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-danger mb-3"
            style={{ marginTop: '10px' }}
          >
            Sign in with Google
          </button>
        </div>
      </h2>
    </div>
  );
}

export default Login;
