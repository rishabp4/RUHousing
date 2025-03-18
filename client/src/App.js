import React from 'react';
import './App.css';
import logo from './images/R.png';

function App() {
  return (
    <div className="App bg-secondary bg-gradient">
      <div> 
      <img className="h-20 w-10 mt-5" src={logo} alt="RUHousing Logo"/>
      </div>
      <div className="margin-top"> 
        <button className="btn btn-primary">RU A NEW USER</button>
        <br/>
        <button className="btn btn-danger mt-2">RU Landlord</button>
      </div>
    </div>
  );
}

export default App;
