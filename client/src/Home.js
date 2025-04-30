import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/RuLogo.png";
import background from "./images/BG.webp";

function Home() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ marginLeft: "50px", marginBottom: "200px" }}>
        <img
          className="mt-5"
          src={logo}
          alt="RUHousing Logo"
          style={{ width: "300px", height: "260px", opacity: 0.95}}
        />
        <div className="mt-5">
          <Link to="/new-user">
            <button className="btn btn-primary">NEW USER</button>
          </Link>
          <br />
          <Link to="/login">
            <button className="btn btn-primary mt-2">LOGIN</button>
          </Link>
          <br />
          {/* TEMP TEST BUTTON: Go to your HomePage */}
          <Link to="/home">
            <button className="btn btn-secondary mt-3">Go to HomePage</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
