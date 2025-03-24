import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/RuLogo.png';
import background from './images/BG.webp';

function Home() {
  return (
    <div 
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh'
      }}
    >
      <div style={{ marginLeft: '80px',  marginBottom: '200px'}}> 
        <img className= "mt-5" src={logo} alt="RUHousing Logo" style={{ width: '300px', height: '260px', opacity: 0.90}}/>
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
    </div>
  );
}

export default Home;