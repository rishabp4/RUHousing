import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./images/RuLogo.png";
import header from './images/Header.png';
import avatar from "./images/default_avatar.png";

function HeaderBar({ photoUrl = avatar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () =>
    location.pathname === "/home" ? navigate(0) : navigate("/home");

  const handleSavedClick = () =>
    location.pathname === "/saved-houses" ? navigate(0) : navigate("/saved-houses");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundImage: `url(${header})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "15px 20px",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="RU Housing Logo" style={{ height: "80px", marginRight: "20px" }} />
        <div style={{ display: "flex", gap: "25px" }}>
          <button onClick={handleHomeClick} style={navBtnStyle}>Home</button>
          <button onClick={handleSavedClick} style={navBtnStyle}>Saved Houses</button>
          <Link to="/matched-profiles"><button style={navBtnStyle}>My Roommates</button></Link>
          <Link to="/profile"><button style={navBtnStyle}>Profile</button></Link>
        </div>
      </div>
      <Link to="/profile">
        <img
          src={photoUrl}
          alt="User Avatar"
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            background: "#fafafa",
          }}
        />
      </Link>
    </div>
  );
}

const navBtnStyle = {
  backgroundColor: "#A52A2A",
  color: "white",
  padding: "8px 16px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  fontWeight: "bold",
};

export default HeaderBar;
