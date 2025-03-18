import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
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
        <img className="mt-5" src={logo} alt="RUHousing Logo" style={{ width: '250px', height: '230px' }}/>
      </div>
      <div className="margin-top"> 
        <Link to="/new-user">
        <button className="btn btn-primary">RU A NEW USER</button>
        </Link>
        <br/>
        <Link to="/landlord">
        <button className="btn btn-primary mt-2">RU Landlord</button>
        </Link>
      </div>
    </div>
  );
}

function NewUser() {
  return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome, New User!</h2>;
}

function Landlord() {
  return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome, Landlord!</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/landlord" element={<Landlord />} />
      </Routes>
    </Router>
  );
}

export default App;
