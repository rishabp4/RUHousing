import React from 'react';
import './App.css';
import logo from './images/RuLogo.png';
import background from './images/background.png'; 

function App() {
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
        <img className="mt-5" src={logo} alt="RUHousing Logo" style={{ width: '250px', height: '230px' }}/>
      </div>
      <div className="margin-top"> 
        <button className="btn btn-primary">RU A NEW USER</button>
        <br/>
        <button className="btn btn-primary mt-2">RU Landlord</button>
      </div>
    </div>
  );
}

export default App;
