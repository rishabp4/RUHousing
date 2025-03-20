import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/RuLogo.png';
import background from './images/background.png';

function Home() {
  return (
    <div 
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
      }}
    >
      <div> 
        <img className="mt-5" src={logo} alt="RUHousing Logo" style={{ width: '400px', height: '300px' }}/>
      </div>
      <div className="margin-top"> 
        <Link to="/new-user">
        <button className="btn btn-primary">NEW USER</button>
        </Link>
        <br/>
        <Link to="/login">
        <button className="btn btn-primary mt-2">LOGIN</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;