import React from 'react';
import './App.css';
import Login from './LoginPage'; // Import the Login component

function App() {
  return (
    <div className="App">
      <h1>RUHousing</h1> {/* Add a heading for your app */}
      <Login /> {/* Render the Login page */}
    </div>
  );
}

export default App;
