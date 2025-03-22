import React from 'react';
import background from './images/background.webp';

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
      <h2 style={{ textAlign: 'center', marginTop: '50px', marginLeft: '50px'}}>
        WELCOME!
        <form className="mt-5" style={{ width: '250px', height: '230px' }}> 
          <div className="col-auto d-flex justify-content-evenly align-items-center">
            <label htmlFor="inputEmail" class="visually-hidden">Email</label>
            <input type="text" className="form-control" id="inputEmail" placeholder="Email"/>
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