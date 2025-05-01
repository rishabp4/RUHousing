import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./LandingPage.css";
import background from "./images/BG.webp";
import logo from "./images/RuLogo.png";

function LandingPage() {
  const [index, setIndex] = useState(0);

  const panels = [
    <div className="hero-box hero-left" key="panel-1">
      <h2 className="section-title">What is RUHousing?</h2>
      <h1 className="hero-heading">Rutgers housing made easy.</h1>
      <p className="hero-description">
        Discover places to live, people to live with, and a smoother way to
        settle in — RUHousing is where student living begins.
      </p>
      <div className="hero-buttons">
        <Link to="/new-user" className="btn primary">Create Account</Link>
        <Link to="/login" className="btn primary">Login</Link>
        <Link to="/home" className="btn ghost">Continue as Guest</Link>
      </div>
    </div>,
    <div className="hero-box hero-right" key="panel-2">
      <h2 className="section-title">Chat with Potential Roommates!</h2>
      <div className="chat-group">
        <div className="chat-bubble left typing-bubble bubble-1">👋 Hey! I’m looking for a roommate near College Ave.</div>
        <div className="chat-bubble right typing-bubble bubble-2">🏡 I found a listing 3 mins from campus — want to check it out?</div>
        <div className="chat-bubble left typing-bubble bubble-3">💬 Sure! Let’s connect through RUHousing!</div>
      </div>
    </div>,
    <div className="hero-box hero-right profile-panel" key="panel-3">
    <h2 className="section-title">Your Personalized Profile</h2>
    <div className="profile-content">
      <div className="profile-bubbles">
        <div className="chat-bubble left">📸 Add a profile picture</div>
        <div className="chat-bubble left">⚙️ Customize your preferences</div>
        <div className="chat-bubble left">📄 View saved listings</div>
        <div className="chat-bubble left">🔥 Match with other users</div>
      </div>
      <div className="profile-image-preview">
        <img src={require("./images/default_avatar.png")} alt="Profile Preview" />
      </div>
    </div>
  </div>
  
  
  ];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % panels.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + panels.length) % panels.length);
  };

  const visiblePanels = [
    panels[index],
    panels[(index + 1) % panels.length]
  ];

  return (
    <div
      className="landing-wrapper"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="top-bar">
        <h1 className="hero-title">Welcome to RUHousing . . .</h1>
        <div className="logo-contact-wrapper">
          <span className="contact-text">Contact Us!</span>
          <img src={logo} alt="RUHousing Logo" className="logo-image" />
        </div>
      </div>
  
      <div className="hero-section">
        {visiblePanels.map((panel) => panel)}
      </div>
  
      <div className="slider-controls">
        <button className="icon-btn" onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        <button className="icon-btn" onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
  
}

export default LandingPage;
