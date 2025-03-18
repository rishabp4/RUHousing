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

function NewUser() {
  return (
  <h2 style={{ textAlign: 'center', marginTop: '100px' }}>
    WELCOME, NEW USER!
      <div className="margin-top"> 
        <Link to="/student">
        <button className="btn btn-danger">RU STUDENT</button>
        </Link>
        <br/>
        <Link to="/landlord">
        <button className="btn btn-danger mt-2">RU LANDLORD</button>
        </Link>
      </div>
  </h2>
  );
}

function Login() {
  return (
  <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
    WELCOME!
  </h2>
  );
}


function Student() {
  return (
  <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
    WELCOME, RU STUDENT!
  </h2>
  );
}

function Landlord() {
  return (
  <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
    WELCOME, LANDLORD!
  </h2>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<NewUser/>} />
        <Route path="/student" element={<Student />} />
        <Route path="/landlord" element={<Landlord />} />
      </Routes>
    </Router>
  );
}

export default App;
