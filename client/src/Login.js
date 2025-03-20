import React from 'react';
import background from './images/background.png';

function Login() {
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
      <h2 style={{ textAlign: 'center', marginTop: '50px'}}>
        <p className="text-white">WELCOME!</p>
        <form className="margin-top" style={{ width: '250px', height: '230px' }}> 
          <div className="col-auto d-flex justify-content-evenly align-items-center">
            <label htmlFor="inputRUID" class="visually-hidden">RUID</label>
            <input type="text" className="form-control" id="inputRUID" placeholder="RUID"/>
          </div>
          <div className="col-auto mt-2">
            <label htmlFor="inputPassword2" class="visually-hidden">Password</label>
            <input type="password" className="form-control" id="inputPassword2" placeholder="Password"/>
          </div>
          <div className="col-auto mt-2">
            <button type="submit" className="btn btn-primary mb-3">Login</button>
          </div>
        </form> 
      </h2>
    </div>
  );
}

export default Login;